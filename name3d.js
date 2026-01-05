

const ultra = document.getElementById("ultraName");


const ORIGINAL_NAME = (ultra.dataset.text || "OUSSAMA EJDIA").trim();
const [FIRST, LAST] = ORIGINAL_NAME.split(" ");


Object.assign(ultra.style, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  whiteSpace: "nowrap",
  lineHeight: "1",
  position: "relative",
  fontWeight: "700"
});


function buildWord(word, cls) {
  const wrap = document.createElement("span");
  wrap.className = cls;
  wrap.style.display = "flex";

  word.split("").forEach(c => {
    const s = document.createElement("span");
    s.textContent = c;
    s.style.display = "inline-block";
    wrap.appendChild(s);
  });

  return wrap;
}

ultra.innerHTML = "";
const firstWrap = buildWord(FIRST, "first");
const lastWrap  = buildWord(LAST,  "last");
ultra.append(firstWrap, lastWrap);


const letters = [...ultra.querySelectorAll("span span")];


const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*漢字仮名日本語アイウエオ";


function resize() {
  const w = innerWidth;

  ultra.style.flexDirection = w <= 580 ? "column" : "row";
  lastWrap.style.marginLeft = w <= 580 ? "0" : "14px";
  lastWrap.style.marginTop  = w <= 580 ? "6px" : "0";

  ultra.style.fontSize =
    w > 1200 ? "72px" :
    w > 992  ? "60px" :
    w > 768  ? "48px" :
    w > 480  ? "44px" : "30px";
}
resize();
addEventListener("resize", resize);


const rand = (a,b)=>Math.random()*(b-a)+a;
const colors = ["#38bdf8","#a855f7","#22c55e","#f43f5e"];
const rc = ()=>colors[(Math.random()*colors.length)|0];


let busy=false, paused=false, t=0;
document.addEventListener("visibilitychange",()=>paused=document.hidden);


function reset(l,i){
  const full = FIRST + LAST;
  l.textContent = full[i] || "";
  l.style.cssText =
   "display:inline-block;color:#38bdf8;transform:none;text-shadow:none;";
}


function rgb(l,p=1){
  l.style.textShadow =
   `${-1*p}px 0 rgba(244,63,94,.7),
    ${1*p}px 0 rgba(34,197,94,.7),
    0 0 ${6*p}px rgba(56,189,248,.6)`;
}


function glitch(l,i,p=1){
  l.textContent =
    Math.random()<.45*p ? chars[(Math.random()*chars.length)|0] : l.textContent;
  l.style.color = rc();
  l.style.transform =
   `translate(${rand(-5,5)*p}px,${rand(-5,5)*p}px)
    rotate(${rand(-8,8)*p}deg)`;
  rgb(l,p);
  setTimeout(()=>reset(l,i),rand(70,160));
}


function wave(p=1,rev=false){
  if(busy||paused)return; busy=true;
  const seq = rev ? [...letters].reverse() : letters;
  seq.forEach((l,i)=>setTimeout(()=>glitch(l,i,p),i*45));
  setTimeout(()=>busy=false,seq.length*55);
}


function burst(p=1){
  if(busy||paused)return; busy=true;
  letters.forEach((l,i)=>Math.random()<.8&&glitch(l,i,p));
  ultra.style.textShadow =
   `0 0 ${rand(18,36)}px ${rc()},
    0 0 ${rand(30,60)}px ${rc()}`;
  setTimeout(()=>{ultra.style.textShadow="";busy=false},280);
}


function strike(){
  if(busy||paused)return; busy=true;
  let i=0;
  const it=setInterval(()=>{
    if(i>=letters.length){clearInterval(it);busy=false;return;}
    glitch(letters[i],i,1.2); i++;
  },40);
}


(function loop(){
  if(!busy&&!paused){
    t+=0.02;
    ultra.style.transform =
     `scale(${1+Math.sin(t)*0.015})`;
  }
  requestAnimationFrame(loop);
})();


setInterval(()=>{
  if(paused)return;
  const r=Math.random();
  if(r<.35) wave(.8);
  else if(r<.6) wave(.9,true);
  else if(r<.85) burst(.9);
  else strike();
}, rand(900,1700));


ultra.addEventListener("mouseenter",()=>burst(1.2));
ultra.addEventListener("click",()=>strike());
