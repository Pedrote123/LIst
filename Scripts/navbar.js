var AccountIsLogged = JSON.parse(localStorage.getItem('AccountIsLogged')) || false;
var LoggedAccount = JSON.parse(localStorage.getItem('LoggedAccount')) || 'no-loggedUser';


var NavBarSignInButton = document.querySelectorAll('.Header__NavBar--List_SignIn');
var NavBarSignUpButton = document.querySelectorAll('.Header__NavBar--List_SignUp');
var LogOutButton = document.querySelectorAll('.Header__NavBar--List_LogOut');
var ProfileButton = document.querySelectorAll('.Header__NavBar--List_Profile');


document.addEventListener('DOMContentLoaded', ()=>{ 

    ButtonsBehavior();
    
    LoggedAccountCheck();
});

function RedirectionButtonFunction(button, direction){

    button.forEach((i)=>{
    
        i.addEventListener('click', ()=>{

            if (i.classList.contains('mainPage')){
                window.location.href = direction;
            } else{
                window.location.href = `../${direction}`;
            }
        });
        
    });

}

function ButtonsBehavior(){
    
    var HelpButton = document.querySelectorAll('.Header__NavBar--List_Help');

    RedirectionButtonFunction(HelpButton, 'Sub-Pages/help.html');


    var HomeButton = document.querySelectorAll(".Header__NavBar--List_Title");

    RedirectionButtonFunction(HomeButton, 'index.html');

    RedirectionButtonFunction(NavBarSignUpButton, 'Sub-Pages/SignUp.html');

    RedirectionButtonFunction(NavBarSignInButton, 'Sub-Pages/SignIn.html');

};


function LoggedAccountCheck(){
    
    if (!AccountIsLogged){
        
        NavBarSignInButton.forEach((i)=>{
            i.removeAttribute('hidden');
        });

        NavBarSignUpButton.forEach((i)=>{
            i.removeAttribute('hidden');
        });

        LogOutButton.forEach((i)=>{
            i.hidden = true;
        });

        ProfileButton.forEach((i)=>{
            i.hidden = true;
        });

    } else {

        LogOutButton.forEach((i)=>{
            i.removeAttribute('hidden');

            i.addEventListener('click', ()=>{

                localStorage.setItem('AccountIsLogged', JSON.stringify(false));
                
                localStorage.setItem('LoggedAccount', JSON.stringify('no-loggedUser'));

                if (i.classList.contains('mainPage')){
                    window.location.reload();
                } else{
                    window.location.href = '../index.html';
                }

            });
        });

        ProfileButton.forEach((i)=>{
            i.removeAttribute('hidden');

            i.addEventListener('click', ()=>{

                if (i.classList.contains('mainPage')){
                    window.location.href = 'Sub-Pages/profile.html';
                } else{
                    window.location.href = '../Sub-Pages/profile.html';
                }

            });
        });
    }
    
};