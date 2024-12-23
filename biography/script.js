document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const navToggle = document.querySelector('.nav-toggle');
    const heroSection = document.querySelector('.hero-section');
      const bioText = document.querySelector('.bio-text'); // Add this
    
    // Function to handle navbar transparency
      const handleNavbarTransparency = () => {
          navbar.classList.toggle('scrolled', window.scrollY > 0);
      };
  
      // Initial navbar transparency setup
      handleNavbarTransparency();
      window.addEventListener('scroll', handleNavbarTransparency);
  
    // Smooth scroll function
    const smoothScrollTo = (target) => {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });
    };
  
    // Activate link based on scroll position and click
    const activateLink = (currentId) => {
      navLinks.forEach((link) => {
        link.classList.toggle(
          'active',
          link.getAttribute('href').substring(1) === currentId
        );
      });
    };
  
      navLinks.forEach((anchor) => {
          anchor.addEventListener('click', (e) => {
            const targetUrl = anchor.href;  // Get the full URL from the href attribute
        
            // Check if the link is an internal link (starts with '#')
            if (targetUrl.startsWith('#')) {
              e.preventDefault();  // Prevent default behavior for internal links
              const targetId = targetUrl.substring(1); // Extract the target ID
              const targetElement = document.querySelector(targetId);
        
              if (targetElement) {
                smoothScrollTo(targetElement);
                activateLink(targetId);
              }
            // If it's an external link, let the browser handle it normally
            } else {
              // You can optionally add functionalities for external links here,
              // like opening them in a new tab or tracking clicks for analytics.
            }
        
            // Close the mobile menu after selecting a link, if applicable
            if (navbar.classList.contains('mobile-nav-open')) {
              navbar.classList.remove('mobile-nav-open');
            }
          });
        });
  
  
    //  Intersection Observer for active link highlight on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activateLink(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );
  
    sections.forEach((section) => {
      observer.observe(section);
    });
  
    // Mobile menu toggle logic
    navToggle.addEventListener('click', () => {
      navbar.classList.toggle('mobile-nav-open');
    });
  
      // Hero Background Rotator
      const images = [
        '../images_blog/adoniasgold.jpg',
        '../images_blog/sergio-national-palace.jpg',
        '../images_blog/sheep.jpg',
        '../images_blog/sergio-playa.jpg',
        '../images_blog/math-board.jpg',
        '../images_blog/sergio-tongoy-1.png',


    ];
      let currentImageIndex = 0;
  
      function changeBackgroundImage() {
           heroSection.style.backgroundImage = `url('${images[currentImageIndex]}')`;
              currentImageIndex = (currentImageIndex + 1) % images.length;
          }
          changeBackgroundImage();
          setInterval(changeBackgroundImage, 4000);
      
       //   Bio Text Reveal Animation
         bioText.style.maxHeight = '0';
         bioText.style.opacity = '0';
         bioText.style.overflow = 'hidden';
        
          setTimeout(() => {
                bioText.style.transition = 'max-height 0.8s ease-in-out, opacity 0.8s ease-in-out';
                bioText.style.maxHeight = bioText.scrollHeight + 'px';
               bioText.style.opacity = 1;
          }, 1000)
  });