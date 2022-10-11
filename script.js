const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const span0 = document.getElementById('span0');

//Setting Canvas to FullScreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Resize the canvas size when window size is resized
window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

let mousePosition = {
    x: undefined,
    y: undefined
}

let hueRotate = 0;
//Every Single Particle is stored here
let particlesArr = [];

function Particles(){
    this.x = mousePosition.x;
    this.y = mousePosition.y;
    this.size = Math.random() * 15 +1;

    //Moving Speed of Particle by their X and Y
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;

    //Updating Particle Position by speedX and speedY
    this.update = function() {
        this.x += this.speedX; //Increase the position in X
        this.y += this.speedY; //Increase the position in Y
        if (this.size > .2) {
            this.size -= .1;
        }
    }

    //Render the Particle
    this.draw = function() {
        context.fillStyle = `hsl(${hueRotate},100%,50%)`;
        //Draw the particle
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI * 2);
        context.fill();
    }
}

//Function to render all the Particles in Particles Array
let renderParticles = ()=>{
    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].draw(); //Render the Particle
        particlesArr[i].update(); //Update Particle Position
        //Splice the particle from the array if its size is less then 3
        if (particlesArr[i].size <= 3) {
            particlesArr.splice(i,1);
            i--;
        }
    }
}

//This animate function runs in loop every second.
function animate(){
    //Fill style with .1 to show fade effect
    context.fillStyle = `rgba(0,0,0,.1)`;
    context.fillRect(0,0,canvas.width,canvas.height);
    renderParticles();
    hueRotate++;
    span0.style.color = `hsl(${hueRotate},60%,50%)`;
    span0.style.filter = `drop-shadow(0px 0px 3px hsl(${hueRotate},100%,50%))`
    requestAnimationFrame(animate);
}

animate();

canvas.addEventListener('mousemove',(e)=>{
    mousePosition.x = e.x;
    mousePosition.y = e.y;
    //You can increase the number of particles to be formed when mouse is moved by increasing the i < 'Any Number'
    for (let i = 0; i < 20; i++) {
        particlesArr.push(new Particles())
    }
})
