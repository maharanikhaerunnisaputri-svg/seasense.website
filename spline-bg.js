const spline = document.getElementById("spline-iframe");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
});

function animateSpline() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    spline.style.transform = `
        translate(${currentX}px, ${currentY}px)
        scale(1.05)
    `;

    requestAnimationFrame(animateSpline);
}

animateSpline();
document.querySelectorAll('.flipbook-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.innerHTML = "📖 Membuka Buku...";
    });
});let totalSoal = 5;
let dijawab = 0;

function mulaiKuis() {
    document.getElementById("quiz-box").style.display = "block";
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("robot-section").style.display = "none";
    dijawab = 0;
}

function jawab(btn, benar) {
    const buttons = btn.parentElement.querySelectorAll("button");
    buttons.forEach(b => b.disabled = true);

    if (benar) {
        btn.style.background = "#22c55e";
        btn.innerHTML = "✅ Benar!";
    } else {
        btn.style.background = "#ef4444";
        btn.innerHTML = "❌ Salah";
    }

    dijawab++;

    if (dijawab === totalSoal) {
        setTimeout(() => {
            document.getElementById("robot-section").style.display = "block";
            document.getElementById("robot-section").scrollIntoView({behavior:"smooth"});
        }, 600);
    }
}

function ulangKuis() {
    document.querySelectorAll(".question button").forEach(btn => {
        btn.disabled = false;
        btn.style.background = "#0077b6";
        btn.innerHTML = btn.textContent.replace("✅ Benar!", "").replace("❌ Salah", "");
    });

    dijawab = 0;
    document.getElementById("robot-section").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
}
