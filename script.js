window.addEventListener("load", function () {
    const BGM= new Audio("always.mp3");
    const B=new Audio("B.wav");
    const C=new Audio("C.wav");
    const D=new Audio("D.wav");
    const E=new Audio("E.wav");
    const F=new Audio("F.wav");
    const G=new Audio("G.wav");
    const A=new Audio("A.wav");
    BGM.volume=0.1;
    BGM.loop=true;
   
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const bgmBtn=document.getElementById("bgm");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    const mouse = {
      x: undefined,
      y: undefined,
    };
    const particleArray = [];
    let hue = 0;
    canvas.addEventListener("mousemove", function (event) {
      mouse.x = event.x;
      mouse.y = event.y;
      for(let i=0;i<2;i++){
        particleArray.push(new Particle());
      }
      
    });
    
    window.addEventListener("keydown", function (e) {
      if (e.key === "c" ) {
        mouse.x = Math.random() * canvas.width;
        mouse.y = Math.random() * canvas.height;
        particleArray.push(new Note(e.key));
        C.volume=0.3;
        C.play();
      }else if( e.key === "d"){
        mouse.x = Math.random() * canvas.width;
        mouse.y = Math.random() * canvas.height;
        particleArray.push(new Note(e.key));
        D.volume=0.3;
        D.play();
      }else if( e.key === "e"){
        mouse.x = Math.random() * canvas.width;
        mouse.y = Math.random() * canvas.height;
        particleArray.push(new Note(e.key));
        E.volume=0.3;
        E.play();
      }else if( e.key === "f"){
        mouse.x = Math.random() * canvas.width;
        mouse.y = Math.random() * canvas.height;
        particleArray.push(new Note(e.key));
        F.volume=0.3;
        F.play();
      }else if( e.key === "g"){
        mouse.x = Math.random() * canvas.width;
        mouse.y = Math.random() * canvas.height;
        particleArray.push(new Note(e.key));
        G.volume=0.3;
        G.play();
      }else if( e.key === "a"){
        mouse.x = Math.random() * canvas.width;
        mouse.y = Math.random() * canvas.height;
        particleArray.push(new Note(e.key));
        A.volume=0.3;
        A.play();
      }else if( e.key === "b"){
        mouse.x = Math.random() * canvas.width;
        mouse.y = Math.random() * canvas.height;
        particleArray.push(new Note(e.key));
        B.volume=0.3;
        B.play();
      }
    });
    bgmBtn.addEventListener("click",function(){
        if(BGM.paused){
            BGM.play();
        }else{
            BGM.pause();
        }
    })
    class Particle {
      constructor() {
        this.textString = "♩♪♫♬♯♭♮";
        this.chooseText = this.textString.charAt(
          Math.floor(Math.random() * this.textString.length)
        );
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.floor(Math.random() * 100 + 10);
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.color = "hsl(" + hue + ",100%,50%)";
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.2;
      }
      draw() {
        context.fillStyle = this.color;
        context.font = `${this.size}px sans-serif`;
        context.fillText(`${this.chooseText}`, this.x, this.y);
        context.fill();
      }
    }

    class Note extends Particle {
      constructor(key) {
        super();
        this.size = Math.random() * 100 + 50;
        this.chooseText = `${key.toUpperCase()}`;
      }
    }
   
    function handleParticle() {
      particleArray.forEach((particle) => particle.update());
      particleArray.forEach((particle) => particle.draw());
      for (let i = 0; i < particleArray.length; i++) {
        if (particleArray[i].size <= 0.3) {
          particleArray.splice(i, 1);
          i--;
        }
      }
    }
    
  
    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      //context.fillStyle = "rgba(0,0,0,0.2)";
      //context.fillRect(0, 0, canvas.width, canvas.height);
      hue++;
      handleParticle();
      requestAnimationFrame(animate);
    }
    animate();
  });
 