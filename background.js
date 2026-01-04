const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// مركز canvas
ctx.translate(canvas.width / 2, canvas.height / 2);

// إعدادات الفركتال
let maxLevel = 5;
let branches = 2;
let sides = 5;

// المتغيرات الديناميكية
let gapBetweenTwoBranches = 200;
let lengthOfTheBranches = 200;
let spread = 0.3;
let angle = Math.PI * 2 * spread;

// للوقت
let tick = 0;

function drawLine(level) {
    if(level > maxLevel) return;

    // لون Neon متدرج حسب الوقت والمستوى
    let hue = (tick*2 + level*50) % 360;
    ctx.strokeStyle = `hsl(${hue}, 100%, 70%)`;
    ctx.lineWidth = Math.max(2 - level*0.3, 0.5);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(lengthOfTheBranches, 0);
    ctx.stroke();

    for(let i=1;i<branches+1;i++){
        ctx.save();
        ctx.translate(gapBetweenTwoBranches*i,0);
        ctx.scale(0.5,0.5);

        // زاوية تتحرك تلقائيًا لتعطي شكل حي
        let dynamicAngle = angle + Math.sin(tick/50 + i) * 0.3;

        ctx.save();
        ctx.rotate(dynamicAngle + tick*0.002);
        drawLine(level+1);
        ctx.restore();

        ctx.save();
        ctx.rotate(-dynamicAngle + tick*0.002);
        drawLine(level+1);
        ctx.restore();

        ctx.restore();
    }
}

function animate() {
    tick++;

    // خلفية شبه شفافة لإظهار الحركة المستمرة
    ctx.fillStyle = "rgba(0,0,10,0.15)";
    ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

    for(let i=0;i<sides;i++){
        drawLine(0);
        ctx.rotate((Math.PI*2)/sides + Math.sin(tick/1000)*0.002);
    }

    requestAnimationFrame(animate);
}

// بدء التحريك
animate();

// responsive
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.setTransform(1,0,0,1,0,0);
    ctx.translate(canvas.width/2, canvas.height/2);
});
