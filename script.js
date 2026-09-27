/* =========================================================
   SEASENSE — script.js
   Semua interaksi halaman: navigasi, progress bar, kuis,
   pulau 3D on-demand, dan tombol video.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initScrollProgress();
    initMobileNav();
    initBackToTop();
    initFlipbookLabel();
});

/* ---------- Progress bar baca ---------- */
function initScrollProgress() {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;

    const update = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + "%";
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
}

/* ---------- Navigasi mobile (hamburger) ---------- */
function initMobileNav() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
        const isOpen = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            links.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* ---------- Tombol kembali ke atas ---------- */
function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    window.addEventListener(
        "scroll",
        () => {
            btn.classList.toggle("visible", window.scrollY > 500);
        },
        { passive: true }
    );

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ---------- Label tombol flipbook saat diklik ---------- */
function initFlipbookLabel() {
    document.querySelectorAll(".flipbook-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.innerHTML = "📖 Membuka Buku...";
        });
    });
}

/* ---------- Tombol putar video (memperbaiki bug: fungsi ini
   sebelumnya dipanggil di HTML tapi tidak pernah didefinisikan) ---------- */
function playVideo() {
    const iframe = document.querySelector(".video-wrapper iframe");
    if (!iframe) return;

    if (!iframe.dataset.autoplaySet) {
        const separator = iframe.src.includes("?") ? "&" : "?";
        iframe.src = iframe.src + separator + "autoplay=1";
        iframe.dataset.autoplaySet = "true";
    }

    iframe.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* =========================================================
   KUIS
   ========================================================= */
let totalSoal = 5;
let dijawab = 0;

function mulaiKuis() {
    document.getElementById("quiz-box").style.display = "block";
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("robot-section").style.display = "none";
    dijawab = 0;
}

function jawab(btn, benar) {
    const buttons = btn.parentElement.querySelectorAll("button");
    buttons.forEach((b) => (b.disabled = true));

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
            document.getElementById("robot-section").scrollIntoView({ behavior: "smooth" });
        }, 600);
    }
}

function ulangKuis() {
    document.querySelectorAll(".question button").forEach((btn) => {
        btn.disabled = false;
        btn.style.background = "";
        btn.innerHTML = btn.textContent.replace("✅ Benar!", "").replace("❌ Salah", "");
    });

    dijawab = 0;
    document.getElementById("robot-section").style.display = "none";
    document.getElementById("kuis").scrollIntoView({ behavior: "smooth" });
}