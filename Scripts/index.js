document.addEventListener('DOMContentLoaded', ()=>{ 

    document.querySelector('.Header__NavBar--List_Help').addEventListener('click', ()=>{
        window.location.href = 'Sub-Pages/help.html';
    });

    var notMainPageLogo = document.querySelectorAll(".Header__NavBar--List_Title.notMainPage");

    for (let i = 0; i < notMainPageLogo.length; i++){
        notMainPageLogo[i].addEventListener('click', ()=>{
            window.location.href = '../index.html'
        });
    }
})