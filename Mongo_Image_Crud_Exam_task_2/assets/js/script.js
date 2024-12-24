const sidebar = document.getElementById('sidebar');
const aside = document.getElementById('aside');
const main = document.getElementById('main');

sidebar.addEventListener('click', (event) => {
    event.preventDefault(); 
    aside.classList.toggle('show-aside'); 
    main.classList.toggle('show-main'); 
});
