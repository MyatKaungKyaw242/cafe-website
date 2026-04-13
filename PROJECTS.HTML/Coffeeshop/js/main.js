const menu = document.querySelector("#hamburger");
const navLinks = document.querySelector(".nav-links");

menu.addEventListener("click",()=>{
 navLinks.classList.toggle("show")

 
 if(navLinks.classList.contains("show")){
    menu.src = "./coffee_images/close-icon.svg"
 }else{
    menu.src = "./coffee_images/three-horizontal-lines-icon.svg"
 }
})
