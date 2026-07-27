console.log("Script.js berhasil dimuat");
const tombol = document.getElementById("openInvitation");
const music = document.getElementById("bgMusic");

const about = document.getElementById("about");

tombol.addEventListener("click", function(){

    about.scrollIntoView({

        behavior:"smooth"

    });

    music.play();

});
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{
    threshold:0.2
});

reveals.forEach(function(item){

    observer.observe(item);

});
// ==========================
// COUNTDOWN
// ==========================

function formatNumber(number) {
    return String(number).padStart(2, "0");
}

const targetDate = new Date("2026-10-15T07:00:00");

let timer;

function updateCountdown() {

    const now = new Date();
    const distance = targetDate - now;

    if (distance <= 0) {

        clearInterval(timer);

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        const message = document.getElementById("countdownMessage");

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

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = formatNumber(hours);
    document.getElementById("minutes").textContent = formatNumber(minutes);
    document.getElementById("seconds").textContent = formatNumber(seconds);

    const message = document.getElementById("countdownMessage");

    if (message) {
        message.textContent = "";
    }
}

updateCountdown();

timer = setInterval(updateCountdown, 1000);
// ==========================
// SWIPER GALLERY
// ==========================

// ==========================
// SWIPER GALLERY
// ==========================

const gallerySwiper = new Swiper(".myGallery", {

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

        el: ".swiper-pagination",

        clickable: true,

    },

    navigation: {

        nextEl: ".swiper-button-next",

        prevEl: ".swiper-button-prev",

    },

    breakpoints: {

        768: {

            slidesPerView: 2.2

        }

    }

});
// ==========================
// OPENING SCREEN
// ==========================

const enterButton = document.getElementById("enterInvitation");
const openingScreen = document.getElementById("openingScreen");

enterButton.addEventListener("click", function () {

    music.play();

    openingScreen.style.display = "none";

});
// ==========================
// ACTIVE NAVIGATION
// ==========================

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".floating-nav a");

window.addEventListener("scroll", function () {

    let current = "";

    sections.forEach(function(section){

        const sectionTop = section.offsetTop - 120;

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
// ==========================
// AUTO HIDE FLOATING NAV
// ==========================

const floatingNav = document.querySelector(".floating-nav");

let lastScroll = 0;

window.addEventListener("scroll", function(){

    const currentScroll = window.pageYOffset;

    if(currentScroll > lastScroll && currentScroll > 300){

        floatingNav.classList.add("hide");

    }else{

        floatingNav.classList.remove("hide");

    }

    lastScroll = currentScroll;

});
// ==========================
// HERO PARALLAX
// ==========================

const cover = document.querySelector(".cover");

window.addEventListener("scroll", function(){

    const scroll = window.pageYOffset;

    cover.style.backgroundPositionY =
        scroll * 0.35 + "px";

});
// ==========================
// ANIMATED COUNTER
// ==========================

const counters = document.querySelectorAll(".counter");

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
// LIGHTBOX
// ==========================

const galleryImages = document.querySelectorAll(".swiper-slide img");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.querySelector(".close-lightbox");

galleryImages.forEach(function(img){

    img.addEventListener("click", function(){

        lightbox.style.display = "flex";

        lightboxImage.src = this.src;

    });

});

closeLightbox.addEventListener("click", function(){

    lightbox.style.display = "none";

});

lightbox.addEventListener("click", function(e){

    if(e.target === lightbox){

        lightbox.style.display = "none";

    }

});
