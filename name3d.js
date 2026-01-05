

const ultra = document.getElementById("ultraName");


const FULL_NAME = (ultra.dataset.text || "OUSSAMA EJDIA").trim();
const [FIRST, LAST] = FULL_NAME.split(" ");


Object.assign(ultra.style,{
  position:"relative",
  display:"inline-block",
  textAlign:"center",
  lineHeight:"1.1",
  fontWeight:"700",
  userSelect:"none",
  maxWidth:"100%"
});


function resizeFont(){
  const w = window.innerWidth;
  ultra.style.fontSize =
    w > 1200 ? "72px" :
    w > 992  ? "60px" :
    w > 768  ? "48px" :
    w > 480  ? "36px" : "30px";
}
resizeFont();
window.addEventListener("resize", resizeFont);

 
function build(stack){
  ultra.innerHTML = "";

  const buildWord = word => {
    const row = document.createElement("div");
    row.style.whiteSpace="nowrap";
    row.style.display="block";

    word.split("").forEach(c=>{
      const s=document.createElement("span");
      s.textContent=c;
      s.style.display="inline-block";
      row.appendChild(s);
    });
    ultra.appendChild(row);
  };

  if(stack){
    buildWord(FIRST);
    buildWord(LAST);
  }else{
    buildWord(FIRST+"  "+LAST);
  }
}
build(window.innerWidth < 600);

 
const getLetters = ()=>[...ultra.querySelectorAll("span")];

 
const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*漢字仮名日本語";
 
const rand=(a,b)=>Math.random()*(b-a)+a;
const colors=["#38bdf8","#a855f7","#22c55e","#f43f5e"];
const rc=()=>colors[(Math.random()*colors.length)|0];

 
let busy=false,paused=false,t=0;
document.addEventListener("visibilitychange",()=>paused=document.hidden);

 
function reset(l,c){
  l.textContent=c;
  l.style.color="#38bdf8";
  l.style.transform="none";
  l.style.textShadow="none";
}

 
function rgb(l,p=1){
  l.style.textShadow=
   `${-1*p}px 0 rgba(244,63,94,.7),
    ${1*p}px 0 rgba(34,197,94,.7),
    0 0 ${6*p}px rgba(56,189,248,.6)`;
}

 
function glitch(l,c,p=1){
  l.textContent=Math.random()<.45*p
   ? chars[(Math.random()*chars.length)|0]
   : c;
  l.style.color=rc();
  l.style.transform=
   `translate(${rand(-4,4)*p}px,${rand(-4,4)*p}px)
    rotate(${rand(-6,6)*p}deg)`;
  rgb(l,p);
  setTimeout(()=>reset(l,c),rand(70,140));
}
 
function wave(){
  if(busy||paused)return; busy=true;
  const letters=getLetters();
  letters.forEach((l,i)=>{
    const c=l.textContent;
    setTimeout(()=>glitch(l,c,.9),i*40);
  });
  setTimeout(()=>busy=false,letters.length*45);
}

function burst(){
  if(busy||paused)return; busy=true;
  getLetters().forEach(l=>{
    Math.random()<.8&&glitch(l,l.textContent,1);
  });
  ultra.style.textShadow=
   `0 0 30px ${rc()},0 0 60px ${rc()}`;
  setTimeout(()=>{
    ultra.style.textShadow="";
    busy=false;
  },260);
}

 
function idle(){
  if(busy||paused)return;
  t+=0.02;
  ultra.style.transform=
   `scale(${1+Math.sin(t)*0.012})`;
}

 
window.addEventListener("resize",()=>{
  build(window.innerWidth < 600);
});

 
setInterval(()=>{
  if(paused)return;
  Math.random()<.5 ? wave() : burst();
},1000);

 
(function loop(){
  idle();
  requestAnimationFrame(loop);
})();

 
ultra.addEventListener("mouseenter",burst);
ultra.addEventListener("click",wave);
