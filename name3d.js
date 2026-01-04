const ultra = document.getElementById("ultraName");
const letters = ultra.textContent.split("").map(c => `<span>${c}</span>`).join("");
ultra.innerHTML = letters;
const letterSpans = ultra.querySelectorAll("span");

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";


for (let i = 0; i < 3; i++) {
  const scan = document.createElement("span");
  scan.className = "scan";
  ultra.appendChild(scan);
}


const rand = (min,max) => Math.random()*(max-min)+min;
const randomColor = () => ["#38bdf8","#a855f7","#22c55e","#f43f5e"][Math.floor(Math.random()*4)];


function glitchLetter(letter) {
  const original = letter.textContent;
  letter.textContent = original.split("").map(c => (Math.random()<0.3 ? chars[Math.floor(Math.random()*chars.length)] : c)).join("");
  letter.style.color = randomColor();
  letter.style.transform = `translate(${rand(-8,8)}px,${rand(-8,8)}px) rotate(${rand(-10,10)}deg)`;
  setTimeout(() => {
    letter.textContent = original;
    letter.style.color = "#38bdf8";
    letter.style.transform = "translate(0,0) rotate(0)";
  }, rand(50,250));
}


function createParticle(x,y,color) {
  const p = document.createElement("div");
  p.className="particle";
  p.style.left = x+"px";
  p.style.top = y+"px";
  p.style.background=color;
  p.style.setProperty('--dx', rand(-60,60)+"px");
  p.style.setProperty('--dy', rand(-60,60)+"px");
  document.body.appendChild(p);
  setTimeout(()=>p.remove(),800);
}


function triggerGlitch() {
  letterSpans.forEach(l => { if(Math.random()<0.7) glitchLetter(l); });

  letterSpans.forEach(l => {
    const rect = l.getBoundingClientRect();
    if(Math.random()<0.4) createParticle(rect.left+rect.width/2, rect.top+rect.height/2, randomColor());
  });

  ultra.style.textShadow = `0 0 ${rand(10,30)}px ${randomColor()}, 0 0 ${rand(15,40)}px ${randomColor()}`;
}


setInterval(triggerGlitch, rand(200,1200));


ultra.addEventListener("mouseenter", triggerGlitch);
ultra.addEventListener("click", triggerGlitch);

