// Initialize canvas and context
const canvas = document.getElementById('particle-sys');
const ctx = canvas.getContext('2d');
// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define particle class
class Particle {
    constructor(x, y, dirx, diry, radius, color) {
        this.x = x;
        this.y = y;
        this.dirx = dirx;
        this.diry = diry;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dirx = -this.dirx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.diry = -this.diry;
        }

        this.x += this.dirx;
        this.y += this.diry;

        this.draw();
    }
}

// Initialize particle array
let particles = [];

// Generate particles
function init() {
    for (let i = 0; i < 75; i++) {
        let radius = Math.random() + 1.5;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let dirx = (Math.random() - 0.5) * 3.5;
        let diry = (Math.random() - 0.5) * 3.5;
        let color = '#00e7e0';

        particles.push(new Particle(x, y, dirx, diry, radius, color));
    }
}

// Animate particles
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particles => {
        particles.update();
    });

    connect();
}

// If particles are close than connect
function connect() {
    let opacityVal = 1;
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dist = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
                + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
            if (dist < (canvas.width / 7) * (canvas.height / 7)) {
                opacityVal = 1 - (dist/20000);
                ctx.strokeStyle = 'rgb(0, 231, 224,'+opacityVal+')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

init();
animate();
