// ============================================
// Prompt Collection Site - JavaScript
// ============================================

// ============================================
// DOM Elements
// ============================================

const copyButtons = document.querySelectorAll('.copy-btn');
const toast = document.getElementById('toast');
const searchInput = document.getElementById('searchInput');
const navLinks = document.querySelectorAll('.nav-link');
const promptCards = document.querySelectorAll('.prompt-card');

// ============================================
// Copy to Clipboard Functionality
// ============================================

copyButtons.forEach(button => {
    button.addEventListener('click', async function() {
        const promptText = this.getAttribute('data-prompt');
        
        try {
            // Copy to clipboard
            await navigator.clipboard.writeText(promptText);
            
            // Show success toast
            showToast('✓ Prompt copied to clipboard!', 'success');
            
            // Add animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
        } catch (err) {
            showToast('✗ Failed to copy prompt', 'error');
            console.error('Failed to copy:', err);
        }
    });
});

// ============================================
// Toast Notification System
// ============================================

function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// Search Functionality
// ============================================

searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    promptCards.forEach(card => {
        const title = card.querySelector('.card-header h3').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
        
        const searchContent = `${title} ${description} ${tags}`;
        
        if (searchContent.includes(searchTerm)) {
            card.style.display = 'flex';
            // Add fade-in animation
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show message if no results
    const visibleCards = Array.from(promptCards).filter(card => card.style.display !== 'none');
    if (visibleCards.length === 0 && searchTerm.length > 0) {
        showToast('No prompts found matching your search', 'info');
    }
});

// ============================================
// Navigation Active State
// ============================================

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
    });
});

// ============================================
// Smooth Scroll for Navigation
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Animations
// ============================================

// Fade-in animation for cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all prompt cards
promptCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe category cards
document.querySelectorAll('.category-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animation = 'fadeInUp 0.6s ease forwards';
    card.style.animationDelay = `${index * 0.1}s`;
});

// ============================================
// CSS Animations (via JavaScript)
// ============================================

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Active Navigation Link on Scroll
// ============================================

window.addEventListener('scroll', function() {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Keyboard Shortcuts
// ============================================

document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
    }
});

// ============================================
// Page Load Animation
// ============================================

window.addEventListener('load', function() {
    // Fade in header
    const header = document.querySelector('.header');
    if (header) {
        header.style.animation = 'fadeIn 0.8s ease';
    }
    
    // Fade in navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.animation = 'fadeIn 0.8s ease 0.2s forwards';
        navbar.style.opacity = '0';
    }
    
    // Fade in hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.animation = 'fadeIn 0.8s ease 0.4s forwards';
        hero.style.opacity = '0';
    }
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// Performance Monitoring
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}

// ============================================
// Console Message
// ============================================

console.log('%c🎨 Prompt Collection Site', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%cNeo-Minimalism Design System', 'font-size: 14px; color: #7b2cbf;');
console.log('%cDark Mode with Neon Gradient (Blue-Purple)', 'font-size: 12px; color: #a0a0a0;');
