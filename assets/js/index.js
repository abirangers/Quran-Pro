
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

        // arrow.addEventListener('mousedown', mousedown);

        // function mousedown(){
        //     arrow.addEventListener('mousemove', mousemove);
        //     arrow.addEventListener('mouseup', mouseup);
            
        //     function mousemove(e) {

        //         let x = e.clientX - 100 + 'px';
        //         let y = e.clientY - 100 + 'px';
        //         this.style.left = x;
        //         this.style.top = y;
        //     }


        
        //     function mouseup() {
        //         arrow.removeEventListener('mousemove', mousemove);
        //     }

        //  }


}
arrowBtn();
