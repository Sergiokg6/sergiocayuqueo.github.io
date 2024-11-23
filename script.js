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

//wisdom section
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('phrase-visible');
                }, index * 100); // Staggered animations
            }
        });
    }, observerOptions);

    document.querySelectorAll('.wisdom-phrase').forEach(phrase => {
        observer.observe(phrase);
    });

    // Dynamic Shuffle
    // const shuffleButton = document.getElementById("shuffle-btn");
    // const wisdomGrid = document.getElementById("wisdom-grid");

    // const additionalPhrases = [
    //     { icon: "fas fa-rocket", text: "The only way to do great work is to love what you do. - Steve Jobs" },
    //     { icon: "fas fa-tree", text: "Do what you can, with what you have, where you are. - Theodore Roosevelt" },
    //     { icon: "fas fa-star", text: "Shoot for the moon. Even if you miss, you'll land among the stars. - Les Brown" }
        
    // ];

    // shuffleButton.addEventListener("click", () => {
    //     wisdomGrid.innerHTML = ""; // Clear existing phrases

    //     // Shuffle and display new phrases
    //     additionalPhrases.sort(() => 0.5 - Math.random()).forEach(phrase => {
    //         const phraseDiv = document.createElement("div");
    //         phraseDiv.classList.add("wisdom-phrase");
    //         phraseDiv.innerHTML = `<i class="${phrase.icon}"></i><p>"${phrase.text}"</p>`;
    //         wisdomGrid.appendChild(phraseDiv);

    //         observer.observe(phraseDiv); // Attach observer to new phrases
    //     });
    // });

});

//end wisdom section


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




// Timeline Scroll Animation
const timelineItems = document.querySelectorAll('.timeline-item');

const observerOptions = {
    threshold: 0.25,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

timelineItems.forEach(item => observer.observe(item));



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

// Toggle navbar and burger menu animation
burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Close the navbar when a link is clicked
links.forEach(link => {
    link.addEventListener("click", () => {
        burgerMenu.classList.remove("active"); // Reset the burger animation
        navLinks.classList.remove("active");  // Hide the navigation menu
    });
});

burgerMenu.addEventListener("click", () => {
    const expanded = burgerMenu.classList.contains("active");
    burgerMenu.setAttribute("aria-expanded", !expanded);
});





(() => {
    // Text scramble effect
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // Initialize text scramble effect on hero text
    const phrases = [
        'Developer',
        'Craftsman',
        'Code Artist',
        'Problem Solver',
        'Polymath',
        'Sergio I'
    ];

    const heroText = document.querySelector('.glitch-text');
    if (heroText) {
        const fx = new TextScramble(heroText);
        let counter = 0;
        
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 3000);
            });
            counter = (counter + 1) % phrases.length;
        };
        
        next();
    }

    // Smooth page transitions
    const pageTransition = () => {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);

        overlay.addEventListener('animationend', () => {
            overlay.remove();
        });
    };

    document.querySelectorAll('a:not([target="_blank"])').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.hostname === window.location.hostname) {
                e.preventDefault();
                const href = link.getAttribute('href');
                pageTransition();
                setTimeout(() => {
                    window.location = href;
                }, 500);
            }
        });
    });
})();


const endpoint = 'https://script.google.com/macros/s/AKfycbwqK15Y6Y6F0QbJCVMzKidMer5qIP0KScSChj6WRclTkoxutIy-2hc4ktp78qS6XbzuHg/exec'; // Replace with your web app URL
async function subscribeToNewsletter(email) {
    const successMessage = document.getElementById('success');

    // Show success
    successMessage.style.display = 'inline';

    //API call with fetch request
    //No need for handling
    const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ email }),
    });
}

// Handle form submission
document.getElementById('newsletter-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    const email = document.getElementById('emailInput').value.trim();
    if (email) {
      subscribeToNewsletter(email);
    } else {
      alert('Please enter a valid email address!');
    }
});


// Get the audio element
const audio = document.getElementById('myAudio');
// Function to play the audio
function playAudio() {
    audio.play();
}
// Function to pause the audio
function pauseAudio() {
    audio.pause();
}


//Update footer bottom date automatically
document.querySelector('footer p').innerHTML = `&copy; ${new Date().getFullYear()} - Sergio I Cayuqueo V. Under <a href="https://github.com/sergiocayuqueo/sergiocayuqueo.github.io/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>.`;



// Back to top functionality
const backToTopButton = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (backToTopButton) {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    }
});
  
backToTopButton?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
});