// Enhanced Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    
    // Add slight delay to outline for smooth effect
    setTimeout(() => {
        cursorOutline.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    }, 100);
});

// Hover effect on interactive elements
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
    });
});

// Enhanced Scroll Progress
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / height) * 100;
    
    scrollProgress.style.width = scrolled + '%';
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//             // Complete the smooth scrolling function
//             document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

// Poem rotation animation
const poems = document.querySelectorAll('.poem-card');
let currentPoem = 0;

function rotatePoems() {
    poems.forEach((poem, index) => {
        poem.classList.remove('active');
        if (index === currentPoem) {
            poem.classList.add('active');
        }
    });
    currentPoem = (currentPoem + 1) % poems.length;
}

// Start rotation
setInterval(rotatePoems, 6000);

// // Optional: Pause on hover
// const poemContainer = document.querySelector('.poems-container');
// poemContainer.addEventListener('mouseover', () => clearInterval(interval));
// poemContainer.addEventListener('mouseout', () => interval = setInterval(rotatePoems, 6000));


// Phrases fade-in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('phrase-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.wisdom-phrase').forEach(phrase => {
    observer.observe(phrase);
});

// Theme Switcher
const themes = {
    default: {
        primary: '#ffd700',
        secondary: '#1a1a1a',
        bg: '#0a0a0a'
    },
    cyber: {
        primary: '#00ff9d',
        secondary: '#1a1a2e',
        bg: '#0a0a1a'
    },
    neon: {
        primary: '#ff00ff',
        secondary: '#2a1a2a',
        bg: '#1a0a1a'
    }
};

document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = themes[btn.dataset.theme];
        Object.entries(theme).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });
    });
});

// // Skill Progress Animation
// const observerSkills = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const progress = entry.target.querySelector('.progress');
//             const percent = entry.target.querySelector('.skill-percentage').textContent;
//             const value = parseInt(percent);
//             progress.style.strokeDashoffset = 440 - (440 * value / 100);
//         }
//     });
// }, { threshold: 0.5 });

// document.querySelectorAll('.skill-card').forEach(card => {
//     observerSkills.observe(card);
// });

// 1. Project Filter System
const projectFilters = `
<div class="filter-container">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="web">Web</button>
    <button class="filter-btn" data-filter="mobile">Mobile</button>
    <button class="filter-btn" data-filter="design">Design</button>
</div>
`;

document.querySelector('.projects').insertAdjacentHTML('afterbegin', projectFilters);

// Add data-category attributes to your project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.setAttribute('data-category', ['web', 'mobile', 'design'][Math.floor(Math.random() * 3)]);
});

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        document.querySelectorAll('.project-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 0);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 500);
            }
        });
    });
});

// 2. Dynamic Skill Progress Animation
// function initSkillAnimation() {
//     const skills = [
//         { name: 'Web Development', percent: 90 },
//         { name: 'UI/UX Design', percent: 85 },
//         { name: 'Mobile Development', percent: 80 },
//         { name: 'Cloud Architecture', percent: 75 }
//     ];

//     const skillContainer = document.querySelector('.skill-container');
//     skillContainer.innerHTML = skills.map(skill => `
//         <div class="skill-card" data-aos="fade-up">
//             <div class="skill-progress">
//                 <svg class="skill-circle" width="100" height="100" viewBox="0 0 150 150">
//                     <circle cx="75" cy="75" r="70"/>
//                     <circle class="progress" cx="75" cy="75" r="70"/>
//                 </svg>
//                 <div class="skill-percentage">${skill.percent}%</div>
//             </div>
//             <h3>${skill.name}</h3>
//             <p>Expert Level Proficiency</p>
//         </div>
//     `).join('');
// }

// initSkillAnimation();


// 3. Interactive Timeline
const timelineSection = `
<section class="timeline" id="timeline">
    <h2 class="section-title">Journey</h2>
    <div class="timeline-container">
        <div class="timeline-item" data-year="2024">
            <div class="timeline-content">
                <h3>19 Jr. Developer</h3>
                <p>Being an assitant professor and entrepreneur</p>
            </div>
        </div>
        <div class="timeline-item" data-year="2022">
            <div class="timeline-content">
                <h3>18 A simple student</h3>
                <p>Architecting scalable solutions in mind</p>
            </div>
        </div>
        <div class="timeline-item" data-year="2020">
            <div class="timeline-content">
                <h3>17 Writing and Reading</h3>
                <p>From AI to Human Biology</p>
            </div>
        </div>
    </div>
</section>
`;

document.querySelector('.poems').insertAdjacentHTML('afterend', timelineSection);


// // 4. Live Project Stats Counter
// function initProjectStats() {
//     const stats = [
//         { label: 'Projects Completed', value: 150 },
//         { label: 'Happy Clients', value: 80 },
//         { label: 'Awards Won', value: 25 },
//         { label: 'Years Experience', value: 8 }
//     ];

//     const statsSection = `
//     <section class="stats" id="stats">
//         <div class="stats-container">
//             ${stats.map(stat => `
//                 <div class="stat-item">
//                     <h3 class="stat-value" data-target="${stat.value}">0</h3>
//                     <p>${stat.label}</p>
//                 </div>
//             `).join('')}
//         </div>
//     </section>
//     `;

//     document.querySelector('.projects').insertAdjacentHTML('afterend', statsSection);
// }

// initProjectStats();

// // Animate stats when in view
// function animateStats() {
//     const stats = document.querySelectorAll('.stat-value');
//     stats.forEach(stat => {
//         const target = parseInt(stat.dataset.target);
//         const increment = target / 50;
//         let current = 0;
    
//         const updateCount = () => {
//             if (current < target) {
//                 current += increment;
//                 stat.textContent = Math.ceil(current);
//                 setTimeout(updateCount, 40);
//             } else {
//                 stat.textContent = target;
//             }
//         };
    
//         updateCount();
//     });
// }

// 5. Theme Persistence
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
    const theme = themes[savedTheme];
    Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
    });
}

document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const themeKey = btn.dataset.theme;
        localStorage.setItem('portfolio-theme', themeKey);
    });
});

// 6. Remove loader properly
// window.addEventListener('load', () => {
//     const loader = document.querySelector('.loader');
//     loader.classList.add('hidden');
//     setTimeout(() => loader.style.display = 'none', 500);

//     // Initialize stat counters after load
//     setTimeout(animateStats, 1000);
// });


// const hero = document.querySelector('.hero');

// hero.addEventListener('mousemove', (e) => {
//     const { offsetX, offsetY, clientWidth, clientHeight } = e;
//     const x = (offsetX / clientWidth) * 100;
//     const y = (offsetY / clientHeight) * 100;

//     hero.style.setProperty('--mouse-x', `${x}%`);
//     hero.style.setProperty('--mouse-y', `${y}%`);
// });

// // Update CSS with mouse-tracking effect
// const root = document.documentElement;
// hero.addEventListener('mousemove', (e) => {
//     const x = (e.clientX / window.innerWidth) * 100;
//     const y = (e.clientY / window.innerHeight) * 100;
//     root.style.setProperty('--mouse-x', `${x}%`);
//     root.style.setProperty('--mouse-y', `${y}%`);
// });

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Get elements
const burgerMenu = document.getElementById("burger-menu");
const navLinks = document.getElementById("nav-links");
const links = document.querySelectorAll(".nav-links a");

// Toggle navbar visibility on burger menu click
burgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close the navbar when a link is clicked
links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

