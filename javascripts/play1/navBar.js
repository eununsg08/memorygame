const navBar = document.body.querySelector('#navBar');
const navButton = document.body.querySelector('#navButton');

navButton.addEventListener("click", ()=> {
    navBar.classList.toggle("hidden");
    navBar.classList.toggle("navBar");
});