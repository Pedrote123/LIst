var AccountIsLogged = JSON.parse(localStorage.getItem('AccountIsLogged')) || false;
var LoggedAccount = JSON.parse(localStorage.getItem('LoggedAccount')) || 'no-loggedUser';

var HelpButton = document.querySelectorAll('.Header__NavBar--List_Help');
var HomeButton = document.querySelectorAll(".Header__NavBar--List_Title");
var NavBarSignInButton = document.querySelectorAll('.Header__NavBar--List_SignIn');
var NavBarSignUpButton = document.querySelectorAll('.Header__NavBar--List_SignUp');
var LogOutButton = document.querySelectorAll('.Header__NavBar--List_LogOut');
var ProfileButton = document.querySelectorAll('.Header__NavBar--List_Profile');
var AddTaskButton = document.querySelectorAll('.Header__NavBar--List_TaskAddition');

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

    RedirectionButtonFunction(HelpButton, 'Sub-Pages/help.html');

    RedirectionButtonFunction(HomeButton, 'index.html');

    RedirectionButtonFunction(NavBarSignUpButton, 'Sub-Pages/SignUp.html');

    RedirectionButtonFunction(NavBarSignInButton, 'Sub-Pages/SignIn.html');

    RedirectionButtonFunction(ProfileButton, 'Sub-Pages/profile.html')

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
        });

        AddTaskButton.forEach((i)=>{
            i.removeAttribute('hidden');

            i.addEventListener('click', NewTaskInput);
        });
    }
};


function NewTaskInput(){

    var Frame = document.createElement('form');
    var FrameBackgroundFilter = document.createElement('div');
    var TaskDescription = document.createElement('input');
    var SubmitNewTaskButton = document.createElement('input');

    TaskDescription.type = 'text';
    SubmitNewTaskButton.type = 'submit';

    TaskDescription.placeholder = 'Your task';
    SubmitNewTaskButton.value = 'Add new task';

    Frame.id = 'NewTask_Frame';
    FrameBackgroundFilter.id = 'NewTask_FrameBackgroundFilter';

    Frame.appendChild(TaskDescription);
    Frame.appendChild(SubmitNewTaskButton);
    document.body.appendChild(Frame);
    document.body.appendChild(FrameBackgroundFilter)

    var TaskSubmit = function (event){

        if (TaskDescription.value != ''){

            var CreatedTask = new Task(TaskDescription.value, 'Unfinished');

            LoggedAccount.taskList.push(CreatedTask);
            localStorage.setItem('LoggedAccount', JSON.stringify(LoggedAccount));
    
            AccountList[AccountList.indexOf(LoggedAccount) + 1].taskList.push(CreatedTask);
            localStorage.setItem('AccountList', JSON.stringify(AccountList));
    
            alert('Task added!');
    
            setTimeout(()=>{
                window.location.reload();
            }, 200);
        } else{
            alert("Task can't be empty")
        }

    };

    Frame.addEventListener('submit', (e)=>{

        e.preventDefault();

        TaskSubmit(e);
    });
    

    var ClickDetection = function (event){

        if (event.target != Frame && event.target != TaskDescription && event.target != SubmitNewTaskButton){
            Frame.remove();
            FrameBackgroundFilter.remove();

            document.removeEventListener('click', ClickDetection);
        }

    }

    setTimeout(()=>{
        document.addEventListener('click', ClickDetection);
    }, 100)

};