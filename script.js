/* ==========================================================================
   CORE ENGINE: INTERACTIVE HUB & EVALUATION SYSTEM
   ========================================================================== */

// --- 1. INISIALISASI ANIMA ON SCROLL (AOS) ---
document.addEventListener("DOMContentLoaded", () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            once: true, 
            duration: 800,
            easing: 'ease-in-out'
        });
    }
    // Hilangkan Efek Preloader Saat Halaman Siap
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 300);
    }
});

// --- 2. DARK / LIGHT MODE CONTROLLER ---
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
}

// --- 3. AMBIENT BACKGROUND MUSIC CONTROLLER ---
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

function toggleMusic() {
    if (!music) return;
    if (!isPlaying) {
        music.play().catch(() => {
            console.log("Interaksi awal pengguna diperlukan untuk memutar audio sistem.");
        });
        musicBtn.innerHTML = `<i class="fas fa-volume-up text-gold text-lg"></i>`;
        isPlaying = true;
    } else {
        music.pause();
        musicBtn.innerHTML = `<i class="fas fa-volume-mute text-gray-300 text-lg"></i>`;
        isPlaying = false;
    }
}

// --- 4. SCROLL ENGINE (PROGRESS BAR & BACK TO TOP) ---
window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressBar = document.getElementById("progressBar");
    if (progressBar) progressBar.style.width = scrolled + "%";

    const bttBtn = document.getElementById("backToTop");
    if (bttBtn) {
        if (winScroll > 400) {
            bttBtn.style.display = "flex";
        } else {
            bttBtn.style.display = "none";
        }
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 5. LIVE CLIENT-SIDE SEARCH ENGINE ---
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const targets = document.querySelectorAll('.searchable');
        
        targets.forEach(target => {
            const text = target.innerText.toLowerCase();
            target.style.display = text.includes(query) ? "block" : "none";
        });
    });
}

// --- 6. LIGHTBOX AUDIOVISUAL SYSTEM ---
// Perubahan pada script.js agar Lightbox mendukung Gambar dan Keterangan Tekstual secara dinamis
function openLightbox(caption, imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const captionText = document.getElementById('lightboxCaption');
    const lightboxImg = document.getElementById('lightboxImg');
    
    if (lightbox && captionText && lightboxImg) {
        captionText.innerText = caption;
        lightboxImg.src = imageSrc; // Memasukkan link gambar secara otomatis saat di-klik
        lightbox.classList.remove('hidden');
    }
}
    


function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.add('hidden');
}

// --- 7. ADAPTIVE QUIZ & EVALUATION LOGIC ---
const quizData = [
    {
        question: "Apa teori kontribusi sains terbesar B.J. Habibie di dunia kedirgantaraan internasional?",
        options: ["Theory of Air Velocity", "Crack Progression Theory", "Aerodynamic Lift Optimization", "Supersonic Wave Stabilization"],
        correct: 1
    },
    {
        question: "Berapa total durasi masa kepemimpinan transisi Presiden B.J. Habibie?",
        options: ["320 Hari", "1000 Hari", "512 Hari", "5 Tahun"],
        correct: 2
    },
    {
        question: "Kebijakan penting apa yang dikeluarkan Habibie untuk menjamin keterbukaan informasi nasional?",
        options: ["Pengesahan UU Pers No. 40 Tahun 1999", "Pembentukan Lembaga Sensor Total", "Pembatasan Akses Internet Global", "Nasionalisasi Stasiun Televisi Swasta"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;

function renderQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;

    if (currentQuestion >= quizData.length) {
        const finalScore = Math.round((score / quizData.length) * 100);
        quizContainer.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-award text-gold text-5xl mb-4 block animate-bounce"></i>
                <h4 class="font-serif font-bold text-2xl mb-2">Evaluasi Selesai!</h4>
                <p class="text-sm text-gray-500 mb-6">Akumulasi perolehan skor akhir Anda adalah: <strong class="text-green-500 text-lg">${finalScore} / 100</strong></p>
                <button onclick="restartQuiz()" class="bg-navy dark:bg-navy-light text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition border border-gold hover:bg-gold hover:text-navy">Ulangi Ujian 🔁</button>
            </div>
        `;
        return;
    }

    const data = quizData[currentQuestion];
    document.getElementById('questionNum').innerText = `Pertanyaan ${currentQuestion + 1} / ${quizData.length}`;
    document.getElementById('questionText').innerText = data.question;

    const box = document.getElementById('optionsBox');
    box.innerHTML = '';
    
    data.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-3.5 text-xs font-medium rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gold hover:text-navy transition duration-150";
        btn.innerText = opt;
        btn.onclick = () => selectOption(idx, data.correct);
        box.appendChild(btn);
    });
}

function selectOption(selected, correct) {
    if (selected === correct) {
        score++;
        const currentScore = Math.round((score / quizData.length) * 100);
        document.getElementById('scoreBadge').innerText = `Skor: ${currentScore}`;
        alert("Jawaban Anda Benar! Tepat Sekali. 🎉");
    } else {
        alert("Jawaban Anda Kurang Tepat. Pelajari kembali materi terkait di atas. 🧐");
    }
    currentQuestion++;
    renderQuiz();
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    window.location.reload();
}

// Jalankan fungsi kuis pertama kali saat file termuat
renderQuiz();