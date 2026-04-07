document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Scroll Effect ---
    const nav = document.querySelector('.local-nav');
    const handleScroll = () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // --- Modal Logic ---
    const bookingModal = document.getElementById('bookingModal');
    const bookBtns = [
        document.getElementById('bookNavBtn'),
        document.getElementById('heroBookBtn')
    ];
    const closeModal = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccess = document.getElementById('bookingSuccess');

    const openModal = () => {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeBookingModal = () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            bookingForm.style.display = 'block';
            bookingSuccess.style.display = 'none';
            bookingForm.reset();
        }, 400);
    };

    bookBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    });
    
    if (closeModal) closeModal.addEventListener('click', closeBookingModal);

    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) closeBookingModal();
    });

    // --- Form Submission Logic ---
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = bookingForm.querySelector('button');
            submitBtn.innerText = 'Confirming...';
            submitBtn.disabled = true;

            setTimeout(() => {
                bookingForm.style.display = 'none';
                bookingSuccess.style.display = 'block';
                submitBtn.innerText = 'Confirm Booking';
                submitBtn.disabled = false;
            }, 1200);
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // --- Service Categories ---
    const serviceCats = document.querySelectorAll('.service-cat-item');
    const serviceGroups = document.querySelectorAll('.service-group');
    
    serviceCats.forEach(cat => {
        cat.addEventListener('click', () => {
            const targetCategory = cat.getAttribute('data-category');
            
            // Update active tab
            serviceCats.forEach(c => c.classList.remove('active'));
            cat.classList.add('active');
            
            // Filter groups
            serviceGroups.forEach(group => {
                if (group.getAttribute('data-group') === targetCategory) {
                    group.style.display = 'block';
                    // Re-trigger reveal for items in this group
                    const items = group.querySelectorAll('.reveal');
                    items.forEach(item => {
                        item.classList.add('js-hide');
                        item.classList.remove('active');
                        // Quick timeout to allow jump back to hidden
                        setTimeout(() => {
                            const rect = item.getBoundingClientRect();
                            item.classList.remove('js-hide');
                            item.classList.add('active');
                        }, 50);
                    });
                } else {
                    group.style.display = 'none';
                }
            });
        });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    // Add js-hide class to elements that will be animated
    revealElements.forEach(el => el.classList.add('js-hide'));

    const handleReveal = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const offset = window.innerHeight * 0.15;
            if (rect.top <= (window.innerHeight - offset)) {
                el.classList.remove('js-hide');
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Trigger initially for hero section

    // --- Service Item CTA ---
    const initServiceCTA = () => {
        document.querySelectorAll('.service-row').forEach(row => {
            row.addEventListener('click', () => {
                const serviceName = row.querySelector('.name').innerText.trim();
                openModal();
                
                // Pre-select service in modal dropdown
                const select = bookingModal.querySelector('select');
                if (select) {
                    for (let i = 0; i < select.options.length; i++) {
                        const optionText = select.options[i].text.toLowerCase();
                        const searchName = serviceName.toLowerCase();
                        if (searchName.includes(optionText) || optionText.includes(searchName)) {
                            select.selectedIndex = i;
                            break;
                        }
                    }
                }
            });
        });
    };

    initServiceCTA();

    // --- Smooth Anchor Navigation Fix ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
