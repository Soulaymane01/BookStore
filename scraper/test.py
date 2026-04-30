import requests
from bs4 import BeautifulSoup
import json

def scrape():
    url = "https://platform.arabicforall.net/shop"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print("Failed to fetch:", e)
        return
        
    soup = BeautifulSoup(response.text, 'html.parser')
    products = []
    
    # Find all product links
    for a in soup.find_all('a', href=True):
        if '/shop/product/' in a['href']:
            link = a['href']
            
            # Find image
            img = a.find('img')
            img_url = img['src'] if img and img.has_attr('src') else None
            
            # Find title
            # In standard e-com, it might be an h3 or just strong text
            title_tag = a.find(['h3', 'h4', 'h2', 'strong'])
            title = title_tag.text.strip() if title_tag else ""
            
            # If no title tag, maybe just pure text content?
            if not title:
                text_content = [text for text in a.stripped_strings if text and not text.isdigit() and "SAR" not in text and "EUR" not in text]
                if text_content:
                    title = text_content[0]
            
            # Price
            price_text = ""
            for text in a.stripped_strings:
                if any(char.isdigit() for char in text) and '.' in text:
                    price_text = text
                    break
                    
            if link and title and not any(p['product_url'] == link for p in products):
                products.append({
                    "title": title,
                    "price_raw": price_text,
                    "image_urls": [img_url] if img_url else [],
                    "product_url": link
                })
                
    print(json.dumps(products[:3], indent=2, ensure_ascii=False))

if __name__ == "__main__":
    scrape()
