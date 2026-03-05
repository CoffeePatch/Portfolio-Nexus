import os
import requests
import yfinance as yf


def search_stocks(query):
    api_key = os.environ.get("FINNHUB_API_KEY")
    url = "https://finnhub.io/api/v1/search"
    params = {'q': query, 'token': api_key}
    response = requests.get(url, params=params)
    data = response.json()
    return data.get('result', [])


def get_stock_price(symbol):
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
        # Get the last (most recent) closing price
        price = hist['Close'].iloc[-1]
        return price
    except Exception as e:
        print(f"Error fetching price for {symbol}: {e}")
        return None
