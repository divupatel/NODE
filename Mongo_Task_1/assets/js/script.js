const sidebar = document.getElementById('sidebar');
sidebar.addEventListener('click', () => {
    const aside = document.getElementById('aside');
    const main = document.getElementById('main');

    // Toggle the sidebar visibility
    aside.classList.toggle('show-aside');

    // Adjust the main content width based on sidebar visibility
    main.classList.toggle('show-main');
});