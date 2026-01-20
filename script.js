// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe portfolio items
document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Observe team members
document.querySelectorAll('.team-member').forEach((member, index) => {
    member.style.opacity = '0';
    member.style.transform = 'translateY(30px)';
    member.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(member);
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Xabaringiz yuborildi! Tez orada siz bilan bog\'lanamiz.');
        contactForm.reset();
    });
}

// Counter animation for stats
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = element.textContent;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Observe stat numbers
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateCounter(statNumber);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Portfolio Modal Functionality
const portfolioData = {
    1: {
        title: 'E-Commerce Platform',
        category: 'E-Commerce',
        icon: '<i class="fas fa-shopping-cart"></i>',
        description: 'Zamonaviy va to\'liq funksional onlayn savdo platformasi. Foydalanuvchilar uchun qulay interfeys, tez ishlash va xavfsiz to\'lov tizimlari bilan jihozlangan.',
        date: 'Dekabr 2025',
        client: 'ShopUz',
        technology: 'React, Node.js, MongoDB, Stripe',
        features: [
            'Responsive va zamonaviy dizayn',
            'Real-time buyurtmalarni kuzatish',
            'Xavfsiz to\'lov integratsiyasi',
            'Admin panel va analytics',
            'Multi-vendor qo\'llab-quvvatlash',
            'Mobile ilovalar bilan integratsiya'
        ],
        gradient: 'linear-gradient(135deg, #0052cc 0%, #0066ff 100%)'
    },
    2: {
        title: 'Banking Mobile App',
        category: 'Mobile Banking',
        icon: '<i class="fas fa-mobile-alt"></i>',
        description: 'Innovatsion mobil banking ilovasi. Barcha bank operatsiyalarini smartfondan amalga oshirish imkoniyati. Yuqori darajadagi xavfsizlik va qulay interfeys.',
        date: 'Noyabr 2025',
        client: 'National Bank',
        technology: 'React Native, Firebase, Biometric Auth',
        features: [
            'Biometric autentifikatsiya',
            'Kartalarni boshqarish',
            'P2P o\'tkazmalar',
            'QR kod to\'lovlari',
            'Moliyaviy statistika',
            'Push bildirishnomalar'
        ],
        gradient: 'linear-gradient(135deg, #0066ff 0%, #00aaff 100%)'
    },
    3: {
        title: 'Corporate Website',
        category: 'Corporate Web',
        icon: '<i class="fas fa-globe"></i>',
        description: 'Premium korporativ veb-sayt. Zamonaviy dizayn, yuqori ishlash va SEO optimizatsiya. Kompaniya brendini to\'liq aks ettiruvchi professional platforma.',
        date: 'Oktyabr 2025',
        client: 'TechCorp International',
        technology: 'Next.js, TypeScript, Tailwind CSS',
        features: [
            'SEO optimizatsiya',
            'Multi-til qo\'llab-quvvatlash',
            'CMS integratsiyasi',
            'Blog platformasi',
            'Contact forms',
            'Analytics dashboard'
        ],
        gradient: 'linear-gradient(135deg, #003d99 0%, #0052cc 100%)'
    },
    4: {
        title: 'CRM System',
        category: 'Business Solution',
        icon: '<i class="fas fa-users"></i>',
        description: 'Mijozlarni boshqarish tizimi. Sotuvlarni kuzatish, mijozlar bilan ishlash va biznes jarayonlarini avtomatlashtirish uchun kompleks yechim.',
        date: 'Sentyabr 2025',
        client: 'Sales Pro',
        technology: 'Vue.js, Laravel, MySQL, Redis',
        features: [
            'Mijozlar bazasini boshqarish',
            'Sotuvlarni kuzatish',
            'Task management',
            'Email integratsiya',
            'Hisobotlar va analytics',
            'Team collaboration tools'
        ],
        gradient: 'linear-gradient(135deg, #00aaff 0%, #0066ff 100%)'
    },
    5: {
        title: 'Smart City Dashboard',
        category: 'IoT & Analytics',
        icon: '<i class="fas fa-city"></i>',
        description: 'Aqlli shahar boshqaruv paneli. Real-time monitoring, ma\'lumotlar tahlili va shahar infratuzilmasini boshqarish uchun zamonaviy platforma.',
        date: 'Avgust 2025',
        client: 'City Government',
        technology: 'Angular, Python, PostgreSQL, IoT',
        features: [
            'Real-time monitoring',
            'IoT sensors integratsiya',
            'Traffic management',
            'Energy consumption tracking',
            'Environmental monitoring',
            'Emergency response system'
        ],
        gradient: 'linear-gradient(135deg, #0052cc 0%, #003d99 100%)'
    },
    6: {
        title: 'Education Platform',
        category: 'E-Learning',
        icon: '<i class="fas fa-graduation-cap"></i>',
        description: 'Online ta\'lim platformasi. Video darslar, testlar, sertifikatlar va o\'quvchilar progrssini kuzatish imkoniyatlari bilan jihozlangan zamonaviy LMS.',
        date: 'Iyul 2025',
        client: 'EduTech',
        technology: 'React, Django, WebRTC, AWS',
        features: [
            'Video streaming',
            'Interactive tests va quizlar',
            'Progress tracking',
            'Sertifikatlar tizimi',
            'Live webinarlar',
            'Student-teacher messaging'
        ],
        gradient: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)'
    }
};

const modal = document.getElementById('portfolioModal');
const modalImage = modal.querySelector('.modal-image');
const modalCategory = modal.querySelector('.modal-category');
const modalTitle = modal.querySelector('.modal-title');
const modalDescription = modal.querySelector('.modal-description');
const featuresList = modal.querySelector('.features-list');
const detailItems = modal.querySelectorAll('.detail-value');

// Open modal when clicking portfolio item
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        const portfolioId = this.getAttribute('data-portfolio');
        const data = portfolioData[portfolioId];
        
        if (data) {
            // Set modal content
            modalImage.innerHTML = data.icon;
            modalImage.style.background = data.gradient;
            modalCategory.innerHTML = data.icon + ' ' + data.category;
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            
            // Set details
            detailItems[0].textContent = data.date;
            detailItems[1].textContent = data.client;
            detailItems[2].textContent = data.technology;
            
            // Set features
            featuresList.innerHTML = '';
            data.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Parallax effect for hero shapes
window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;
        shape.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

console.log('NextGen Portfolio Website initialized successfully!');