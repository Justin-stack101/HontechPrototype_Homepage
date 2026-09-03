/**
 * HONTECH AUTO CENTER INC. — Main Client-Side JavaScript Engine
 * Pure Vanilla JavaScript (No Node/npm/framework dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
    // ── 1. Initialize Lucide Icons ──
    if (window.lucide) {
        lucide.createIcons();
    }

    // ── 2. Navbar Scroll Glassmorphic Effect & Back to Top ──
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar shadow & glass effect
        if (navbar) {
            if (scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back to top button
        if (backToTop) {
            if (scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Scroll progress bar
        if (scrollProgress) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollY / (docHeight || 1)) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── 3. Mobile Navigation Drawer ──
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    // ── 4. Active Nav Link Highlight on Scroll ──
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.navbar-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navAnchors.forEach(anchor => {
            anchor.classList.remove('active');
            if (anchor.getAttribute('href') === `#${current}`) {
                anchor.classList.add('active');
            }
        });
    });

    // ── 5. Smooth Scroll Offset for Fixed Navbar ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const pos = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: pos, behavior: 'smooth' });
                }
            }
        });
    });

    // ── 6. Scroll Reveal Animations ──
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));

    // ── 7. Timeline Progress Fill Animation ──
    const timelineFill = document.getElementById('timelineFill');
    if (timelineFill) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timelineFill.classList.add('animated');
                }
            });
        }, { threshold: 0.3 });
        timelineObserver.observe(timelineFill.parentElement);
    }

    // ── 8. Services Tabs Switching ──
    const serviceTabs = document.querySelectorAll('.services-tab');
    const servicePanels = document.querySelectorAll('.services-panel');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            serviceTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            servicePanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `panel-${target}`) {
                    panel.classList.add('active');
                    panel.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
                        el.classList.remove('visible');
                        setTimeout(() => el.classList.add('visible'), 50);
                    });
                }
            });
        });
    });

    // ── 9. Interactive FAQ Accordion ──
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.parentElement;
            const content = item.querySelector('.faq-content');
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherContent = otherItem.querySelector('.faq-content');
                if (otherContent) otherContent.style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // ── 10. Dynamic Number Counters ──
    const counterElements = document.querySelectorAll('.counter-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const target = parseInt(entry.target.dataset.target, 10) || 0;
                const duration = 1800;
                const startTime = performance.now();

                function animateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    entry.target.textContent = current;
                    if (progress < 1) {
                        requestAnimationFrame(animateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                }
                requestAnimationFrame(animateCounter);
            }
        });
    }, { threshold: 0.5 });
    counterElements.forEach(el => counterObserver.observe(el));

    // ── 11. Hero Particle Canvas System ──
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const PARTICLE_COUNT = 45;

        function resizeCanvas() {
            const hero = document.getElementById('hero');
            if (hero) {
                canvas.width = hero.offsetWidth;
                canvas.height = hero.offsetHeight;
            }
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.6;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.25 + 0.05;
                this.fadeDir = Math.random() > 0.5 ? 1 : -1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity += this.fadeDir * 0.002;
                if (this.opacity <= 0.02 || this.opacity >= 0.35) this.fadeDir *= -1;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(239, 68, 68, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(220, 38, 38, ${0.04 * (1 - dist / 110)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // Mouse repulsion physics
        let mouseX = -1000, mouseY = -1000;
        canvas.parentElement.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            particles.forEach(p => {
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    p.speedX += dx * 0.005;
                    p.speedY += dy * 0.005;
                }
            });
        });
    }

    // ── 12. Hero Mouse Follow ──
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const heroCard = document.querySelector('.hero-image-card');
            if (heroCard) {
                heroCard.style.transform = `translate(${x * -12}px, ${y * -12}px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
            }

            document.querySelectorAll('.hero-float').forEach((float, i) => {
                const speed = (i + 1) * 2.5;
                float.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            const heroCard = document.querySelector('.hero-image-card');
            if (heroCard) {
                heroCard.style.transform = 'translate(0, 0) rotateY(0deg) rotateX(0deg)';
                heroCard.style.transition = 'transform 0.5s ease-out';
                setTimeout(() => heroCard.style.transition = '', 500);
            }
        });
    }

    // ════════════════════════════════════════════════════════════
    // 13. INTERACTIVE COST ESTIMATOR & LIVE BOOKING ENGINE
    // ════════════════════════════════════════════════════════════
    let currentCarMultiplier = 1.0;
    let currentCarType = 'sedan';

    const carTypeBtns = document.querySelectorAll('.car-type-btn');
    const serviceCheckCards = document.querySelectorAll('.service-check-card');
    const selectedItemsList = document.getElementById('selectedItemsList');
    const selectedItemsBadge = document.getElementById('selectedItemsBadge');
    const baseSubtotalText = document.getElementById('baseSubtotalText');
    const scalingPercentText = document.getElementById('scalingPercentText');
    const scalingAmountText = document.getElementById('scalingAmountText');
    const grandTotalText = document.getElementById('grandTotalText');
    const estCatBtns = document.querySelectorAll('.est-cat-btn');

    // Car Type Button Selection
    carTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            carTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCarMultiplier = parseFloat(btn.dataset.multiplier) || 1.0;
            currentCarType = btn.dataset.type;
            updateEstimatorCalculation();
        });
    });

    // Service Card Click Toggle
    serviceCheckCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('selected');
            updateEstimatorCalculation();
        });
    });

    // Filter Category Tabs
    estCatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            estCatBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            serviceCheckCards.forEach(card => {
                if (filter === 'all' || card.dataset.cat === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Format currency to PHP
    function formatPHP(amount) {
        return '₱' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function getSelectedServices() {
        const selected = [];
        serviceCheckCards.forEach(card => {
            if (card.classList.contains('selected')) {
                const title = card.querySelector('.check-title').textContent.trim();
                const price = parseFloat(card.dataset.price) || 0;
                selected.push({ id: card.dataset.id, name: title, price: price });
            }
        });
        return selected;
    }

    function updateEstimatorCalculation() {
        const selected = getSelectedServices();
        let baseSubtotal = 0;

        // Populate Selected Items List in Summary
        if (selectedItemsList) {
            selectedItemsList.innerHTML = '';
            if (selected.length === 0) {
                selectedItemsList.innerHTML = '<div class="no-services-msg">No services selected yet. Click services on the left to add to your estimate.</div>';
            } else {
                selected.forEach(item => {
                    baseSubtotal += item.price;
                    const row = document.createElement('div');
                    row.className = 'selected-item-row';
                    row.innerHTML = `
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">${item.price === 0 ? '<span style="color:#10b981;font-weight:700">FREE</span>' : formatPHP(item.price)}</span>
                    `;
                    selectedItemsList.appendChild(row);
                });
            }
        }

        const sizeAdjustment = baseSubtotal * (currentCarMultiplier - 1.0);
        const grandTotal = Math.ceil(baseSubtotal * currentCarMultiplier);

        if (selectedItemsBadge) {
            selectedItemsBadge.textContent = `${selected.length} ${selected.length === 1 ? 'item' : 'items'} selected`;
        }

        if (baseSubtotalText) baseSubtotalText.textContent = formatPHP(baseSubtotal);
        if (scalingPercentText) scalingPercentText.textContent = `${currentCarMultiplier}x`;
        if (scalingAmountText) scalingAmountText.textContent = formatPHP(sizeAdjustment);
        if (grandTotalText) grandTotalText.textContent = formatPHP(grandTotal);
    }

    // Initialize calculation on page load
    updateEstimatorCalculation();

    // Set default booking date to tomorrow
    const custDateInput = document.getElementById('cust-date');
    if (custDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        custDateInput.min = new Date().toISOString().split('T')[0];
        custDateInput.value = tomorrow.toISOString().split('T')[0];
    }

    // ── 14. Booking Form AJAX Submission ──
    const bookingForm = document.getElementById('bookingForm');
    const btnSubmitBooking = document.getElementById('btnSubmitBooking');
    const bookingModal = document.getElementById('bookingModalBackdrop');
    const btnCloseModal = document.getElementById('btnCloseModal');

    if (bookingForm && btnSubmitBooking) {
        btnSubmitBooking.addEventListener('click', async (e) => {
            e.preventDefault();

            const selected = getSelectedServices();
            if (selected.length === 0) {
                showToast('Please select at least one maintenance service from the list.', 'warning');
                return;
            }

            const carModel = document.getElementById('car-model-input')?.value.trim();
            const custName = document.getElementById('cust-name')?.value.trim();
            const custPhone = document.getElementById('cust-phone')?.value.trim();
            const custEmail = document.getElementById('cust-email')?.value.trim();
            const custDate = document.getElementById('cust-date')?.value;
            const custTime = document.getElementById('cust-time')?.value;
            const custNotes = document.getElementById('cust-notes')?.value.trim();

            if (!carModel) {
                showToast('Please specify your vehicle make & model.', 'warning');
                document.getElementById('car-model-input')?.focus();
                return;
            }

            if (!custName || !custPhone) {
                showToast('Please provide your name and mobile number.', 'warning');
                document.getElementById('cust-name')?.focus();
                return;
            }

            const baseSubtotal = selected.reduce((sum, item) => sum + item.price, 0);
            const totalEstimate = Math.ceil(baseSubtotal * currentCarMultiplier);

            const payload = {
                name: custName,
                phone: custPhone,
                email: custEmail,
                car_model: carModel,
                car_type: currentCarType,
                booking_date: custDate,
                booking_time: custTime,
                notes: custNotes,
                services: selected.map(s => s.name),
                total_estimate: totalEstimate
            };

            btnSubmitBooking.disabled = true;
            btnSubmitBooking.innerHTML = '<i data-lucide="loader" class="spin"></i> Processing Booking...';
            if (window.lucide) lucide.createIcons();

            try {
                const response = await fetch('api/book_appointment.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (result.success) {
                    // Populate Receipt Modal
                    document.getElementById('receiptId').textContent = result.id;
                    document.getElementById('receiptName').textContent = custName;
                    document.getElementById('receiptVehicle').textContent = `${carModel} (${currentCarType.toUpperCase()})`;
                    document.getElementById('receiptDateTime').textContent = `${custDate} @ ${custTime}`;
                    document.getElementById('receiptServicesCount').textContent = `${selected.length} services selected`;
                    document.getElementById('receiptTotal').textContent = formatPHP(totalEstimate);

                    // Show Modal
                    bookingModal.classList.add('open');
                    if (window.lucide) lucide.createIcons();

                    // Reset form fields
                    document.getElementById('car-model-input').value = '';
                    document.getElementById('cust-name').value = '';
                    document.getElementById('cust-phone').value = '';
                    document.getElementById('cust-email').value = '';
                    document.getElementById('cust-notes').value = '';

                    showToast('Appointment booked successfully! Ref: ' + result.id, 'success');
                } else {
                    showToast(result.message || 'Booking failed. Please try again.', 'error');
                }
            } catch (err) {
                console.error('Booking submission error:', err);
                showToast('Unable to connect to booking server. Please check your connection.', 'error');
            } finally {
                btnSubmitBooking.disabled = false;
                btnSubmitBooking.innerHTML = '<i data-lucide="calendar-check" style="width:18px;height:18px"></i> Confirm & Book Appointment';
                if (window.lucide) lucide.createIcons();
            }
        });
    }

    if (btnCloseModal && bookingModal) {
        btnCloseModal.addEventListener('click', () => {
            bookingModal.classList.remove('open');
        });

        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('open');
            }
        });
    }

    // ── 15. Contact Form AJAX Submission ──
    const contactForm = document.getElementById('contactForm');
    const btnSubmitContact = document.getElementById('btnSubmitContact');

    if (contactForm && btnSubmitContact) {
        btnSubmitContact.addEventListener('click', async (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name')?.value.trim();
            const email = document.getElementById('contact-email')?.value.trim();
            const message = document.getElementById('contact-message')?.value.trim();

            if (!name || !email || !message) {
                showToast('Please fill in all fields in the contact form.', 'warning');
                return;
            }

            btnSubmitContact.disabled = true;
            btnSubmitContact.innerHTML = '<i data-lucide="loader" class="spin"></i> Sending Message...';
            if (window.lucide) lucide.createIcons();

            try {
                const res = await fetch('api/submit_contact.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message })
                });
                const data = await res.json();

                if (data.success) {
                    showToast(data.message || 'Message sent! Our supervisors will reach out shortly.', 'success');
                    document.getElementById('contact-name').value = '';
                    document.getElementById('contact-email').value = '';
                    document.getElementById('contact-message').value = '';
                } else {
                    showToast(data.message || 'Failed to send message.', 'error');
                }
            } catch (err) {
                console.error('Contact submission error:', err);
                showToast('Network error while sending message.', 'error');
            } finally {
                btnSubmitContact.disabled = false;
                btnSubmitContact.innerHTML = '<i data-lucide="send" style="width:16px;height:16px"></i> Send Message';
                if (window.lucide) lucide.createIcons();
            }
        });
    }

    // ── 16. Toast Notification Utility ──
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast-card toast-${type}`;
        
        let iconName = 'info';
        if (type === 'success') iconName = 'check-circle';
        if (type === 'error') iconName = 'alert-triangle';
        if (type === 'warning') iconName = 'alert-circle';

        toast.innerHTML = `
            <div class="toast-icon"><i data-lucide="${iconName}" style="width:18px;height:18px"></i></div>
            <div class="toast-msg">${message}</div>
        `;

        container.appendChild(toast);
        if (window.lucide) lucide.createIcons();

        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after 4.5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4500);
    }
});
