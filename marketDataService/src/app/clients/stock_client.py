import os
import time
import requests
import yfinance as yf

# In-memory cache: { key: (value, timestamp) }
_price_cache = {}
_search_cache = {}
PRICE_CACHE_TTL = 120       # 2 minutes for stock prices
SEARCH_CACHE_TTL = 300      # 5 minutes for search results


def search_stocks(query):
    now = time.time()
    cache_key = query.lower().strip()
    if cache_key in _search_cache:
        val, ts = _search_cache[cache_key]
        if now - ts < SEARCH_CACHE_TTL:
            return val

    api_key = os.environ.get("FINNHUB_API_KEY")
    url = "https://finnhub.io/api/v1/search"
    params = {'q': query, 'token': api_key}
    response = requests.get(url, params=params, timeout=15)
    data = response.json()
    result = data.get('result', [])
    _search_cache[cache_key] = (result, now)
    return result


def get_stock_price(symbol):
    now = time.time()
    cache_key = symbol.strip().upper()
    if cache_key in _price_cache:
        val, ts = _price_cache[cache_key]
        if now - ts < PRICE_CACHE_TTL:
            return val

    try:
        normalized_symbol = symbol.strip()

        if ":" in normalized_symbol:
            exchange, ticker_code = normalized_symbol.split(":", 1)
            if exchange.upper() == "NSE":
                normalized_symbol = f"{ticker_code}.NS"
            elif exchange.upper() == "BSE":
                normalized_symbol = f"{ticker_code}.BO"
            else:
                normalized_symbol = ticker_code
        elif "." not in normalized_symbol and normalized_symbol.isalnum():
            normalized_symbol = f"{normalized_symbol}.NS"

        ticker = yf.Ticker(normalized_symbol)
        hist = ticker.history(period="1d")
        if hist.empty:
            return None
        price = hist['Close'].iloc[-1]
        _price_cache[cache_key] = (price, now)
        return price
    except Exception as e:
        print(f"Error fetching price for {symbol}: {e}")
        return None
