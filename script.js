"use strict";

/*=========================================
  CIRENNE LUXURY WEBSITE
  JavaScript Part 1
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/*=========================================
 NAVIGATION
=========================================*/

const navToggle = $("#navToggle");
const mobileMenu = $("#mobileMenu");

if(navToggle && mobileMenu){

navToggle.addEventListener("click",()=>{

navToggle.classList.toggle("active");
mobileMenu.classList.toggle("active");

});

$$(".mobile-menu a").forEach(link=>{

link.addEventListener("click",()=>{

mobileMenu.classList.remove("active");
navToggle.classList.remove("active");

});

});

}

/*=========================================
 HEADER SCROLL EFFECT
=========================================*/

const header = $("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>60){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});

/*=========================================
 BACK TO TOP
=========================================*/

const backTop=$("#backToTop");

if(backTop){

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

backTop.classList.add("show");

}else{

backTop.classList.remove("show");

}

});

backTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

/*=========================================
 SCROLL REVEAL
=========================================*/

const reveals=$$(".reveal");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},

{

threshold:.15

});

reveals.forEach(item=>observer.observe(item));

});
/*=========================================
 HERO PARALLAX
=========================================*/

const hero = document.querySelector(".hero");

if(hero){

hero.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.clientX)/40;
const y=(window.innerHeight/2-e.clientY)/40;

const bottle=document.querySelector(".hero-bottle");
const glow=document.querySelector(".hero-glow");

if(bottle){

bottle.style.transform=
`translate(${x}px,${y}px)`;

}

if(glow){

glow.style.transform=
`translate(${x/2}px,${y/2}px)`;

}

});

}

/*=========================================
 MAGNETIC BUTTONS
=========================================*/

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("mousemove",(e)=>{

const rect=btn.getBoundingClientRect();

const x=e.clientX-rect.left-rect.width/2;

const y=e.clientY-rect.top-rect.height/2;

btn.style.transform=
`translate(${x*0.15}px,${y*0.15}px)`;

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translate(0,0)";

});

});

/*=========================================
 PRODUCT IMAGE FLOAT
=========================================*/

document.querySelectorAll(".product-image img").forEach(img=>{

let angle=0;

setInterval(()=>{

angle+=0.02;

img.style.transform=
`translateY(${Math.sin(angle)*6}px)`;

},30);

});

/*=========================================
 NUMBER COUNTER
=========================================*/

const counters=document.querySelectorAll("[data-counter]");

const counterObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

const el=entry.target;

const target=Number(el.dataset.counter);

let count=0;

const speed=target/120;

const update=()=>{

count+=speed;

if(count<target){

el.textContent=Math.floor(count);

requestAnimationFrame(update);

}else{

el.textContent=target;

}

};

update();

counterObserver.unobserve(el);

});

});

counters.forEach(c=>counterObserver.observe(c));

/*=========================================
 IMAGE FADE-IN
=========================================*/

document.querySelectorAll("img").forEach(img=>{

img.onload=()=>{

img.style.opacity="1";

};

});

/*=========================================
 PAGE LOADED
=========================================*/

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});
/*=========================================
 SCROLL PROGRESS BAR
=========================================*/

const progressBar=document.createElement("div");

progressBar.id="scroll-progress";

progressBar.style.position="fixed";
progressBar.style.top="0";
progressBar.style.left="0";
progressBar.style.height="4px";
progressBar.style.width="0%";
progressBar.style.background="linear-gradient(90deg,#B89A63,#E8D2A8)";
progressBar.style.zIndex="99999";
progressBar.style.transition="width .15s linear";

document.body.appendChild(progressBar);

window.addEventListener("scroll",()=>{

const scrollTop=window.scrollY;

const docHeight=document.documentElement.scrollHeight-window.innerHeight;

const percent=(scrollTop/docHeight)*100;

progressBar.style.width=percent+"%";

});

/*=========================================
 ACTIVE NAV LINK
=========================================*/

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

if(window.scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/*=========================================
 BUTTON RIPPLE EFFECT
=========================================*/

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

const rect=button.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.position="absolute";

ripple.style.borderRadius="50%";

ripple.style.left=e.clientX-rect.left-size/2+"px";

ripple.style.top=e.clientY-rect.top-size/2+"px";

ripple.style.background="rgba(255,255,255,.35)";

ripple.style.pointerEvents="none";

ripple.style.transform="scale(0)";

ripple.style.transition=".6s";

button.appendChild(ripple);

requestAnimationFrame(()=>{

ripple.style.transform="scale(4)";

ripple.style.opacity="0";

});

setTimeout(()=>{

ripple.remove();

},600);

});

});

/*=========================================
 PARALLAX IMAGES
=========================================*/

window.addEventListener("scroll",()=>{

document.querySelectorAll(".parallax-image img").forEach(img=>{

const speed=window.scrollY*0.15;

img.style.transform=`translateY(${speed}px)`;

});

});

/*=========================================
 CONSOLE MESSAGE
=========================================*/

console.log("%cCIRENNE","font-size:40px;color:#B89A63;font-weight:bold;");
console.log("%cLuxury Website Developed Professionally.","font-size:16px;color:#666;");
/*=========================================
  JS PART 4 - FINAL POLISH
=========================================*/

/*=========================================
 SMOOTH SCROLL LINKS
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

const target=document.querySelector(this.getAttribute("href"));

if(target){

e.preventDefault();

target.scrollIntoView({

behavior:"smooth",

block:"start"

});

}

});

});

/*=========================================
 LAZY IMAGE EFFECT
=========================================*/

const lazyImages=document.querySelectorAll("img");

const lazyObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("loaded");

lazyObserver.unobserve(entry.target);

}

});

},{threshold:.2});

lazyImages.forEach(img=>lazyObserver.observe(img));

/*=========================================
 PRODUCT HOVER GLOW
=========================================*/

document.querySelectorAll(".product-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.background=
`radial-gradient(circle at ${x}px ${y}px,
rgba(184,154,99,.15),
white 45%)`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="#fff";

});

});

/*=========================================
 PRELOADER
=========================================*/

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.remove();

},600);

}

});

/*=========================================
 PERFORMANCE
=========================================*/

window.addEventListener("resize",()=>{

document.body.classList.add("resizing");

clearTimeout(window.resizeTimer);

window.resizeTimer=setTimeout(()=>{

document.body.classList.remove("resizing");

},300);

});

/*=========================================
 COPYRIGHT YEAR
=========================================*/

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}

/*=========================================
 WELCOME
=========================================*/

console.clear();

console.log("%cCIRENNE","font-size:42px;font-weight:bold;color:#B89A63;");

console.log("%cLuxury Cosmetic Experience Loaded.","font-size:18px;color:#555;");

console.log("%cDesigned with ❤️","font-size:15px;color:#888;");
