// Property Search Logic
function executeSearch() {
    const loc = document.getElementById('searchLocation').value;
    const type = document.getElementById('searchType').value;
    const price = document.getElementById('searchPrice').value;
    
    let url = 'properties.html?';
    if (loc !== 'all') url += `location=${encodeURIComponent(loc)}&`;
    if (type !== 'all') url += `type=${encodeURIComponent(type)}&`;
    if (price !== 'all') url += `price=${price}&`;
    
    window.location.href = url.slice(0, -1);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

// Nav Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Virtual Tour Dragging
let isDragging = false;
let startX;
let scrollLeft;
function startDrag(e) {
    isDragging = true;
    const viewport = document.getElementById('tourViewport');
    if(viewport) {
        viewport.classList.add('active');
        startX = e.pageX - viewport.offsetLeft;
        scrollLeft = viewport.scrollLeft;
    }
}
function doDrag(e) {
    if (!isDragging) return;
    e.preventDefault();
    const viewport = document.getElementById('tourViewport');
    if(viewport) {
        const x = e.pageX - viewport.offsetLeft;
        const walk = (x - startX) * 2;
        viewport.scrollLeft = scrollLeft - walk;
    }
}
function endDrag() {
    isDragging = false;
    const viewport = document.getElementById('tourViewport');
    if(viewport) {
        viewport.classList.remove('active');
    }
}

function switchRoom(index, btn) {
    const btns = document.querySelectorAll('.tour-room-btn');
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function toggleFullscreen() {
    const elem = document.getElementById('tourViewport');
    if (!elem) return;
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Testimonials Slider
function goTestimonial(index) {
    const track = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.testimonial-dot');
    if (track && dots.length > 0) {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }
}

// Properties Grid View Toggle
function setView(view, btn) {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;
    if (view === 'list') {
        grid.style.gridTemplateColumns = '1fr';
    } else {
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
    }
    document.getElementById('viewGrid').style.background = view === 'grid' ? 'var(--gold)' : 'var(--stone)';
    document.getElementById('viewGrid').querySelector('svg').style.stroke = view === 'grid' ? 'white' : 'currentColor';
    document.getElementById('viewList').style.background = view === 'list' ? 'var(--gold)' : 'var(--stone)';
    document.getElementById('viewList').querySelector('svg').style.stroke = view === 'list' ? 'white' : 'currentColor';
}

function handleFormSubmit(btn) {
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    setTimeout(() => {
        btn.textContent = 'Message Sent';
        btn.style.background = '#2d7a4f';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
    }, 1500);
}

// Favorites System
function toggleFavorite(id, btn) {
    let favorites = JSON.parse(localStorage.getItem('luxFavorites')) || [];
    const index = favorites.indexOf(id);
    
    if (index === -1) {
        favorites.push(id);
        btn.classList.add('active');
    } else {
        favorites.splice(index, 1);
        btn.classList.remove('active');
    }
    
    localStorage.setItem('luxFavorites', JSON.stringify(favorites));
    updateFavCounter();
}

function updateFavCounter() {
    const favorites = JSON.parse(localStorage.getItem('luxFavorites')) || [];
    const countEl = document.getElementById('favCount');
    if (countEl) {
        countEl.textContent = favorites.length;
        countEl.style.display = favorites.length > 0 ? 'inline-block' : 'none';
    }
}



// ─── CINEMATIC HERO ENTRANCE ───
const startCinematicEntrance = () => {
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline();
        
        // Long-Shot Cinematic Intro: 12-second majestic push without blur
        gsap.fromTo('.cinematic-bg', 
            { scale: 1.0, filter: 'none' }, 
            { scale: 1.5, duration: 12, ease: 'power1.inOut' }
        );
        
        tl.fromTo('.cinematic-label', { opacity: 0, y: 30, letterSpacing: '0.2em' }, { opacity: 1, y: 0, letterSpacing: '0.6em', duration: 1.5, ease: 'power3.out', delay: 1.0 })
          .fromTo('.cinematic-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }, '-=1')
          .fromTo('.cinematic-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, '-=1')
          .fromTo('.hero-search-wrap', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, '-=1')
          .fromTo('.cinematic-scroll-indicator', { opacity: 0, bottom: 20 }, { opacity: 1, bottom: 40, duration: 1, ease: 'power2.out' }, '-=0.5');
    }
};

// ─── PRELOADER LOGO ANIMATION ───
const animatePreloaderLogo = () => {
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline();
        
        // Stagger LUX in from blur/opacity
        tl.fromTo('.lux-letter', 
            { opacity: 0, filter: 'blur(10px)', y: 20 },
            { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
        
        // Stagger Estate in with a glide from below
        tl.fromTo('.estate-letter',
            { opacity: 0, y: 30, rotateX: -90 },
            { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.08, ease: 'expo.out' },
            '-=0.4'
        );
        
        // Final "Shimmer" Glow
        tl.to('.preloader-logo', {
            textShadow: '0 0 30px rgba(212, 175, 55, 0.4)',
            duration: 1.5,
            repeat: -1,
            yoyo: true
        });
        
        return tl;
    }
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const logoAnimation = animatePreloaderLogo();
        
        // Wait for logo animation to reach a certain point before hiding preloader
        setTimeout(() => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 1.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    preloader.style.display = 'none';
                    startCinematicEntrance();
                }
            });
        }, 2500); // Allow time for the logo animation to finish its core reveal
    } else {
        setTimeout(startCinematicEntrance, 600);
    }

    updateFavCounter();
    
    // Check initial state of favorite buttons
    const favorites = JSON.parse(localStorage.getItem('luxFavorites')) || [];
    document.querySelectorAll('.property-favorite').forEach(btn => {
        const id = btn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (id && favorites.includes(id)) {
            btn.classList.add('active');
        }
    });



    // Live Map
    const initMap = () => {
        const mapEl = document.getElementById('liveMap');
        if (!mapEl) return;
        const map = L.map('liveMap', { center: [34.088, -118.448], zoom: 14, scrollWheelZoom: false, zoomControl: false });
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Esri' }).addTo(map);
        
        const customIcon = L.divIcon({ className: 'custom-marker', iconSize: [16, 16], iconAnchor: [8, 8] });
        
        propertyData.forEach(p => {
            const marker = L.marker(p.coords, { icon: customIcon }).addTo(map);
            marker.bindPopup(`<div style="text-align:center; color: white;"><div style="font-family:'Cormorant Garamond',serif;font-size:20px;margin-bottom:4px;color:#C9A96E">${p.title}</div><div style="font-weight:500;font-size:15px;margin-bottom:12px">$${p.price.toLocaleString()}</div><button onclick="window.location.href='detail.html?tour=${p.id}'" style="background:#C9A96E;color:white;border:none;padding:8px 16px;font-size:11px;text-transform:uppercase;cursor:pointer;letter-spacing:0.12em;width:100%">Enter Estate</button></div>`, { maxWidth: 260, closeButton: false });
            marker.on('mouseover', function() { this.openPopup(); });
        });
        L.control.zoom({ position: 'topright' }).addTo(map);
    };
    initMap();

    // GSAP
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Initialize Lenis
        if (typeof Lenis !== 'undefined') {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            })

            function raf(time) {
                lenis.raf(time)
                requestAnimationFrame(raf)
            }
            requestAnimationFrame(raf)
        }

        // Cinematic 3D Mouse Parallax
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5);
            const y = (e.clientY / window.innerHeight - 0.5);
            
            gsap.to('.cinematic-bg', { x: x * 40, y: y * 40, duration: 2, ease: 'power2.out' });
            gsap.to('#heroContent', { x: -x * 20, y: -y * 20, duration: 1.5, ease: 'power2.out' });
        });

        // Cinematic Scroll Sequence (Exterior -> Interior)
        const cinematicTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.cinematic-hero-wrapper',
                start: 'top top',
                end: '+=2500', // Pin for 2500px of scrolling
                pin: true,
                scrub: 1.5, // Smooth scrub
            }
        });

        const isMobile = window.innerWidth <= 768;
        const scrollScale = isMobile ? 2.2 : 1.6;

        cinematicTl
            // 1. Camera dolly in (Scale up exterior) and fade out text
            .to('.layer-exterior', { scale: scrollScale, transformOrigin: "center center", ease: "power2.inOut" }, 0)
            .to('#heroContent', { opacity: 0, y: -150, scale: 1.1, ease: "power1.in", display: 'none' }, 0)
            .to('.cinematic-scroll-indicator', { opacity: 0, ease: "power1.in", display: 'none' }, 0)
            
            // 2. Realistic Gate Opening! (3D Swinging)
            .to('#exteriorLeft', { rotateY: -110, xPercent: -20, opacity: 0, ease: "power2.in", duration: 1.2 }, 0.4)
            .to('#exteriorRight', { rotateY: 110, xPercent: 20, opacity: 0, ease: "power2.in", duration: 1.2 }, 0.4)
            .to('#exteriorLayer', { pointerEvents: 'none' }, 0.4)
            
            // 3. Interior reveals with a smooth zoom out
            .fromTo('#interiorBg', { scale: 1.4, filter: 'blur(10px)' }, { scale: 1, filter: 'blur(0px)', ease: "power2.out" }, 0.4)
            .to('#interiorContent', { opacity: 1, y: 0, duration: 0.1 }, 0.4)
            .from('#interiorContent .cinematic-label', { yPercent: 110, duration: 1, ease: "expo.out" }, 0.5)
            .from('.word-welcome', { xPercent: -100, opacity: 0, duration: 1.2, ease: "expo.out" }, 0.6)
            .from('.word-home', { xPercent: 100, opacity: 0, duration: 1.2, ease: "expo.out" }, 0.6)
            .from('#interiorContent .cinematic-subtitle', { yPercent: 110, duration: 1, ease: "expo.out" }, 0.7)
            .from('#interiorContent .btn-cinematic-primary', { yPercent: 110, duration: 1, ease: "expo.out", pointerEvents: 'auto' }, 0.8)
            .to('.interior-hotspot', { opacity: 1, stagger: 0.1, duration: 0.5, pointerEvents: 'auto' }, 0.9);

        // Lazy Load Tour
        const tourContainer = document.querySelector('.tour-iframe-container');
        if (tourContainer) {
            ScrollTrigger.create({
                trigger: tourContainer,
                start: 'top 120%',
                onEnter: () => {
                    const iframe = tourContainer.querySelector('iframe');
                    const placeholder = tourContainer.querySelector('.tour-placeholder');
                    if (iframe && iframe.getAttribute('data-src')) {
                        iframe.src = iframe.getAttribute('data-src');
                        iframe.onload = () => {
                            iframe.style.opacity = '1';
                            if (placeholder) placeholder.style.display = 'none';
                        };
                    }
                }
            });
        }

        // Stats Counter
        const stats = document.querySelectorAll('.stat-num');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const suffix = stat.innerText.includes('B') ? 'B+' : '+';
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 90%',
                onEnter: () => {
                    let obj = { val: 0 };
                    gsap.to(obj, { val: target, duration: 2, ease: 'power2.out', onUpdate: () => {
                        stat.innerHTML = Math.floor(obj.val) + (suffix.includes('B') ? 'B<span>+</span>' : '<span>+</span>');
                    }});
                }
            });
        });

        // Blog Reveal
        ScrollTrigger.batch('.blog-card', {
            onEnter: batch => gsap.fromTo(batch, {opacity: 0, y: 60, scale: 0.95}, {opacity: 1, y: 0, scale: 1, stagger: 0.2, duration: 1.2, ease: 'power4.out', overwrite: true}),
            start: 'top 85%'
        });

        // Magnetic Link
        const magBtns = document.querySelectorAll('button[onclick*="blog.html"]');
        magBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
            });
        });
    }
});
