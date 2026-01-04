

const ultra = document.getElementById("ultraName");


const ORIGINAL_NAME = ultra.dataset.text || "OUSSAMA EJDIA";

ultra.innerHTML = ORIGINAL_NAME.split("").map(c => `<span>${c}</span>`).join("");
const letterSpans = Array.from(ultra.querySelectorAll("span"));


const chars = "ABCDEFGHI漢字仮名日本語JKLMNOPQRSアイウエオカキクケコサTUVWXあいうえおかきYZ0123456789@#$%&*";

for (let i = 0; i < 3; i++) {
  const s = document.createElement("span");
  s.className = "scan";
  ultra.appendChild(s);
}


const rand = (a,b)=>Math.random()*(b-a)+a;
const colors=["#38bdf8","#a855f7","#22c55e","#f43f5e"];
const rc=()=>colors[(Math.random()*colors.length)|0];
const easeInOut = t => t<.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;


let busy=false, paused=false, breathT=0;


document.addEventListener("visibilitychange",()=>paused=document.hidden);


function resetLetter(l,i){
  l.textContent = ORIGINAL_NAME[i]||"";
  l.style.color = "#38bdf8";
  l.style.transform = "translate(0,0) rotate(0)";
  l.style.textShadow = "";
}


function rgbSplit(l,p=1){
  l.style.textShadow =
    `${-1*p}px 0 0 rgba(244,63,94,.7),
     ${1*p}px 0 0 rgba(34,197,94,.7),
     0 0 ${6*p}px rgba(56,189,248,.6)`;
}


function glitchLetter(l,i,p=1){
  const o = ORIGINAL_NAME[i]||"";
  l.textContent = Math.random()<.45*p ? chars[(Math.random()*chars.length)|0] : o;
  l.style.color = rc();
  l.style.transform = `translate(${rand(-5,5)*p}px,${rand(-5,5)*p}px) rotate(${rand(-8,8)*p}deg)`;
  rgbSplit(l,p);
  setTimeout(()=>resetLetter(l,i), rand(60,160));
}


function particle(x,y,c){
  const d=document.createElement("div");
  d.className="particle";
  d.style.left=x+"px"; d.style.top=y+"px"; d.style.background=c;
  d.style.setProperty("--dx",rand(-50,50)+"px");
  d.style.setProperty("--dy",rand(-50,50)+"px");
  document.body.appendChild(d);
  setTimeout(()=>d.remove(),600);
}


function wave(p=1,rev=false){
  if(busy||paused) return; busy=true;
  const seq = rev ? [...letterSpans].reverse() : letterSpans;
  seq.forEach((l,idx)=>{
    const i = rev ? letterSpans.length-1-idx : idx;
    setTimeout(()=>glitchLetter(l,i,p), idx*45);
  });
  setTimeout(()=>busy=false, seq.length*50);
}


function burst(p=1){
  if(busy||paused) return; busy=true;
  letterSpans.forEach((l,i)=>Math.random()<.8&&glitchLetter(l,i,p));
  letterSpans.forEach(l=>{
    if(Math.random()<.25){
      const r=l.getBoundingClientRect();
      particle(r.left+r.width/2,r.top+r.height/2,rc());
    }
  });
  ultra.style.textShadow=`0 0 ${rand(18,36)}px ${rc()},0 0 ${rand(28,60)}px ${rc()}`;
  setTimeout(()=>{ultra.style.textShadow="";busy=false;},260);
}


function caretStrike(){
  if(busy||paused) return; busy=true;
  let i=0;
  const t=setInterval(()=>{
    if(i>=letterSpans.length){clearInterval(t);busy=false;return;}
    glitchLetter(letterSpans[i],i,1.2);
    i++;
  },35);
}


function idleBreath(){
  if(busy||paused) return;
  breathT+=0.02;
  const s=1+Math.sin(breathT)*0.015;
  ultra.style.transform=`scale(${s})`;
}


setInterval(()=>{
  if(paused) return;
  const r=Math.random();
  if(r<.35) wave(.8);
  else if(r<.6) wave(.9,true);
  else if(r<.82) burst(.9);
  else caretStrike();
}, rand(900,1800));


(function loop(){
  idleBreath();
  requestAnimationFrame(loop);
})();


ultra.addEventListener("mouseenter",()=>burst(1.2));
ultra.addEventListener("click",()=>caretStrike());

