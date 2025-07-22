import os
import re
from urllib.parse import urlparse

def find_html_files(directory):
    html_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.join(root, file))
    return html_files

def get_all_links(html_files):
    links = set()
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            # Find all href attributes
            hrefs = re.findall(r'href="([^"]*)"', content)
            links.update(hrefs)
            # Find all src attributes
            srcs = re.findall(r'src="([^"]*)"', content)
            links.update(srcs)
    return links

def check_links(links, base_dir):
    broken_links = []
    for link in links:
        if link.startswith("#") or link.startswith("mailto:") or link.startswith("tel:"):
            continue

        parsed_link = urlparse(link)
        if parsed_link.scheme:
            # External link, skip for now
            continue

        # Internal link
        path = os.path.join(base_dir, parsed_link.path)
        if not os.path.exists(path):
            broken_links.append(link)
    return broken_links

if __name__ == "__main__":
    html_files = find_html_files(".")
    all_links = get_all_links(html_files)
    broken_links = check_links(all_links, ".")

    if broken_links:
        print("Broken links found:")
        for link in broken_links:
            print(link)
    else:
        print("No broken links found.")
