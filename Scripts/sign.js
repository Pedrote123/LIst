var AccountList = JSON.parse(localStorage.getItem('AccountList')) || [];

var InputUsername = document.querySelector('.SignHeader__MainDisplay--Container_Form input[type="text"]');
var InputEmail = document.querySelector('.SignHeader__MainDisplay--Container_Form input[type="email"]');
var InputPassword = document.querySelector('.SignHeader__MainDisplay--Container_Form input[type="password"]');
var SignButtton = document.querySelector('.SignHeader__MainDisplay--Container_Form input[type="submit"]');

class Account{
    constructor(user, email, password){
        this.user = user;
        this.email = email;
        this.password = password;
        this.taskList = [];
    }
}

class Task{
    constructor(task, status){
        this.task = task;
        this.status = status;
    }
}

function CreateAccount(user, email, password){
    var CreatedAccount = new Account(user, email, password)
    AccountList.push(CreatedAccount);
    localStorage.setItem('AccountList', JSON.stringify(AccountList));
}

for (let i = 0; i < AccountList.length; i++){
    if (!AccountList[i].user == 'Admin'){
        CreateAccount('Admin', 'Admin@gmail.com', 'Admin123');
    }
}

var newtask = new Task('Comer caca', 'Unfinished')

LoggedAccount.taskList.push(newtask)

function DeleteAccount(account){
    AccountList.splice(AccountList.indexOf(account), 1);
    localStorage.setItem('AccountList', JSON.stringify(AccountList));
}

function SignUp(username, email, password){

    var IsAnyFieldEmpty;
    var TheAccountExist;

    var CheckEmptyFields = function (){
        if (username == '' || email == '' || password == ''){
            IsAnyFieldEmpty = true;

            alert('Fill all the fields');
        }
    };
    CheckEmptyFields();

    var CheckIfAccountExists = function (){
        for (let i = 0; i < AccountList.length; i++){
            if (AccountList[i].user == username){
                alert('Username already taken');
                TheAccountExist = true;
                break;
            } else if (AccountList[i].email == email){
                alert('This email has already an account');
                TheAccountExist = true;
                break;
            }
        }
    }
    CheckIfAccountExists();

    if (!IsAnyFieldEmpty && !TheAccountExist){
        CreateAccount(username, email, password);

        InputUsername.value = '',
        InputEmail.value = '';
        InputPassword.value = '';

        localStorage.setItem('AccountIsLogged', JSON.stringify(true));

        localStorage.setItem('LoggedAccount', JSON.stringify(AccountList[AccountList.length - 1]));

        window.location.href = '../index.html';
    }
}

function SignIn(username, password){

    var IsAnyFieldEmpty;

    var CheckEmptyFields = function (){
        if (username == '' || password == ''){

            IsAnyFieldEmpty = true;

            alert('Fill all the fields');
        }
    };
    CheckEmptyFields();

    var CheckIfAccountExists = function (){
        for (let i = 0; i < AccountList.length; i++){
            if ((AccountList[i].user == username || AccountList[i].email == username) && AccountList[i].password == password){
                
                localStorage.setItem('AccountIsLogged', JSON.stringify(true));

                localStorage.setItem('LoggedAccount', JSON.stringify(AccountList[i]));

                window.location.href = '../index.html';
                break;

            } else if ((AccountList[i].user == username || AccountList[i].email == username) && AccountList[i].password != password){

                alert('Wrong password');

                break;

            }
        }
    }

    if (!IsAnyFieldEmpty){
        CheckIfAccountExists();
    }

}

document.addEventListener('DOMContentLoaded', ()=>{
    var Go_OtherSignOptionButton = document.querySelector('.SignHeader__MainDisplay--Container_Form input[type="button"]');
    
    Go_OtherSignOptionButton.addEventListener('click', ()=>{
        if (Go_OtherSignOptionButton.value == 'Sign in'){
            window.location.href = '../Sub-Pages/SignIn.html';
        } else{
            window.location.href = '../Sub-Pages/SignUp.html';
        }
    });


    document.addEventListener('submit', (e)=>{
        e.preventDefault();

        if (SignButtton.value == 'Sign up'){
            SignUp(InputUsername.value, InputEmail.value, InputPassword.value);
        } else if (SignButtton.value == 'Sign in'){
            SignIn(InputUsername.value, InputPassword.value)
        }
    });
})
