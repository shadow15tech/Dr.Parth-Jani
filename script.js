/* ==================== PREMIUM NAVBAR LOGIC ==================== */

// 1. Glassmorphism Scroll Effect
const header = document.getElementById('header');

const scrollHeader = () => {
    // Add shadow and blur when scrolled past 50px
    if (window.scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', scrollHeader);

// 2. Mobile Menu Toggle System
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Open Menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Close Menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// 3. Auto-Close Menu on Link Click (Mobile UX)
const navLinks = document.querySelectorAll('.nav-link');

const linkAction = () => {
    navMenu.classList.remove('show-menu');
};

navLinks.forEach(link => link.addEventListener('click', linkAction));


/* ==================== GSAP-LIKE SCROLL REVEAL (VANILLA JS) ==================== */
// Select all elements that have the '.reveal' class
const revealElements = document.querySelectorAll('.reveal');

// Callback function executed when observed elements intersect with the viewport
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        // If the element is currently visible on screen
        if (entry.isIntersecting) {
            // Add 'active' class to trigger the CSS transition (opacity 1, transform 0)
            entry.target.classList.add('active');
            
            // Unobserve the element after revealing it once to save browser performance
            observer.unobserve(entry.target);
        }
    });
};

// Configuration options for the Intersection Observer
const revealOptions = {
    threshold: 0.15, // Triggers when 15% of the element's height is visible
    rootMargin: "0px 0px -50px 0px" // Triggers slightly before the element enters the bottom of the screen
};

// Create a new observer instance with the callback and options
const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

// Attach the observer to each '.reveal' element on the page
revealElements.forEach(el => {
    revealObserver.observe(el);
});


/* ==================== 3D IMAGE TILT EFFECT (DESKTOP) ==================== */
const heroImgBox = document.querySelector('.hero-img-box');
const heroSection = document.querySelector('.hero');

if (heroImgBox && heroSection) {
    // Only apply tracking if not on a mobile device (avoids jitter on touch screens)
    if (window.matchMedia("(min-width: 769px)").matches) {
        
        heroSection.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to the center of the window
            let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            // Apply 3D rotation
            heroImgBox.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Snap back to original position when mouse leaves the section
        heroSection.addEventListener('mouseleave', () => {
            heroImgBox.style.transform = `rotateY(0deg) rotateX(0deg)`;
            heroImgBox.style.transition = `transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)`;
        });

        // Remove transition during movement for snappy tracking
        heroSection.addEventListener('mouseenter', () => {
            heroImgBox.style.transition = `transform 0.1s ease-out`;
        });
    }
}


/* ==================== STATS COUNTER ANIMATION (VANILLA JS) ==================== */
// This triggers the numbers to count up from 0 only when the user scrolls to them
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const counterObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Lower inc to slow and higher to speed up
                const inc = target / speed;

                // Check if target is reached
                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCount();
            observer.unobserve(counter); // Only animate once
        }
    });
};

const counterObserver = new IntersectionObserver(counterObserverCallback, {
    threshold: 0.5 // Trigger when 50% of the number is visible
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});



/* ==================== TECH GALLERY ACCORDION ==================== */
const techCards = document.querySelectorAll('.tech-card');

techCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Remove active class from all
        techCards.forEach(c => c.classList.remove('active'));
        // Add to currently hovered
        card.classList.add('active');
    });
});