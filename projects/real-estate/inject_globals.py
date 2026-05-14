import os

files = ['index.html', 'portfolio.html', 'studio.html', 'contact.html']
for fn in files:
    with open(fn, 'r', encoding='utf-8') as f:
        html = f.read()

    # Add data.js if not present
    if '<script src="data.js"></script>' not in html:
        html = html.replace('<script src="script.js"></script>', '<script src="data.js"></script>\n    <script src="script.js"></script>')
    
    # Add hamburger to nav
    if '<button class="mobile-nav-toggle"' not in html:
        html = html.replace('<div class="nav-right">', '<div class="nav-right">\n            <button class="mobile-nav-toggle" aria-label="Toggle Navigation">\n                <span></span><span></span><span></span>\n            </button>')

    with open(fn, 'w', encoding='utf-8') as f:
        f.write(html)

print("Injected data.js and mobile nav into HTML files.")
