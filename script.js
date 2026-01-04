
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector(".nav");

function checkScreenSize() {
  if(window.innerWidth > 768){
    nav.classList.remove("active");
    hamburger.classList.remove("open");
    nav.style.display = "flex";
  } else {
    nav.style.display = "none";
  }
}

checkScreenSize();
window.addEventListener("resize", checkScreenSize);

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
  hamburger.classList.toggle("open");
  if(nav.classList.contains("active")){
    nav.style.display = "flex";
  } else {
    nav.style.display = "none";
  }
});


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if(window.scrollY >= section.offsetTop - 200){
      current = section.id;
    }
  });
  navLinks.forEach(link=>{
    link.classList.remove("active");
    if(link.getAttribute("href")==="#"+current) link.classList.add("active");
  });

});
