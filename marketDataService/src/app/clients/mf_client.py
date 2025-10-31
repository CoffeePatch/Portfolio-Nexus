import os
import requests
import time
from pathlib import Path

# Cache file path
CACHE_FILE = Path(__file__).parent / "amfi_data.txt"
CACHE_DURATION = 4 * 60 * 60  # 4 hours in seconds
AMFI_URL = "https://www.amfiindia.com/spages/NAVAll.txt"


def download_amfi_data():
    """Download NAV data from AMFI website and cache it locally."""
    try:
        response = requests.get(AMFI_URL, timeout=30)
        response.raise_for_status()
        
        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
            f.write(response.text)
        
        print(f"Downloaded AMFI data to {CACHE_FILE}")
        return True
    except Exception as e:
        print(f"Error downloading AMFI data: {e}")
        return False


def is_cache_valid():
    """Check if the cached file exists and is not too old."""
    if not CACHE_FILE.exists():
        return False
    
    file_age = time.time() - CACHE_FILE.stat().st_mtime
    return file_age < CACHE_DURATION


def ensure_data_available():
    """Ensure AMFI data is available, downloading if necessary."""
    if not is_cache_valid():
        download_amfi_data()


def search_mutual_funds(query):
    """
    Search for mutual funds by name.
    
    Returns a list of dicts with scheme code and name.
    """
    ensure_data_available()
    
    if not CACHE_FILE.exists():
        return []
    
    results = []
    query_lower = query.lower()
    
    try:
        with open(CACHE_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                
                parts = line.split(';')
                
                # Skip header lines and invalid lines
                # Valid data lines have at least 5 fields
                if len(parts) < 5:
                    continue
                
                scheme_code = parts[0].strip()
                scheme_name = parts[3].strip()
                
                # Skip if scheme code is not numeric (headers)
                if not scheme_code.isdigit():
                    continue
                
                # Check if query matches scheme name
                if query_lower in scheme_name.lower():
                    results.append({
                        'code': scheme_code,
                        'name': scheme_name
                    })
        
        return results
    except Exception as e:
        print(f"Error searching mutual funds: {e}")
        return []


def get_mutual_fund_nav(scheme_code):
    """
    Get NAV for a specific mutual fund scheme code.
    
    Returns the NAV value as a string, or None if not found.
    """
    ensure_data_available()
    
    if not CACHE_FILE.exists():
        return None
    
    try:
        with open(CACHE_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                
                parts = line.split(';')
                
                # Valid data lines have at least 5 fields
                if len(parts) < 5:
                    continue
                
                current_code = parts[0].strip()
                
                # Check if this is the scheme we're looking for
                if current_code == scheme_code:
                    nav = parts[4].strip()
                    return nav
        
        return None
    except Exception as e:
        print(f"Error fetching NAV for scheme {scheme_code}: {e}")
        return None
