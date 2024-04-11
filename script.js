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

