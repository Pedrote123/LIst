var AccountList = JSON.parse(localStorage.getItem('AccountList')) || [];

class Account{
    constructor(user, email, password){
        this.user = user;
        this.email = email;
        this.password = password;
    }
}

function CreateAccount(user, email, password){
    var CreatedAccount = new Account(user, email, password)
    AccountList.push(CreatedAccount);
    localStorage.setItem('AccountList', JSON.stringify(AccountList));
}

function DeleteAccount(account){
    AccountList.splice(AccountList.indexOf(account), 1);
    localStorage.setItem('AccountList', JSON.stringify(AccountList));
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
})
