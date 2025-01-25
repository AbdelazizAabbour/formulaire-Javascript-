const particlesContainer = document.querySelector('.particles');

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.animationDuration = `${1 + Math.random()}s`;
    particlesContainer.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 2000); 
}

document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 5; i++) {
        const offsetX = (Math.random() - 0.5) * 50;
        const offsetY = (Math.random() - 0.5) * 50;
        createParticle(e.pageX + offsetX, e.pageY + offsetY);
    }
});


const canvas = document.createElement('canvas');
canvas.classList.add('particle-canvas');
document.querySelector('.particles').appendChild(canvas);
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 100;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = Math.random() * 2 - 1;
        const speedY = Math.random() * 2 - 1;
        particles.push(new Particle(x, y, size, speedX, speedY));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.05)';
        input.parentElement.style.transition = 'transform 0.3s ease';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});