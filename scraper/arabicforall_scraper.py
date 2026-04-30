import requests
from bs4 import BeautifulSoup
import json
import re

def scrape_arabic_for_all():
    url = "https://platform.arabicforall.net/shop"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    session = requests.Session()
    session.headers.update(headers)
    
    products = []
    try:
        response = session.get(url, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        seen_urls = set()
        
        links = [a for a in soup.find_all('a', href=True) if '/shop/product/' in a['href']]
        print(f"Found {len(links)} product links to visit.")
        
        for idx, a in enumerate(links):
            href = a['href']
            if href not in seen_urls:
                seen_urls.add(href)
                
                # Text lines inside card
                text_lines = [text.strip() for text in a.stripped_strings if text.strip()]
                
                if not text_lines:
                    continue
                    
                title = ""
                # The title is usually the longest string or contains specific keywords
                for line in text_lines:
                    if "العربية بين" in line or "الحروف العربية" in line or "كتاب" in line:
                        title = line
                        break
                        
                if not title and len(text_lines) > 0:
                    title = text_lines[0]
                    
                # Thumbnail
                img = a.find('img')
                img_url = img['src'] if img and img.has_attr('src') else ""
                
                # Categorize the product for our frontend React logic
                fiae = "العربية للجميع"
                if "أولادنا" in title or "أيدي" in title:
                    fiae = "العربية بين أيدي أولادنا"
                elif "بين يديك" in title or "طالب" in title or "معلم" in title:
                    fiae = "العربية بين يديك"

                # Level extraction
                mostawa = "Level 1"
                if "الأول" in title or " 1" in title: mostawa = "Level 1"
                elif "الثاني" in title or " 2" in title: mostawa = "Level 2"
                elif "الثالث" in title or " 3" in title: mostawa = "Level 3"
                elif "الرابع" in title or " 4" in title: mostawa = "Level 4"
                
                slug = href.split('/')[-1]
                
                # Static English title generation
                title_en = f"Arabic For All - {title.replace('العربية بين أيدي أولادنا', 'Arabic At Our Children Hands').replace('كتاب الطالب', 'Student Book').replace('كتاب المعلم', 'Teacher Book')}"
                
                price_override = None
                if fiae in ["العربية بين أيدي أولادنا", "العربية بين يديك"]:
                    if "معلم" in title:
                        price_override = "29.90"
                    else:
                        price_override = "19.90"

                # Detailed description extraction
                description = "منهج معتمد من السلسلة الرسمية"
                print(f"Scraping [{idx+1}/{len(links)}]: {title}")
                try:
                    prod_res = session.get(href, timeout=5)
                    if prod_res.status_code == 200:
                        prod_soup = BeautifulSoup(prod_res.text, 'html.parser')
                        
                        desc_texts = []
                        for p_tag in prod_soup.find_all('p'):
                            pt = p_tag.text.strip()
                            if pt and len(pt) > 30 and "جميع الحقوق محفوظة" not in pt:
                                desc_texts.append(pt)
                        
                        if desc_texts:
                            description = " ".join(desc_texts[:2]) 
                except Exception as e:
                    print(f"Skipping detail fetch for {href}: {e}")

                products.append({
                    "id": slug,
                    "title": title,
                    "description": description,
                    "price": price_override if price_override else "45.00",
                    "image_urls": [img_url] if img_url else [],
                    "product_url": href,
                    "manhaj": "arabicforall",
                    "fiae": fiae,
                    "mostawa": mostawa,
                    "slug": slug,
                    "title_en": title_en
                })
    except Exception as e:
        print(f"Failed to fetch Arabic For All store: {e}")
            
    if not products:
        print("Warning: Failed to parse products from HTML. Using constructed fallback.")
        build_fallback_data()
        return

    # Save to json file
    with open('scraper/arabicforall_data.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully scraped {len(products)} products and saved to scraper/arabicforall_data.json")

def build_fallback_data():
    print("Building fallback data structure as requested...")
    products = []
    # Build Awladna explicitly
    for L in range(1, 5):
        for P in range(1, 3):
            slug = f"awladna-student-{L}-{P}"
            products.append({
                "id": slug,
                "title": f"العربية بين أيدي أولادنا - كتاب الطالب | المستوى {L} - الجزء {P}",
                "description": "سلسلة متكاملة لتعليم اللغة العربية",
                "price": "19.90",
                "image_urls": [],
                "product_url": "https://platform.arabicforall.net/shop",
                "manhaj": "arabicforall",
                "fiae": "العربية بين أيدي أولادنا",
                "mostawa": f"Level {L}",
                "slug": slug,
                "title_en": f"Arabic At Our Children's Hands - Student Book L{L} P{P}"
            })
            
            slug_y = f"yadayk-student-{L}-{P}"
            products.append({
                "id": slug_y,
                "title": f"العربية بين يديك - كتاب الطالب | المستوى {L} - الجزء {P}",
                "description": "منهج العربية بين يديك",
                "price": "19.90",
                "image_urls": [],
                "product_url": "https://platform.arabicforall.net/shop",
                "manhaj": "arabicforall",
                "fiae": "العربية بين يديك",
                "mostawa": f"Level {L}",
                "slug": slug_y,
                "title_en": f"Arabic At Your Hands - Student Book L{L} P{P}"
            })
            
        t_slug = f"awladna-teacher-{L}"
        products.append({
            "id": t_slug,
            "title": f"العربية بين أيدي أولادنا - كتاب المعلم | المستوى {L}",
            "description": "دليل المعلم للسلسلة",
            "price": "29.90",
            "image_urls": [],
            "product_url": "https://platform.arabicforall.net/shop",
            "manhaj": "arabicforall",
            "fiae": "العربية بين أيدي أولادنا",
            "mostawa": f"Level {L}",
            "slug": t_slug,
            "title_en": f"Arabic At Our Children's Hands - Teacher Book L{L}"
        })
        
        t_slug_y = f"yadayk-teacher-{L}"
        products.append({
            "id": t_slug_y,
            "title": f"العربية بين يديك - كتاب المعلم | المستوى {L}",
            "description": "دليل المعلم",
            "price": "29.90",
            "image_urls": [],
            "product_url": "https://platform.arabicforall.net/shop",
            "manhaj": "arabicforall",
            "fiae": "العربية بين يديك",
            "mostawa": f"Level {L}",
            "slug": t_slug_y,
            "title_en": f"Arabic At Your Hands - Teacher Book L{L}"
        })
        
    with open('scraper/arabicforall_data.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    print("Saved fallback structured data to scraper/arabicforall_data.json")

if __name__ == "__main__":
    scrape_arabic_for_all()
