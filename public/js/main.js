document.addEventListener("DOMContentLoaded", () => {

    const tl = gsap.timeline();

    tl.to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1
    })

    .to(".hero-title", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
    }, "-=0.5")

    .to(".hero-community", {
        opacity: 1,
        y: 0,
        duration: 1
    }, "-=0.7")

    .to(".hero-description", {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, "-=0.5")

    .to(".hero-buttons", {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, "-=0.4");

});

// =========================
// NAVBAR SCROLL EFFECT
// =========================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".custom-navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(8, 3, 8, 0.90)";

        navbar.style.padding =
            "10px 0";

    } else {

        navbar.style.background =
            "rgba(8, 3, 8, 0.35)";

        navbar.style.padding =
            "18px 0";
    }

});
// =========================
// PUJA PAGE ANIMATION
// =========================

if (document.querySelector(".puja-page")) {

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".puja-reveal", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out"
    });


    gsap.from(".puja-event", {
        opacity: 0,
        x: -60,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",

        scrollTrigger: {
            trigger: ".puja-timeline",
            start: "top 80%"
        }
    });


    gsap.from(".attraction-card", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",

        scrollTrigger: {
            trigger: ".attractions",
            start: "top 80%"
        }
    });

}

const qrCard = document.querySelector("#qrCard");

if (qrCard) {

    qrCard.addEventListener("mousemove", (e) => {

        const rect = qrCard.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(qrCard, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: "power2.out"
        });

    });


    qrCard.addEventListener("mouseleave", () => {

        gsap.to(qrCard, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.7,
            ease: "power3.out"
        });

    });

}

/* =========================================
   HOME PAGE ANIMATIONS
========================================= */

if (document.querySelector(".home-hero")) {

    const homeTimeline = gsap.timeline();

    homeTimeline
        .from(".hero-label", {
            y: 30,
            opacity: 0,
            duration: 0.8
        })
        .from(".hero-content h1", {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.4")
        .from(".hero-subtitle", {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, "-=0.5")
        .from(".hero-description", {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, "-=0.3")
        .from(".hero-buttons", {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, "-=0.3");


    gsap.utils.toArray(
        ".reveal-left, .reveal-right"
    ).forEach((element) => {

        gsap.from(element, {

            scrollTrigger: {
                trigger: element,
                start: "top 80%"
            },

            x: element.classList.contains("reveal-left")
                ? -80
                : 80,

            opacity: 0,

            duration: 1,

            ease: "power3.out"

        });

    });


    gsap.utils.toArray(
        ".puja-home-card, .event-preview-card"
    ).forEach((card, index) => {

        gsap.from(card, {

            scrollTrigger: {
                trigger: card,
                start: "top 85%"
            },

            y: 50,

            opacity: 0,

            duration: 0.7,

            delay: index * 0.12,

            ease: "power3.out"

        });

    });


    gsap.utils.toArray(
        ".schedule-item"
    ).forEach((item, index) => {

        gsap.from(item, {

            scrollTrigger: {
                trigger: item,
                start: "top 90%"
            },

            x: -40,

            opacity: 0,

            duration: 0.6,

            delay: index * 0.08

        });

    });


    gsap.from(".donate-banner", {

        scrollTrigger: {
            trigger: ".donate-banner",
            start: "top 80%"
        },

        scale: 0.95,

        opacity: 0,

        duration: 1,

        ease: "power3.out"

    });


    gsap.from(".contact-home-grid > div", {

        scrollTrigger: {
            trigger: ".contact-home-grid",
            start: "top 80%"
        },

        y: 40,

        opacity: 0,

        duration: 0.7,

        stagger: 0.15

    });

}

/* =========================================
   LANGUAGE SWITCHER
========================================= */

const languageButtons =
    document.querySelectorAll(".language-btn");

const translatableElements =
    document.querySelectorAll("[data-en][data-bn]");


function changeLanguage(language) {

    translatableElements.forEach((element) => {

        const text = element.dataset[language];

        if (text) {
            element.textContent = text;
        }

    });


    languageButtons.forEach((button) => {

        button.classList.toggle(
            "active",
            button.dataset.language === language
        );

    });


    localStorage.setItem(
        "preferredLanguage",
        language
    );

}


/* Button click */

languageButtons.forEach((button) => {

    button.addEventListener("click", () => {

        changeLanguage(
            button.dataset.language
        );

    });

});


/* Remember user's language */

const savedLanguage =
    localStorage.getItem("preferredLanguage");

if (savedLanguage) {

    changeLanguage(savedLanguage);

}