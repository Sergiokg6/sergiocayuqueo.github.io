//from the nav go down smoothly
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

//enlarge and shrink
document.addEventListener("DOMContentLoaded", function() {
    const img = document.querySelector('.image-container img');

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const imgOffsetTop = img.offsetTop;

        if (scrollY > imgOffsetTop - windowHeight / 2) {
            img.style.transform = 'scale(1.01)';
        } else {
            img.style.transform = 'scale(1)';
        }
    });
});

//fade text while scoll down.
document.addEventListener("DOMContentLoaded", function() {
    const texts = document.querySelectorAll('.header h1, .acerca-de, #acerca-de h2');

    window.addEventListener('scroll', function() {
        texts.forEach(text => {
            const textOffsetTop = text.offsetTop;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            if (scrollY > textOffsetTop - windowHeight / 100) {
                text.classList.add('fadeInUp');
            } else if (scrollY < textOffsetTop - windowHeight / 100) {
                text.classList.remove('fadeInUp');
            }
        });
    });
});


//magnifing glass for text.
document.addEventListener("DOMContentLoaded", function() {
    const magnifyElement = document.querySelector('.magnify');

    // Function to wrap each word in a span
    function wrapWords(element) {
        const words = element.textContent.split(/\s+/);
        const newContent = words.map(word => `<span class="word-magnify">${word}&nbsp;</span>`).join('');
        element.innerHTML = newContent;
    }

    // Wrap each word in a span
    wrapWords(magnifyElement);
});

//static nav bar
window.onscroll = function() {stickyNavbar()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function stickyNavbar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

//nav new functionalities
let menuIcon = document.querySelector('.menu-icon');
let navLinks = document.querySelector('.nav-links');
let navLinksList = document.querySelectorAll('.nav-links a');
let navbar1 = document.querySelector('.navbar1'); // Added

menuIcon.addEventListener('click', function() {
  navLinks.classList.toggle('active');
  navbar1.classList.toggle('static'); // Added
});

// Hide navbar when clicking outside or on a link
document.addEventListener('click', function(event) {
  if (!navLinks.contains(event.target) && !menuIcon.contains(event.target)) {
    navLinks.classList.remove('active');
    navbar1.classList.remove('static'); // Added
  }
});

// Hide navbar1 when a link is clicked
navLinksList.forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('active');
    navbar1.classList.remove('static'); // Added
  });
});

// Added: Make the navbar that is not being deployed static while scrolling
window.addEventListener('scroll', function() {
  if (!navLinks.classList.contains('active')) {
    navbar1.classList.add('static');
  }
});

// JavaScript para aplicar el efecto a todas los links
document.addEventListener('DOMContentLoaded', function() {
  var words = document.getElementsByTagName('a'); // Obtener todas las palabras del cuerpo de la página

  for (var i = 0; i < words.length; i++) {
      words[i].addEventListener('mouseover', function() {
          this.classList.add('hover-effect'); // Agregar clase de efecto hover
      });

      words[i].addEventListener('mouseout', function() {
          this.classList.remove('hover-effect'); // Quitar clase de efecto hover
      });
  }
});

//carrousel script
const linksContainer = document.getElementById('roulette-container');
const links = linksContainer.getElementsByClassName('link');
const linkWidth = 19; // Width of each image
const translateStep = 1; // Adjust the movement speed
let translateX = 1;

function changeLink() {
  translateX -= translateStep;
  linksContainer.style.transform = `translateX(${translateX}px)`;

  // Move the first link to the end when it scrolls out of view
  if (translateX <= -linkWidth) {
    const firstLink = linksContainer.firstElementChild;
    linksContainer.appendChild(firstLink);
    translateX += linkWidth;

    // Smooth transition for the first link reappearing at the end
    setTimeout(() => {
      firstLink.style.transition = 'transform 0s'; // Disable transition for the first link
      firstLink.style.transform = `translateX(${linkWidth}px)`; // Move it to the end
      setTimeout(() => {
        firstLink.style.transition = 'transform 1s ease'; // Smooth transition for reappearing
        firstLink.style.transform = `translateX(0)`; // Move it to its original position
      }, 0);
    }, 0); // Delay to ensure transition is applied after resetting transform
  }
}

setInterval(changeLink, 60); // Adjust the interval for smoother movement

  // When the page scrolls, check if the footer is visible
window.addEventListener('scroll', function() {
  const footer = document.querySelector('footer');
  const footerPosition = footer.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (footerPosition < screenHeight) {
    footer.classList.add('visible');
  }

});

// Add staggered animation for each letter in the header
document.querySelectorAll('#header-title span').forEach((letter, index) => {
  letter.style.setProperty('--index', index);
});


// Function to add confetti that explodes from the center of the full page
function createConfetti(container) {
  const containerWidth = window.innerWidth;  // Use full viewport width
  const containerHeight = window.innerHeight; // Use full viewport height
  const numOfConfetti = Math.max(Math.floor(containerWidth / 10), 100); // Increase count for a better explosion

  // Determine the center of the viewport
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  for (let i = 0; i < numOfConfetti; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti-piece");

      // Set initial position to the center of the viewport
      confetti.style.left = `${centerX}px`;
      confetti.style.top = `${centerY}px`;
      confetti.style.backgroundColor = getRandomColor();

      // Randomize the direction for the explosion
      const dirX = Math.random() * 2 - 1; // Random direction on the x-axis (-1 to 1)
      const dirY = Math.random() * 2 - 1; // Random direction on the y-axis (-1 to 1)

      // Randomize the distance to spread across the entire viewport
      const distanceX = dirX * (Math.random() * (containerWidth / 2)); // Scale by half the width
      const distanceY = dirY * (Math.random() * (containerHeight / 2)); // Scale by half the height
      
      // Set the final position using CSS variables
      confetti.style.setProperty('--end-x', `${distanceX}px`);
      confetti.style.setProperty('--end-y', `${distanceY}px`);

      container.appendChild(confetti);

      // Remove confetti after animation ends
      setTimeout(() => {
          confetti.remove();
      }, 4000);
  }
}

function getRandomColor() {
  const colors = ["#FFD700", "#FF4500", "#1E90FF", "#32CD32", "#FF69B4"];
  return colors[Math.floor(Math.random() * colors.length)];
}

document.querySelector('.new-poem').addEventListener('mouseenter', function() {
  const container = this.nextElementSibling;
  container.style.display = "block";
  createConfetti(container);
});

document.querySelector('.new-poem').addEventListener('mouseleave', function() {
  const container = this.nextElementSibling;
  container.style.display = "none";
});


//darkmode whitemode
const toggleSwitch = document.querySelector('#theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

toggleSwitch.addEventListener('change', function () {
  if (this.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a'); // Get all links

  // Toggle the active class on burger button and nav links when burger is clicked
  menuIcon.addEventListener('click', function() {
    menuIcon.classList.toggle('active'); // Animate burger icon
    navLinks.classList.toggle('static'); // Show/hide nav links
  });

  // Close the navbar smoothly when any link is clicked (in mobile view)
  links.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active'); // Hide nav links
      menuIcon.classList.remove('active'); // Reset burger icon
    });
  });
});
