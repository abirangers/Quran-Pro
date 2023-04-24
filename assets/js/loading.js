// const loadText = document.querySelector('.loading-text');
// const bg = document.querySelector('#home');

// let load = 0;
// let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
// let int;

// window.addEventListener('load', function() {
//   if (!sessionStorage.getItem('websiteOpened')) {
//     const navbar = document.querySelector('.navbar');
//     navbar.style.position = 'fixed';
//     int = setInterval(blurring, 30);
//     sessionStorage.setItem('websiteOpened', 'true');
//   }
// });

// function blurring() {
//     load++

//     if (load > 99) {
//         clearInterval(int);
//         document.body.style.overflow = 'auto';
//         loadText.style.zIndex = '-1';
//         const navbar = document.querySelector('.navbar');
//         navbar.style.position = 'fixed'; // Menetapkan posisi navbar menjadi fixed
//     } else {
//         document.body.style.overflow = 'hidden';
//         loadText.style.visibility = 'visible';
//     }
//     window.scrollTo(0, scrollTop);

//     loadText.innerText = `${load}%`;
//     loadText.style.opacity = scale(load, 0, 100, 1, 0);
//     bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;

// }

// const scale = (num, in_min, in_max, out_min, out_max) => {
//     return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
// }
