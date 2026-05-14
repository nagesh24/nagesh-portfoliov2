import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Header part (up to <nav> end)
header_end = html.find('</nav>') + len('</nav>')
header_html = html[:header_end]

# Footer part
footer_start = html.find('<!-- Footer -->')
footer_html = html[footer_start:]

# Sections
properties_start = html.find('<!-- Properties Section -->')
properties_end = html.find('<!-- Testimonials Section -->')
properties_html = html[properties_start:properties_end]

testimonials_start = html.find('<!-- Testimonials Section -->')
testimonials_end = html.find('<!-- Lead Capture Section -->')
testimonials_html = html[testimonials_start:testimonials_end]

contact_start = html.find('<!-- Lead Capture Section -->')
contact_end = html.find('<!-- Footer -->')
contact_html = html[contact_start:contact_end]

hero_start = html.find('<!-- Olivia Harper Clone Hero -->')
hero_end = html.find('<!-- Properties Section -->')
hero_html = html[hero_start:hero_end]

# Update Nav Links in header
header_html = header_html.replace('href="#properties"', 'href="portfolio.html"')
header_html = header_html.replace('href="#about"', 'href="studio.html"')
header_html = header_html.replace('href="#contact"', 'href="contact.html"')
header_html = header_html.replace('<div class="logo oh-logo">LUXE ESTATES</div>', '<a href="index.html" class="logo oh-logo" style="text-decoration:none;">LUXE ESTATES</a>')

# Create index.html (Hero + 3 Properties + Footer)
# Get first 3 properties.
p_start = properties_html.find('<!-- Card 4 -->')
props_abbr = properties_html[:p_start] + '</div>\n    </section>\n\n'
new_index = header_html + '\n\n' + hero_html + '\n\n' + props_abbr + footer_html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_index)

# Create portfolio.html
with open('portfolio.html', 'w', encoding='utf-8') as f:
    p_html = properties_html.replace('class="properties"', 'class="properties" style="padding-top: 150px;"')
    f.write(header_html.replace('<title>Premium Living | FIND Real Estate</title>', '<title>Portfolio | Premium Living | FIND Real Estate</title>') + '\n\n' + p_html + footer_html)

# Create studio.html
with open('studio.html', 'w', encoding='utf-8') as f:
    t_html = testimonials_html.replace('class="testimonials"', 'class="testimonials" style="margin-top: 150px;"')
    intro = '''    <section class="studio-intro" style="padding: 150px 40px 40px; max-width: 1400px; margin: 0 auto; text-align: center;">\n        <h1 style="font-family: \'Cormorant Garamond\', serif; font-size: 4rem;">The Studio</h1>\n        <p style="color: var(--text-secondary); max-width: 600px; margin: 20px auto; font-size: 1.1rem;">We are an exclusive real estate agency specializing in the world\'s finest properties. Discretion, excellence, and perfection.</p>\n    </section>\n\n'''
    f.write(header_html.replace('<title>Premium Living | FIND Real Estate</title>', '<title>Studio | Premium Living | FIND Real Estate</title>') + '\n\n' + intro + t_html + footer_html)

# Create contact.html
with open('contact.html', 'w', encoding='utf-8') as f:
    c_html = contact_html.replace('class="lead-capture"', 'class="lead-capture" style="padding-top: 150px;"')
    f.write(header_html.replace('<title>Premium Living | FIND Real Estate</title>', '<title>Enquire | Premium Living | FIND Real Estate</title>') + '\n\n' + c_html + footer_html)

print("Split completed successfully!")
