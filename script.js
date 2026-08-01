// ==========================================
// GLOBAL VARIABLES
// ==========================================

// --- CONFIG ---
const ACTIVE_SECTION_OFFSET = 120;

// --- AUDIO ---
const music = document.getElementById("bgMusic");

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
// OPENING SCREEN
// ==========================================
if (enterButton && openingScreen) {
    enterButton.addEventListener("click", function () {
        if (music) {music.play();}
        openingScreen.style.display = "none";
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


