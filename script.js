// Razorpay Payment Integration
$(".morphing-button").on("click", function () {
    const courseElement = $(this).closest(".course");
    const courseName = courseElement.data("course");
    const coursePrice = courseElement.data("price") * 100; // Convert to paise

    const options = {
        key: "rzp_live_3H2FxWyjfXg8dK",
        amount: coursePrice,
        currency: "INR",
        name: "Soulfull Trader",
        description: courseName,
        image: "path/to/your/logo.png", // Update with the correct image path
        handler: function (response) {
            // Redirect based on the course purchased
            const redirectUrls = {
                "Stock Market Basics": "https://t.me/+lg45q5G62-41ZTJl",
                "Option Selling": "https://t.me/+ahS4FLGKBIo3Yjk1",
                "Mentorship Program": "https://t.me/+H5htwemrKc0wZGE1"
            };

            const redirectUrl = redirectUrls[courseName] || "/payerro.html";
            window.location.href = redirectUrl;
        },
        prefill: {
            name: "",
            email: "",
            contact: "",
        },
        notes: {
            address: "Soulfull Trader HQ",
        },
        theme: {
            color: "#3399cc",
        },
    };

    const rzp = new Razorpay(options);
    rzp.open();
});

// Scroll-based animations
document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const viewportHeight = window.innerHeight;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < viewportHeight && rect.bottom > 0) {
            section.classList.add('in-view');
        } else {
            section.classList.remove('in-view');
        }
    });
});

// Content Reveal Animations
document.addEventListener('scroll', function() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight) {
            reveal.classList.add('visible');
        } else {
            reveal.classList.remove('visible');
        }
    });
});

// Polygon Background Animation
const canvas = document.getElementById('polygon-background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Polygon {
    constructor(x, y, size, dx, dy) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size, this.y + this.size);
        ctx.lineTo(this.x - this.size, this.y + this.size);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.stroke();
    }

    update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

const polygons = Array.from({ length: 100 }, () => {
    const size = Math.random() * 20 + 10;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;
    return new Polygon(x, y, size, dx, dy);
});

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    polygons.forEach(polygon => polygon.update());
}

animate();

// FAQ Toggle and Search Functionality
document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const searchInput = document.getElementById('faq-search');

    // Toggle FAQ answers on click
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Search FAQ items
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            item.style.display = question.includes(searchTerm) ? 'block' : 'none';
        });
    });
});
