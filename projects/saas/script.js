document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Logic
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

    // 2. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // 3. Pricing Toggle Logic
    const billingToggle = document.getElementById('billing-toggle');
    const priceElements = document.querySelectorAll('.price');

    if (billingToggle) {
        billingToggle.addEventListener('change', () => {
            const isYearly = billingToggle.checked;
            priceElements.forEach(el => {
                if (el.getAttribute('data-monthly')) {
                    const price = isYearly ? el.getAttribute('data-yearly') : el.getAttribute('data-monthly');
                    const suffix = isYearly ? '<span>/mo</span>' : '<span>/mo</span>';
                    el.innerHTML = `${price}${suffix}`;
                }
            });
        });
    }

    // 4. Modal System Logic
    const modal = document.getElementById('signup-modal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalSubmit = document.getElementById('modal-submit');
    const extraField = document.getElementById('extra-field');

    if (modal) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.getAttribute('data-modal');
                
                // Dynamic Content Swap
                if (type === 'signin') {
                    modalTitle.innerText = "Welcome Back";
                    modalDesc.innerText = "Sign in to your Nexus dashboard.";
                    modalSubmit.innerText = "Sign In";
                    extraField.classList.add('hidden');
                } else if (type === 'sales') {
                    modalTitle.innerText = "Talk to Experts";
                    modalDesc.innerText = "Book a demo and see Nexus in action.";
                    modalSubmit.innerText = "Request Demo";
                    extraField.classList.remove('hidden');
                } else {
                    modalTitle.innerText = "Get Started with Nexus";
                    modalDesc.innerText = "Enter your details and start growing your product.";
                    modalSubmit.innerText = "Create Free Account";
                    extraField.classList.remove('hidden');
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 5. Simulated Dashboard Activity
    const bars = document.querySelectorAll('.bar');
    const stats = document.querySelectorAll('.m-stat');
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    function updateDashboard() {
        // Randomize chart bars
        bars.forEach(bar => {
            const randomHeight = Math.floor(Math.random() * 60) + 30;
            bar.style.height = `${randomHeight}%`;
        });

        // Toggle sidebar active state randomly
        sidebarItems.forEach((item, idx) => {
            if (Math.random() > 0.8) {
                sidebarItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }
        });

        // Pulsate stats
        stats.forEach(stat => {
            stat.style.opacity = Math.random() * 0.5 + 0.5;
        });
    }

    setInterval(updateDashboard, 2500);

    // 6. Form Submission Logic
    const signupForm = document.getElementById('signup-form');
    const signupSuccess = document.getElementById('signup-success');
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = signupForm.querySelector('button');
            btn.innerText = "Creating Account...";
            btn.disabled = true;

            setTimeout(() => {
                signupForm.classList.add('hidden');
                signupSuccess.classList.remove('hidden');
            }, 1500);
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.classList.add('hidden');
            newsletterSuccess.classList.remove('hidden');
        });
    }

    // 7. Navbar Scroll Effect
    const nav = document.querySelector('.saas-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('glass-nav');
        } else {
            nav.classList.remove('glass-nav');
        }
    });
});
