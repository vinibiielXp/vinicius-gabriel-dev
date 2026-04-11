// MENU MOBILE
const btn = document.getElementById('menu-btn')
const nav = document.getElementById('nav')

btn.addEventListener('click',()=>{
nav.classList.toggle('active')
})


// LOADING (CORRIGIDO)
window.addEventListener('load', () => {
document.getElementById('loader').style.display = 'none'
})


// SCROLL ANIMATION
const reveals = document.querySelectorAll('.reveal')

window.addEventListener('scroll', ()=>{

reveals.forEach(el => {

const windowHeight = window.innerHeight
const elementTop = el.getBoundingClientRect().top
const visible = 100

if(elementTop < windowHeight - visible){
el.classList.add('active')
}

})

})


// DARK / LIGHT MODE
const themeBtn = document.getElementById('theme-toggle')

themeBtn.addEventListener('click',()=>{

document.body.classList.toggle('light')

const icon = themeBtn.querySelector("i")

if(document.body.classList.contains("light")){
icon.classList.remove("fa-moon")
icon.classList.add("fa-sun")
}else{
icon.classList.remove("fa-sun")
icon.classList.add("fa-moon")
}

})

const words = [
"Full Stack",
"Backend",
"Frontend",
"Node.js",
"JavaScript"
]

let wordIndex = 0
let charIndex = 0
let isDeleting = false

const typing = document.querySelector(".typing")

function type(){

const current = words[wordIndex]

if(isDeleting){
charIndex--
}else{
charIndex++
}

typing.textContent = current.substring(0, charIndex)

let speed = isDeleting ? 50 : 100

if(!isDeleting && charIndex === current.length){
speed = 1200
isDeleting = true
}

else if(isDeleting && charIndex === 0){
isDeleting = false
wordIndex++

if(wordIndex === words.length){
wordIndex = 0
}
}

setTimeout(type, speed)
}

type()