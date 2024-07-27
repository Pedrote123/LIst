if (!AccountIsLogged){
    window.location.href = '../index.html';
}

var ProfileName = document.querySelector('.Header__MainDisplay--Container.profile h1');

ProfileName.textContent = LoggedAccount.user;

var ProfileTaskSection = document.getElementById('Profile__MainBodySection--Container_TaskList');

function TaskAddition(Task){
    
    var TaskFrame = document.createElement('li');
    var Checkbox = document.createElement('span');
    var TaskToAdd = document.createElement('p');

    ProfileTaskSection.appendChild(TaskFrame);
    TaskFrame.appendChild(Checkbox);
    TaskFrame.appendChild(TaskToAdd);

    TaskToAdd.textContent = Task;

}


for (let i = 0; i < LoggedAccount.taskList.length; i++){

    TaskAddition(LoggedAccount.taskList[i].task)
    
}