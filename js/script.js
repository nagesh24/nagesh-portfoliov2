document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Animations
    requestAnimationFrame(() => {
        // Trigger basic fades
        document.querySelectorAll('.fade-in-up, .fade-in').forEach(el => {
            el.classList.add('is-visible');
        });
        
        // Specific trigger for premium hero
        const hero = document.getElementById('hero');
        if (hero) {
            setTimeout(() => {
                hero.classList.add('is-visible');
            }, 100);
        }
    });

    // 2. Scroll Reveal Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial setup for scroll elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.classList.add('fade-in-up'); // Reusing the css class for start state
        observer.observe(el);
    });

    // 3. Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-card');
    const nextBtn = document.getElementById('next-test');
    const prevBtn = document.getElementById('prev-test');
    let currentSlide = 0;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            if(i === index) {
                slide.classList.remove('hidden');
            } else {
                slide.classList.add('hidden');
            }
        });
    };

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

    // 4. Smooth scrolling for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. 3D Background Canvas
    const canvas = document.getElementById('canvas3d');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let particles = [];
        const colors = ['rgba(255, 32, 51, 0.5)', 'rgba(50, 50, 50, 0.5)', 'rgba(255, 255, 255, 0.1)'];

        // Initialize particles
        for(let i=0; i<80; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 2 + 0.1,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 3 + 1
            });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.x += p.vx / p.z;
                p.y += p.vy / p.z;

                // Bounce off edges
                if(p.x < 0 || p.x > width) p.vx *= -1;
                if(p.y < 0 || p.y > height) p.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size / p.z, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Draw connecting lines to nearby particles
                particles.forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    
                    if(dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 32, 51, ${0.1 - dist/1200})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }

    // 6. Number Counter Animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseFloat(target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const startTime = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out cubic
                    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
                    const currentVal = easeOut(progress) * targetValue;
                    
                    if (targetValue % 1 === 0) {
                        target.innerText = Math.floor(currentVal);
                    } else {
                        target.innerText = currentVal.toFixed(1);
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.innerText = targetValue;
                    }
                };
                
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(cnt => counterObserver.observe(cnt));

    // 7. Hero Mouse Parallax (Updated to coexist with scroll)
    const hero = document.getElementById('hero');
    const portrait = document.querySelector('.hero-center-portrait');
    const heroContent = document.querySelector('.premium-hero-content');
    
    if (hero && portrait && heroContent) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const moveX = (clientX / innerWidth - 0.5) * 30;
            const moveY = (clientY / innerHeight - 0.5) * 20;

            // Store mouse offset for scroll logic
            hero.dataset.mouseX = moveX;
            hero.dataset.mouseY = moveY;

            updateHeroTransforms();
        });

        hero.addEventListener('mouseleave', () => {
            hero.dataset.mouseX = 0;
            hero.dataset.mouseY = 0;
            updateHeroTransforms();
        });
    }

    // 8. Creative Scroll-Linked Animation
    function updateHeroTransforms() {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;
        const progress = Math.min(scrollY / heroHeight, 1);
        
        const mouseX = parseFloat(hero.dataset.mouseX || 0);
        const mouseY = parseFloat(hero.dataset.mouseY || 0);

        // 1. Portrait Sink (Scroll + Mouse)
        // Base scale 1.02 (from CSS), sinks to 0.95
        const scale = 1.02 - (progress * 0.07);
        const translateY = progress * 100; // Move down slower than scroll
        portrait.style.transform = `translate(${mouseX * 0.5}px, ${mouseY * 0.5 + translateY}px) scale(${scale})`;
        portrait.style.opacity = 1 - (progress * 0.8);
        
        // 2. Content Fade and Rise
        const contentTranslateY = -progress * 150; // Move up while fading
        heroContent.style.transform = `translate(${-mouseX * 0.3}px, ${-mouseY * 0.3 + contentTranslateY}px)`;
        heroContent.style.opacity = 1 - (progress * 1.5);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY <= hero.offsetHeight) {
            requestAnimationFrame(updateHeroTransforms);
        }
    });

    // 9. Navbar Transparent → Solid on scroll past hero
    const navbar = document.querySelector('.navbar');
    const heroSection = document.getElementById('hero');

    function updateNavbar() {
        if (!heroSection || !navbar) return;
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY >= heroBottom - 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar(); // Run on load

    // 10. Magnetic CTAs
    document.querySelectorAll('.link-cta').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });

    // 11. Background Theme Morpher
    const themeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const color = entry.target.getAttribute('data-theme-color');
                if (color) {
                    document.documentElement.style.setProperty('--theme-glow', color.replace(')', ', 0.15)'));
                    // We use rgba for the radial gradient in css, so we just pass the hex or color name
                    document.documentElement.style.setProperty('--theme-glow', color);
                }
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.showcase-row').forEach(row => themeObserver.observe(row));

    // 12. Project Parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.querySelectorAll('.showcase-row').forEach(row => {
            const img = row.querySelector('.showcase-img');
            const content = row.querySelector('.showcase-content');
            if (img && content) {
                const rect = row.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const shift = (rect.top - window.innerHeight / 2) * 0.1;
                    img.style.transform = `translateY(${shift}px)`;
                    content.style.transform = `translateY(${-shift * 0.5}px)`;
                }
            }
        });
    });

    // 13. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
});
