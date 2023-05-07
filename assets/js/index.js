
const btn = document.querySelector('button');
btn.addEventListener("click", function () {
    navigasiBar = document.querySelector("nav");
    navigasiBar.classList.toggle("aktif");
});

function arrowBtn() {
    var arrow = document.querySelector("#arrow");
    window.addEventListener("scroll", function () {
        arrow.classList.toggle("scrolled", window.scrollY > 500);
    });
}
arrowBtn();
