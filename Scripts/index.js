document.addEventListener('DOMContentLoaded', ()=>{ 

    document.querySelector('.Header__NavBar--List_Help').addEventListener('click', ()=>{
        window.location.href = 'Sub-Pages/help.html';
    });

    document.querySelectorAll('#Header__MainDisplay--Container_Buttons li')[0].addEventListener('click', ()=>{
        window.location.href = 'Sub-Pages/SignIn.html';
    })

    document.querySelectorAll('#Header__MainDisplay--Container_Buttons li')[1].addEventListener('click', ()=>{
        window.location.href = 'Sub-Pages/SignIn.html';
    })

    var notMainPageLogo = document.querySelectorAll(".Header__NavBar--List_Title.notMainPage");

    for (let i = 0; i < notMainPageLogo.length; i++){
        notMainPageLogo[i].addEventListener('click', ()=>{
            window.location.href = '../index.html'
        });
    }
})