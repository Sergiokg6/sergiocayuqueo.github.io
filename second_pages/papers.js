// Define data for the chart (you can replace it with your actual data)
var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [{
        label: "Number of Papers",
        data: [0, 0, 0, 3, 0, 0, 0,0], // Sample data
        backgroundColor: 'rgba(54, 162, 235, 0.4)', // Background color for the line
        borderColor: 'rgba(0, 0, 0, 1)', // Border color for the line
        borderWidth: 1
    }]
};

// Create a new Chart instance
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        weight: 'bold' // Increase font weight for y-axis labels
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        weight: 'bold' // Increase font weight for x-axis labels
                    }
                }
            }
        },
        elements: {
            line: {
                borderWidth: 2, // Increase line thickness
            },
            point: {
                radius: 5, // Increase point size
                borderWidth: 2, // Increase point border width
            }
        }
    }
});


// Smooth scrolling navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Floating action button (Back to Top button)
const backToTopButton = document.getElementById('back-to-top-btn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//social media sharing
// Function to share on Twitter
function shareOnTwitter() {
    window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href) + '&text=' + encodeURIComponent('Check out this interesting paper!'));
}

// Function to share on Facebook
function shareOnFacebook() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href));
}

// Function to share on LinkedIn
function shareOnLinkedIn() {
    window.open('https://www.linkedin.com/shareArticle?url=' + encodeURIComponent(window.location.href) + '&title=' + encodeURIComponent('Check out this interesting paper!'));
}


// Function to display an error message
function showError(message) {
    var errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block"; // Show the error message
}

// Example usage:
// Call showError() with an error message when needed, e.g., when a form submission fails or a link is broken
// showError("Sorry, the page you're looking for could not be found.");
