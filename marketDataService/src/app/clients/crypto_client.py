import os
import requests
import json
import time
from pathlib import Path

# Cache file path
CACHE_FILE = Path(__file__).parent / "coingecko_list.json"
CACHE_DURATION = 24 * 60 * 60  # 24 hours in seconds
COINGECKO_LIST_URL = "https://api.coingecko.com/api/v3/coins/list"
COINGECKO_PRICE_URL = "https://api.coingecko.com/api/v3/simple/price"


def get_coin_list():
    """
    Download the list of all coins from CoinGecko API and cache it locally.
    Only re-downloads if cache is older than 24 hours.
    """
    # Check if cache is valid
    if CACHE_FILE.exists():
        file_age = time.time() - CACHE_FILE.stat().st_mtime
        if file_age < CACHE_DURATION:
            # Cache is still valid, load from file
            try:
                with open(CACHE_FILE, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as e:
                print(f"Error loading cached coin list: {e}")
    
    # Cache doesn't exist or is too old, download new data
    try:
        response = requests.get(COINGECKO_LIST_URL, timeout=30)
        response.raise_for_status()
        
        coin_list = response.json()
        
        # Save to cache file
        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
            json.dump(coin_list, f)
        
        print(f"Downloaded CoinGecko coin list to {CACHE_FILE}")
        return coin_list
    except Exception as e:
        print(f"Error downloading coin list: {e}")
        
        # If download fails but cache exists, return cached data even if old
        if CACHE_FILE.exists():
            try:
                with open(CACHE_FILE, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except:
                pass
        
        return []


def search_crypto(query):
    """
    Search for cryptocurrencies by name or symbol.
    
    Returns a list of dicts with id, symbol, and name.
    """
    coin_list = get_coin_list()
    
    if not coin_list:
        return []
    
    results = []
    query_lower = query.lower()
    
    for coin in coin_list:
        coin_id = coin.get('id', '')
        coin_symbol = coin.get('symbol', '')
        coin_name = coin.get('name', '')
        
        # Check if query matches name or symbol
        if (query_lower in coin_name.lower() or 
            query_lower in coin_symbol.lower()):
            results.append({
                'id': coin_id,
                'symbol': coin_symbol,
                'name': coin_name
            })
    
    return results


def get_crypto_price(coin_id):
    """
    Get the current price of a cryptocurrency in USD.
    
    Returns the price as a float, or None if not found.
    """
    try:
        params = {
            'ids': coin_id,
            'vs_currencies': 'usd'
        }
        
        response = requests.get(COINGECKO_PRICE_URL, params=params, timeout=30)
        response.raise_for_status()
        
        data = response.json()
        
        # Check if the coin_id exists in the response
        if coin_id in data and 'usd' in data[coin_id]:
            return data[coin_id]['usd']
        
        return None
    except Exception as e:
        print(f"Error fetching price for {coin_id}: {e}")
        return None
