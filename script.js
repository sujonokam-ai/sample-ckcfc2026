// ==========================================
// GLOBAL VARIABLES
// ==========================================

// --- CONFIG ---
const ACTIVE_SECTION_OFFSET = 120;

// --- AUDIO ---
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const registrationMusic = document.getElementById("registrationMusic");

let registrationMode = false;
let invitationStarted = false;

//--- OPENING SCREEN ---
const enterButton = document.getElementById("enterInvitation");
const openingScreen = document.getElementById("openingScreen");

//--- HERO ---
const cover = document.querySelector(".cover");

//--- NAVIGATION ---
const floatingNav = document.querySelector(".floating-nav");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".floating-nav a");

//--- REVEAL ---
const reveals = document.querySelectorAll(".reveal");

//--- COUNTDOWN ---
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const message = document.getElementById("countdownMessage");


//--- ANIMATED COUNTER ---
const counters = document.querySelectorAll(".counter");


//--- LIGHT BOX ---
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.querySelector(".close-lightbox");

//--- VIDEO MODAL ---
const thumbnails = document.querySelectorAll(".video-thumbnail");
const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const closeVideo = document.querySelector(".close-video");

// ==========================================
// MUSIC CONTROL
// ==========================================

musicToggle.addEventListener("click", function(){

    // ============================================================
    // JIKA SEDANG MODE REGISTRASI
    // TOGGLE MENGONTROL LAGU 2
    // ============================================================

    if (registrationMode) {

        console.log("MUSIC TOGGLE → Lagu 2");

        if (registrationMusic.paused) {

            console.log("Lagu 2 PLAY");

            registrationMusic.play();

        } else {

            console.log("Lagu 2 PAUSE");

            registrationMusic.pause();

        }

        return;
    }


    // ============================================================
    // MODE NORMAL
    // TOGGLE MENGONTROL LAGU 1
    // ============================================================

    console.log("MUSIC TOGGLE → Lagu 1");

    console.log(
        "paused =",
        music.paused
    );

    console.log(
        "currentTime =",
        music.currentTime
    );


    if (music.paused){

        console.log("Lagu 1 PLAY");

        music.play();

    } else {

        console.log("Lagu 1 PAUSE");

        music.pause();

    }

});

// ===================================================================
// MUSIC VISIBILITY CONTROL
// ===================================================================

let musicWasPlayingBeforeHidden = false;

document.addEventListener("visibilitychange", function () {

    console.log("=================================");
    console.log("VISIBILITY CHANGE");
    console.log("document.hidden =", document.hidden);
    console.log("invitationStarted =", invitationStarted);
    console.log("registrationMode =", registrationMode);
    console.log("music.paused =", music ? music.paused : "music tidak ada");
    console.log(
        "registrationMusic.paused =",
        registrationMusic ? registrationMusic.paused : "music tidak ada"
    );
    console.log("=================================");


    // ================================================================
    // HALAMAN MASUK BACKGROUND
    // ================================================================

    if (document.hidden) {

        // ------------------------------------------------------------
        // MODE REGISTRASI
        // ------------------------------------------------------------

        if (registrationMode) {

            console.log(
                "BACKGROUND → MODE REGISTRASI"
            );

            if (
                registrationMusic &&
                !registrationMusic.paused
            ) {

                registrationMusic.pause();

                console.log(
                    "BACKGROUND → Lagu 2 PAUSE"
                );

            }

            return;
        }


        // ------------------------------------------------------------
        // MODE MUSIK UTAMA
        // ------------------------------------------------------------

        if (music && !music.paused) {

            musicWasPlayingBeforeHidden = true;

            console.log(
                "BACKGROUND → Lagu 1 sedang PLAY"
            );

            music.pause();

            console.log(
                "BACKGROUND → Lagu 1 PAUSE"
            );

        } else {

            musicWasPlayingBeforeHidden = false;

            console.log(
                "BACKGROUND → Lagu 1 sudah PAUSE"
            );

        }

    }


    // ================================================================
    // HALAMAN KEMBALI TERLIHAT
    // ================================================================

    else {

        console.log(
            "KEMBALI KE HALAMAN"
        );


        // ------------------------------------------------------------
        // KEMBALI DARI REGISTRASI
        // ------------------------------------------------------------

        if (registrationMode) {

        console.log(
            "KEMBALI → SELESAI MODE REGISTRASI"
        );


        // ------------------------------------------------------------
        // STOP LAGU 2
        // ------------------------------------------------------------

        if (registrationMusic) {

            registrationMusic.pause();

            registrationMusic.currentTime = 0;

            console.log(
                "Lagu 2 STOP"
            );

        }


        // ------------------------------------------------------------
        // TUTUP MODAL OTOMATIS
        // ------------------------------------------------------------

        if (registrationModal) {

            registrationModal.style.display = "none";

            console.log(
                "Registration Modal AUTO CLOSE"
            );

        }


        // ------------------------------------------------------------
        // KELUAR DARI MODE REGISTRASI
        // ------------------------------------------------------------

        registrationMode = false;


            // Resume Lagu 1
            if (
                invitationStarted &&
                musicBeforeRegistration &&
                music
            ) {

                // Kembalikan posisi Lagu 1
                music.currentTime =
                    musicPositionBeforeRegistration;

                console.log(
                    "Lagu 1 kembali ke posisi:",
                    music.currentTime
                );


                music.play()
                    .then(function () {

                        console.log(
                            "Lagu 1 RESUME setelah registrasi"
                        );

                    })
                    .catch(function (error) {

                        console.log(
                            "Lagu 1 gagal resume setelah registrasi:",
                            error
                        );

                    });

            } else {

                console.log(
                    "Lagu 1 tidak resume setelah registrasi"
                );

            }

            return;
        }


        // ------------------------------------------------------------
        // KEMBALI DARI BACKGROUND BIASA
        // ------------------------------------------------------------

        if (
            invitationStarted &&
            musicWasPlayingBeforeHidden &&
            music
        ) {

            console.log(
                "PERINTAH → RESUME LAGU 1"
            );

            music.play()
                .then(function () {

                    console.log(
                        "Lagu 1 RESUME BERHASIL"
                    );

                })
                .catch(function (error) {

                    console.log(
                        "Lagu 1 RESUME GAGAL:",
                        error
                    );

                });

        } else {

            console.log(
                "Lagu 1 TIDAK RESUME"
            );

        }


        musicWasPlayingBeforeHidden = false;

    }

});

// ========================================================
// TAMBAHAN: MATIKAN MUSIK UTAMA SAAT SEMUA VIDEO YOUTUBE DIKLIK
// ========================================================

const semuaVideo = document.querySelectorAll('.video-thumbnail');

semuaVideo.forEach(function(videoTunggal) {

    videoTunggal.addEventListener("click", function() {

        console.log(
            "Salah satu video YouTube diklik, mematikan lagu pembuka..."
        );

        // Hentikan lagu pembuka
        music.pause();

    });

});


music.addEventListener("play", function(){

    musicToggle.textContent = "🔊";

});


music.addEventListener("pause", function(){

    musicToggle.textContent = "🔇";

});

// ========================================================
// MUSIC TOGGLE ICON - REGISTRATION MUSIC
// ========================================================

registrationMusic.addEventListener("play", function(){

    if (registrationMode) {

        musicToggle.textContent = "🔊";

    }

});

registrationMusic.addEventListener("pause", function(){

    if (registrationMode) {

        musicToggle.textContent = "🔇";

    }

});

// ==========================================
// OPENING SCREEN
// ==========================================

if (enterButton && openingScreen) {

    enterButton.addEventListener("click", function () {

        invitationStarted = true;// ← MENGUBAH NILAI

        if (music) {

            music.play();

        }

        if (musicToggle) {

            musicToggle.style.display = "flex";
            musicToggle.textContent = "🔊";

        }

        openingScreen.style.display = "none";

    });

}

// ===================================================================
// REGISTRATION MUSIC
// ===================================================================

const registerButton = document.querySelector(".register-button");

let musicBeforeRegistration = false;
let musicPositionBeforeRegistration = 0;

// ===================================================================
// REGISTRATION BUTTON + REGISTRATION MODAL
// ===================================================================

const registrationModal =
    document.getElementById("registrationModal");

const closeRegistration =
    document.getElementById("closeRegistration");

if (registerButton) {

    registerButton.addEventListener("click", function (event) {

        // Jangan membuka Google Form sebagai halaman baru
        event.preventDefault();

        console.log("DAFTAR SEKARANG diklik");


        // ============================================================
        // BUKA MODE REGISTRASI
        // ============================================================

        registrationMode = true;


        // ============================================================
        // SIMPAN KONDISI LAGU 1
        // ============================================================

        if (music) {

            musicBeforeRegistration = !music.paused;

            musicPositionBeforeRegistration =
                music.currentTime;


            console.log(
                "Lagu 1 sebelum registrasi:",
                musicBeforeRegistration
            );

            console.log(
                "Posisi Lagu 1:",
                musicPositionBeforeRegistration
            );


            // Pause Lagu 1
            music.pause();

        }


        // ============================================================
        // MAINkan LAGU 2
        // ============================================================

        if (
            registrationMusic &&
            musicBeforeRegistration
        ) {

            registrationMusic.currentTime = 0;

            registrationMusic.play()
                .then(function () {

                    console.log(
                        "Lagu 2 REGISTRASI PLAY"
                    );

                })
                .catch(function (error) {

                    console.log(
                        "Lagu 2 gagal play:",
                        error
                    );

                });

        } else {

            console.log(
                "Lagu 2 tidak dimainkan karena Music Toggle sedang OFF."
            );

        }


        // ============================================================
        // BUKA MODAL
        // ============================================================

        if (registrationModal) {

            registrationModal.style.display = "flex";

            console.log(
                "Registration Modal OPEN"
            );

        }

    });

}

// ===================================================================
// CLOSE REGISTRATION MODAL
// ===================================================================

if (closeRegistration) {

    closeRegistration.addEventListener("click", function () {

        console.log(
            "REGISTRATION MODAL ditutup"
        );


        // ============================================================
        // STOP LAGU 2
        // ============================================================

        if (registrationMusic) {

            registrationMusic.pause();

            registrationMusic.currentTime = 0;

            console.log(
                "Lagu 2 STOP"
            );

        }


        // ============================================================
        // TUTUP MODAL
        // ============================================================

        if (registrationModal) {

            registrationModal.style.display = "none";

        }


        // ============================================================
        // KELUAR DARI MODE REGISTRASI
        // ============================================================

        registrationMode = false;


        // ============================================================
        // RESUME LAGU 1
        // ============================================================

        if (
            invitationStarted &&
            musicBeforeRegistration &&
            music
        ) {

            music.currentTime =
                musicPositionBeforeRegistration;


            console.log(
                "Lagu 1 kembali ke posisi:",
                music.currentTime
            );


            music.play()
                .then(function () {

                    console.log(
                        "Lagu 1 RESUME setelah registrasi"
                    );

                })
                .catch(function (error) {

                    console.log(
                        "Lagu 1 gagal resume setelah registrasi:",
                        error
                    );

                });

        } else {

            console.log(
                "Lagu 1 tidak resume setelah registrasi"
            );

        }

    });

}


// ==========================================
// INTERSECTION OBSERVER
// ==========================================

const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

        }

    });

},{
    threshold:0.2
});

reveals.forEach(function(item){

    observer.observe(item);

});

// ==========================================
// SCROLL EFFECT
// ==========================================

// --- HERO PARALLAX ---
if (cover) {

    window.addEventListener("scroll", function(){

        const scroll = window.scrollY;

        cover.style.backgroundPositionY =
            scroll * 0.35 + "px";

    });

}
// --- ACTIVE NAVIGATION ---
window.addEventListener("scroll", function () {

    let current = "";

    sections.forEach(function(section){

        const sectionTop = section.offsetTop - ACTIVE_SECTION_OFFSET;

        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(function(link){

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }
    });
});

// --- AUTO HIDE FLOATING NAV ---

let lastScroll = 0;

const HIDE_OFFSET = 300;

if (floatingNav) {

    window.addEventListener("scroll", function () {

        const currentScroll = window.scrollY;

        if (
            currentScroll > lastScroll &&
            currentScroll > HIDE_OFFSET
        ) {

            floatingNav.classList.add("hide");

        } else {

            floatingNav.classList.remove("hide");
        }

        lastScroll = currentScroll;
    });
}

// ==========================
// HERO COUNTDOWN
// ==========================

function formatNumber(number) {
    return String(number).padStart(2, "0");
}

const targetDate = new Date("2026-10-22T07:00:00");

let timer;

function updateCountdown() {

    const now = new Date();
    const distance = targetDate - now;

    if (distance <= 0) {

        clearInterval(counterTimer);

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
       
        if (message) {
            message.textContent = "🏆 Turnamen Telah Dimulai!";
        }

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    daysElement.textContent = formatNumber(days);
    hoursElement.textContent = formatNumber(hours);
    minutesElement.textContent = formatNumber(minutes);
    secondsElement.textContent = formatNumber(seconds);
   
    if (message) {
        message.textContent = "";
    }
}

updateCountdown();

timer = setInterval(updateCountdown, 1000);

// ==========================
// ANIMATED COUNTER
// ==========================

const counterObserver = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let number = 0;

            const speed = target / 80;

            const timer = setInterval(function(){

                number += speed;

                if(number >= target){

                    counter.textContent = target;

                    clearInterval(timer);

                }else{

                    counter.textContent = Math.floor(number);

                }

            },20);

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(function(counter){

    counterObserver.observe(counter);

});

// ==========================
// GUIDE SWIPER
// ==========================

const guideSwiper = new Swiper(".guideSwiper",{

    loop: false,

    speed: 700,

    grabCursor: true,

    centeredSlides: true,

    slidesPerView: 1.2,

    spaceBetween: 20,

    effect: "coverflow",

    coverflowEffect: {

        rotate: 20,

        stretch: 0,

        depth: 120,

        modifier: 1,

        slideShadows: false,

        scale: 0.9

    },

    pagination: {
    el: ".guide .swiper-pagination",
    clickable: true,
},

    navigation: {
    nextEl: ".guide .swiper-button-next",
    prevEl: ".guide .swiper-button-prev",
},

    breakpoints: {

        768: {

            slidesPerView: 2.2

        }

    }

});
// ==========================
// HISTORY SWIPER
// ==========================
const historySwiper = new Swiper(".historySwiper", {

    loop: false,

    speed: 700,

    grabCursor: true,

    centeredSlides: true,

    slidesPerView: 1.2,

    spaceBetween: 20,

    effect: "coverflow",

    coverflowEffect: {

        rotate: 20,

        stretch: 0,

        depth: 120,

        modifier: 1,

        slideShadows: false,

        scale: 0.9

    },

    pagination: {

        el: ".history .swiper-pagination",

        clickable: true,

    },

    navigation: {

        nextEl: ".history .swiper-button-next",

        prevEl: ".history .swiper-button-prev",

    },

    breakpoints: {

        768: {

            slidesPerView: 2.2

        }

    }

});

// ==========================
// LIGHTBOX
// ==========================

function enableLightbox(swiper){

    swiper.on("tap", function(){

        const slide = swiper.slides[swiper.activeIndex];

        const img = slide.querySelector("img");

        if (!img) return;

        lightbox.style.display = "flex";

        lightboxImage.src = img.src;

    });

}

enableLightbox(historySwiper);
enableLightbox(guideSwiper);

if (closeLightbox) {

    closeLightbox.addEventListener("click", function(){

        lightbox.style.display = "none";

    });

}

if (lightbox) {

    lightbox.addEventListener("click", function(e){

        if(e.target === lightbox){

            lightbox.style.display = "none";

        }

    });

}

// ==========================
// VIDEO MODAL
// ==========================

function openVideoModal(videoUrl){

    videoModal.classList.add("show");

    videoFrame.src = videoUrl + "?autoplay=1";

}

function closeVideoModal(){

    videoModal.classList.remove("show");

    videoFrame.src = "";

}

thumbnails.forEach(function(item){

    item.addEventListener("click", function(){

        openVideoModal(item.dataset.video);

    });

});

if (closeVideo) {

    closeVideo.addEventListener("click", function(){

        closeVideoModal();

    });

}

if (videoModal) {

    videoModal.addEventListener("click", function(e){

        if(e.target === videoModal){

            closeVideoModal();

        }

    });

}
console.log("SCRIPT SELESAI DIEKSEKUSI");


