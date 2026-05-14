import os

css_additions = """
/* Mobile Nav Hamburger */
.mobile-nav-toggle {
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    flex-direction: column;
    gap: 6px;
    padding: 10px;
    z-index: 1000;
}
.mobile-nav-toggle span {
    display: block;
    width: 25px;
    height: 2px;
    background: var(--text-primary);
    transition: all 0.3s ease;
}
.mobile-nav-open .oh-nav-links {
    display: flex !important;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: rgba(11, 11, 11, 0.95);
    backdrop-filter: blur(15px);
    padding: 20px;
    border-radius: 20px;
    gap: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}
.mobile-nav-open .mobile-nav-toggle span:nth-child(1) { transform: rotate(45deg) translate(6px, 5px); }
.mobile-nav-open .mobile-nav-toggle span:nth-child(2) { opacity: 0; }
.mobile-nav-open .mobile-nav-toggle span:nth-child(3) { transform: rotate(-45deg) translate(6px, -5px); }

/* Quick Search Hero */
.hero-search-bar {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(11, 11, 11, 0.85);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    display: flex;
    padding: 10px;
    gap: 15px;
    width: 90%;
    max-width: 800px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    opacity: 0; /* Animated in by GSAP */
}
.search-input {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.search-input .label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-secondary);
    margin-bottom: 5px;
}
.search-input input, .search-input select {
    background: transparent;
    border: none;
    color: white;
    font-size: 1.1rem;
    font-family: var(--font-main);
    outline: none;
}
.search-input select option { background: #111; }
#hero-search-btn {
    border-radius: 8px;
    white-space: nowrap;
}

/* Sticky Filter Bar */
.advanced-filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(26, 26, 26, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 15px 30px;
    border-radius: 12px;
    margin-bottom: 40px;
    gap: 20px;
    flex-wrap: wrap;
}
.filter-group {
    display: flex;
    align-items: center;
    gap: 10px;
}
.filter-group label {
    font-size: 0.85rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
}
.filter-group select {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    outline: none;
    font-family: var(--font-main);
}
.filter-group select option { background: #1a1a1a; }

/* Expanded Modal Details */
.expanded-modal {
    background: rgba(0,0,0,0.95);
}
.detail-content {
    flex-direction: row;
    overflow-y: auto;
    background: var(--bg-main);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
.modal-gallery {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 30px;
    gap: 15px;
}
.modal-gallery .real-view-img {
    height: 60vh;
    border-radius: 16px;
    object-fit: cover;
}
.gallery-thumbs {
    display: flex;
    gap: 15px;
    overflow-x: auto;
}
.gallery-thumbs img {
    height: 100px;
    width: 150px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    opacity: 0.6;
    transition: 0.3s;
}
.gallery-thumbs img:hover, .gallery-thumbs img.active {
    opacity: 1;
    border: 2px solid var(--accent-blue);
}

.modal-specs-area {
    flex: 1;
    padding: 40px;
    background: var(--bg-secondary);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}
.modal-header { margin-bottom: 30px; }
.modal-header .real-view-location { color: var(--text-secondary); font-size: 1.1rem; }
.specs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-bottom: 30px;
}
.spec-item {
    background: rgba(255,255,255,0.03);
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.05);
}
.spec-value { display: block; font-size: 1.5rem; font-weight: 600; margin-bottom: 5px; }
.spec-label { font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; }

.modal-desc-box h4, .modal-amenities h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    margin-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 10px;
}
.modal-desc-box p {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 30px;
}

#modal-amenities-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    list-style: none;
    margin-bottom: 40px;
}
#modal-amenities-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text-secondary);
}
#modal-amenities-list li::before {
    content: "•";
    color: var(--accent-blue);
    font-weight: bold;
}
.modal-actions { margin-top: auto; }

/* Responsive adjustments */
@media (max-width: 900px) {
    .detail-content { flex-direction: column; }
    .hero-search-bar { flex-direction: column; }
    .search-input { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .mobile-nav-toggle { display: flex; }
    .oh-nav-links { display: none; }
    .specs-grid { grid-template-columns: 1fr; }
}
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css_additions)

print("Appended CSS successfully.")
