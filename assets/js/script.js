// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// ── Scroll-reveal via IntersectionObserver ──────────────────────────────────

function initScrollReveal() {
    const threshold = 0.12;

    // 1. Generic .reveal elements
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObs.observe(el));

    // 2. Section headers
    const headerObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                headerObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.section-header').forEach(el => headerObs.observe(el));

    // 3. Project & dashboard cards — stagger within the grid
    const cardObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                entry.target.style.transitionDelay = (idx * 0.08) + 's';
                entry.target.classList.add('visible');
                cardObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .dashboard-card').forEach(el => cardObs.observe(el));

    // 4. Skill chips per group
    const chipObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('chips-visible');
                chipObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.skill-chips').forEach(el => chipObs.observe(el));

    // 5. GitHub strip
    const ghObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                ghObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.github-strip-inner').forEach(el => ghObs.observe(el));

    // 6. Contact social icons
    const socialObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                socialObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.social-link-item').forEach(el => socialObs.observe(el));

    // 7. Stat values — colour pulse when dashboard cards enter view
    const statObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-value').forEach(el => {
                    el.classList.add('counting');
                    el.addEventListener('animationend', () => el.classList.remove('counting'), { once: true });
                });
                statObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.dashboard-card').forEach(el => statObs.observe(el));

    // 8. Timeline items (about.html)
    const timelineObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                timelineObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-item').forEach(el => timelineObs.observe(el));

    // 9. Approach cards — "Beyond the Code" section
    const approachObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                approachObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('.approach-card').forEach(el => approachObs.observe(el));
}

window.addEventListener('DOMContentLoaded', initScrollReveal);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;

        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (document.querySelector(targetId)) {
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = '#' + section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSectionId ||
            (currentSectionId === '#home' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Cache-bust the GitHub graph
document.getElementById('gh-graph').src = 
    'https://ghchart.rshah.org/2da44e/Mubashirr101?t=' + Date.now();


window.addEventListener('scroll', setActiveNavLink);

// Dashboard Modal Script
function openModal(id) {
            document.getElementById(id).classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeModal(id) {
            document.getElementById(id).classList.remove('active');
            document.body.style.overflow = '';
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.db-modal.active')
                    .forEach(m => { m.classList.remove('active'); });
                document.body.style.overflow = '';
            }
        });