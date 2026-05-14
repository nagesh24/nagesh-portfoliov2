import os
import re

# Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace static grid with empty dynamic container
html = re.sub(r'<div class="property-grid">.*?</div>\n    </section>', '<div id="featured-grid" class="property-grid"></div>\n    </section>', html, flags=re.DOTALL)

# Add quick search to hero section
search_html = """
            <div class="hero-search-bar">
                <div class="search-input">
                    <span class="label">Location</span>
                    <input type="text" id="hero-location" placeholder="Where to?">
                </div>
                <div class="search-input">
                    <span class="label">Property Type</span>
                    <select id="hero-type">
                        <option value="All">All Types</option>
                        <option value="Villa">Villa</option>
                        <option value="Mansion">Mansion</option>
                        <option value="Penthouse">Penthouse</option>
                    </select>
                </div>
                <button id="hero-search-btn" class="btn btn-primary">Search Portfolio</button>
            </div>
"""
if 'hero-search-bar' not in html:
    html = html.replace('<div class="hero-bottom-left">', search_html + '\n            <div class="hero-bottom-left">')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Update portfolio.html
with open('portfolio.html', 'r', encoding='utf-8') as f:
    p_html = f.read()

# Replace static grid with empty dynamic container
p_html = re.sub(r'<div class="property-grid">.*?</div>\n    </section>', '<div id="all-listings-grid" class="property-grid"></div>\n    </section>', p_html, flags=re.DOTALL)

# Add sticky filter bar
filter_bar = """
        <div class="advanced-filter-bar">
            <div class="filter-group">
                <label>Max Budget</label>
                <select id="filter-price">
                    <option value="999999999">Any Price</option>
                    <option value="10000000">< $10,000,000</option>
                    <option value="20000000">< $20,000,000</option>
                    <option value="30000000">< $30,000,000</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Beds</label>
                <select id="filter-beds">
                    <option value="0">Any</option>
                    <option value="4">4+</option>
                    <option value="6">6+</option>
                    <option value="8">8+</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Type</label>
                <select id="filter-type">
                    <option value="All">All</option>
                    <option value="Villa">Villa</option>
                    <option value="Mansion">Mansion</option>
                    <option value="Penthouse">Penthouse</option>
                </select>
            </div>
        </div>
"""
if 'advanced-filter-bar' not in p_html:
    p_html = p_html.replace('<div class="section-header">', filter_bar + '\n        <div class="section-header">')

# Modify the real-view-modal for detailed view
modal_upgrade = """
    <!-- Expanded Real View Modal -->
    <div id="real-view-modal" class="real-view-modal expanded-modal">
        <div class="modal-overlay"></div>
        <button class="close-modal" aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
        <div class="modal-content detail-content">
            <div class="modal-gallery">
                <img class="real-view-img" src="" alt="Main Property View">
                <div class="gallery-thumbs" id="gallery-thumbs"></div>
            </div>
            <div class="modal-specs-area">
                <div class="modal-header">
                    <h3 class="real-view-title"></h3>
                    <p class="real-view-price"></p>
                    <p class="real-view-location text-secondary"></p>
                </div>
                
                <div class="specs-grid">
                    <div class="spec-item">
                        <span class="spec-value" id="spec-beds"></span>
                        <span class="spec-label">Beds</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-value" id="spec-baths"></span>
                        <span class="spec-label">Baths</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-value" id="spec-sqft"></span>
                        <span class="spec-label">Sq Ft</span>
                    </div>
                </div>

                <div class="modal-desc-box">
                    <h4>About this property</h4>
                    <p id="modal-desc"></p>
                </div>

                <div class="modal-amenities">
                    <h4>Amenities</h4>
                    <ul id="modal-amenities-list"></ul>
                </div>

                <div class="modal-actions">
                    <a href="contact.html" class="btn btn-primary btn-block">Enquire Now</a>
                </div>
            </div>
        </div>
    </div>
"""
# Replace existing real-view-modal
p_html = re.sub(r'<!-- Real View Modal -->.*?<!-- Scripts -->', modal_upgrade + '\n    <!-- Scripts -->', p_html, flags=re.DOTALL)

with open('portfolio.html', 'w', encoding='utf-8') as f:
    f.write(p_html)

# Also update index.html modal just in case featured properties are clicked
with open('index.html', 'r', encoding='utf-8') as f:
    i_html = f.read()
i_html = re.sub(r'<!-- Real View Modal -->.*?<!-- Scripts -->', modal_upgrade + '\n    <!-- Scripts -->', i_html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(i_html)

print("Updated index and portfolio structure, injected extended modal.")
