var AccountIsLogged = JSON.parse(localStorage.getItem('AccountIsLogged')) || false;
var LoggedAccount = JSON.parse(localStorage.getItem('LoggedAccount')) || 'no-loggedUser';

document.addEventListener('DOMContentLoaded', ()=>{ 

    ButtonsBehavior();
    
    LoggedAccountCheck();
});

function ButtonsBehavior(){   

    document.querySelector('.Header__NavBar--List_Help').addEventListener('click', ()=>{
        window.location.href = 'Sub-Pages/help.html';
    });



    var notMainPageLogo = document.querySelectorAll(".Header__NavBar--List_Title.notMainPage");

    for (let i = 0; i < notMainPageLogo.length; i++){
        notMainPageLogo[i].addEventListener('click', (e)=>{
            window.location.href = '../index.html'
        });
    }
};


function LoggedAccountCheck(){
    
    var NavBarSignInButton = document.querySelectorAll('.Header__NavBar--List_SignIn');
    var NavBarSignUpButton = document.querySelectorAll('.Header__NavBar--List_SignUp');
    var LogOutButton = document.querySelectorAll('.Header__NavBar--List_LogOut');

    if (!AccountIsLogged){
        
        NavBarSignInButton.forEach((i)=>{
            i.removeAttribute('hidden');

            i.addEventListener('click', ()=>{

                if (i.classList.contains('mainPage')){
                    window.location.href = 'Sub-Pages/SignIn.html';
                } else{
                    window.location.href = '../Sub-Pages/SignIn.html';
                }
            });
        });

        NavBarSignUpButton.forEach((i)=>{
            i.removeAttribute('hidden');

            i.addEventListener('click', ()=>{

                if (i.classList.contains('mainPage')){
                    window.location.href = 'Sub-Pages/SignUp.html';
                } else{
                    window.location.href = '../Sub-Pages/SignUp.html';
                }
            });
        });

        LogOutButton.forEach((i)=>{
            i.hidden = true;
        });

    } else {

        LogOutButton.forEach((i)=>{
            i.removeAttribute('hidden');

            i.addEventListener('click', ()=>{

                console.log('puto')

                localStorage.setItem('AccountIsLogged', JSON.stringify(false));
                
                localStorage.setItem('LoggedAccount', JSON.stringify('no-loggedUser'));

                window.location.reload();

            });
        });
    }
    
};