document.addEventListener('DOMContentLoaded', ()=>{ 

    document.querySelectorAll('.Header__MainDisplay--Container_Buttons li')[0].addEventListener('click', ()=>{
        window.location.href = 'Sub-Pages/SignIn.html';
    })

    document.querySelectorAll('.Header__MainDisplay--Container_Buttons li')[1].addEventListener('click', ()=>{
        window.location.href = 'Sub-Pages/SignIn.html';
    })

    if (AccountIsLogged){
        document.querySelector('.Header__MainDisplay--Container.mainPage h1').textContent = "Let's finish some tasks!";

        document.querySelector('.Header__MainDisplay--Container.mainPage h1').style.animation = 'writting 2s steps(23, end), blinking .75s step-end 2'

        document.querySelector('.Header__MainDisplay--Container_Buttons.mainPage').remove();
    }
})