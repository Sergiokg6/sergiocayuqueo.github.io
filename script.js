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
