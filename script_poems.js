var prevScrollpos = window.pageYOffset;

    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      var author = document.getElementById("author");
      if (prevScrollpos > currentScrollPos) {
        author.style.bottom = "20px";
      } else {
        author.style.bottom = "10px";
      }
      prevScrollpos = currentScrollPos;
    }

    //mouse following image
    document.addEventListener('DOMContentLoaded', function () {
  const image = document.getElementById('funny-image');

  // Update image position on mousemove event
  document.addEventListener('mousemove', function (e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Account for scroll offset
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    // Set image position to the adjusted mouse coordinates
    image.style.left = mouseX + scrollX + 'px';
    image.style.top = mouseY + scrollY + 'px';
  });
});