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
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period="1d")
        if hist.empty:
            return None
        # Get the last (most recent) closing price
        price = hist['Close'].iloc[-1]
        return price
    except Exception as e:
        print(f"Error fetching price for {symbol}: {e}")
        return None
