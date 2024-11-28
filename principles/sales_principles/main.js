document.addEventListener('DOMContentLoaded', function() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    lastUpdatedElement.textContent = currentDate;

    const essayContent = document.querySelector('.essay-content');
    
    // Trigger visibility with slight delay for smooth animation
    setTimeout(() => {
        essayContent.classList.add('visible');
    }, 300);

    function saveEssayContent() {
        localStorage.setItem('personalEssay', essayContent.innerHTML);
    }

    function loadEssayContent() {
        const savedContent = localStorage.getItem('personalEssay');
        if (savedContent) {
            essayContent.innerHTML = savedContent;
        }
    }

    loadEssayContent();
    setInterval(saveEssayContent, 30000);

    essayContent.addEventListener('input', function() {
        const currentVersion = parseFloat(document.getElementById('essayVersion').textContent);
        document.getElementById('essayVersion').textContent = (currentVersion + 0.1).toFixed(1);
    });

    // Interactive highlight effects
    document.querySelectorAll('.highlight').forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });



    // Array of curated sales and entrepreneurship resources
    const resourceLinks = [
        {
            title: "Five Ways to Build a $100 Million Business",
            url: "https://christophjanz.blogspot.com/2014/10/five-ways-to-build-100-million-business.html",
            description: "Classic blog post about scaling a business"
        },  
        {
            title: "The Sales Acceleration Formula",
            url: "https://www.amazon.com/Sales-Acceleration-Formula-Technology-Inbound/dp/1119047072",
            description: "Book by Mark Roberge about sales strategy"
        },
        {
            title: "How to Win Friends & Influence People",
            url: "https://www.amazon.com/How-Win-Friends-Influence-People/dp/0671027034",
            description: "Timeless book on interpersonal skills and sales"
        },
        {
            title: "Zero to One by Peter Thiel",
            url: "https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296",
            description: "Groundbreaking book on startup innovation"
        },
        {
            title: "The Lean Startup",
            url: "https://www.amazon.com/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898",
            description: "Revolutionary approach to building successful startups"
        },
        {
            title: "HubSpot Sales Blog",
            url: "https://blog.hubspot.com/sales",
            description: "Free resources and strategies for sales professionals"
        },
        {
            title: "SaaS Sales Playbook",
            url: "https://www.salesfolk.com/saas-sales-playbook/",
            description: "Comprehensive guide to SaaS sales strategies"
        },
        {
            title: "Y Combinator Startup Library",
            url: "https://www.ycombinator.com/library",
            description: "Free resources for entrepreneurs and startup founders"
        },
        {
            title: "The Sales Development Playbook",
            url: "https://www.amazon.com/Sales-Development-Playbook-Building-Scalable/dp/0134553098",
            description: "Strategic guide to building a sales development team"
        },
        {
            title: "Predictable Revenue",
            url: "https://www.amazon.com/Predictable-Revenue-Business-Practices-Salesforce-com/dp/0984380213",
            description: "Innovative approaches to generating sales pipeline"
        }
    ];

    // Function to update resource link
    function updateResourceLink() {
        const resourceLinkContainer = document.getElementById('dynamicResourceLink');
        const randomResource = resourceLinks[Math.floor(Math.random() * resourceLinks.length)];

        resourceLinkContainer.innerHTML = `
            <p>Other Resources</p>
            <a href="${randomResource.url}" target="_blank" title="${randomResource.description}">
                ${randomResource.title}
            </a>
        `;
    }

    // Initial load
    document.addEventListener('DOMContentLoaded', updateResourceLink);

    // Update every minute
    setInterval(updateResourceLink, 6000);

});