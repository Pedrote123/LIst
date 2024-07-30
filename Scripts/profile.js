if (!AccountIsLogged){
    window.location.href = '../index.html';
}

var ProfileName = document.querySelector('.Header__MainDisplay--Container.profile h1');
var CurrentTaskOptions = document.querySelectorAll('.Header__MainDisplay--Container_Buttons.profile li');

ProfileName.textContent = LoggedAccount.user;

var ProfileTaskSection = document.getElementById('Profile__MainBodySection--Container_TaskList');


function CurrentTaskOptions_Buttons(){

    CurrentTaskOptions[0].classList.add('profileButtonSelected');

    var OptionSwitching = function(event){
        CurrentTaskOptions.forEach((i)=>{
            if (i.classList.contains('profileButtonSelected')){
                i.classList.remove('profileButtonSelected');
            }
        });

        event.target.classList.add('profileButtonSelected');

        ProfileTaskSection.innerHTML = '';

        TaskAdditionFilter(event.target.textContent);
    }

    CurrentTaskOptions.forEach((i)=>{
        i.addEventListener('click', OptionSwitching);
    })

}

CurrentTaskOptions_Buttons();

function TaskAddition(Task, Status){
    
    var TaskFrame = document.createElement('li');
    var Checkbox = document.createElement('span');
    var TaskToAdd = document.createElement('p');
    var TaskDeletionCan = document.createElement('span');

    if (Status == 'Finished'){
        Checkbox.classList.add('Task_Checked');
    }

    ProfileTaskSection.appendChild(TaskFrame);
    TaskFrame.appendChild(Checkbox);
    TaskFrame.appendChild(TaskToAdd);
    TaskFrame.appendChild(TaskDeletionCan);

    TaskToAdd.textContent = Task;

    TaskDeletionCan.id = 'TaskDeletionCan'

}

function TaskAdditionFilter(Status){

    LoggedAccount.taskList.forEach((i)=>{

        if (i.status == Status){
            TaskAddition(i.task, i.status)
        }

    });

    ProfileTaskSection.childNodes.forEach((i)=>{
        i.addEventListener('click', TaskClickingBehavior)
    });

}

TaskAdditionFilter('Unfinished')

function TaskClickingBehavior(e){

    var SwitchTask_FromCurrentStatus = function(Status){
                
        for (let i = 0; i < LoggedAccount.taskList.length; i++){
            
            if (LoggedAccount.taskList[i].task == e.target.parentNode.childNodes[1].textContent){
                LoggedAccount.taskList[i].status = Status;
                localStorage.setItem('LoggedAccount', JSON.stringify(LoggedAccount));

                AccountList[AccountList.indexOf(LoggedAccount) + 1].taskList[i].status = Status;
                localStorage.setItem('AccountList', JSON.stringify(AccountList));
            }
        }
    };

    
    if (e.target.tagName == 'SPAN' && e.target.id != 'TaskDeletionCan'){

        if (CurrentTaskOptions[0].classList.contains('profileButtonSelected')){
            
            e.target.classList.add('Task_Checked');

            SwitchTask_FromCurrentStatus('Finished');

            setTimeout(()=>{
                e.target.parentNode.remove();
            }, 500);

        } else if (CurrentTaskOptions[1].classList.contains('profileButtonSelected')){

            e.target.classList.remove('Task_Checked');

            SwitchTask_FromCurrentStatus('Unfinished');

            setTimeout(()=>{
                e.target.parentNode.remove();
            }, 500);
        }
    } else if (e.target.tagName == 'P'){

        TaskText_Showing(e.target.textContent);

    } else if (e.target.id == 'TaskDeletionCan'){

        DeleteTask(e.target)

    }
}

function TaskText_Showing(Text){

    var Frame = document.createElement('div');
    var FrameBackgroundFilter = document.createElement('div');
    var TaskDescription = document.createElement('p');

    TaskDescription.textContent = Text;

    Frame.id = 'TaskText_Frame';
    FrameBackgroundFilter.id = 'FrameBackgroundFilter';

    Frame.appendChild(TaskDescription);
    document.body.appendChild(Frame);
    document.body.appendChild(FrameBackgroundFilter)

    var ClickDetection = function (event){

        if (event.target != Frame && event.target != TaskDescription){
            Frame.remove();
            FrameBackgroundFilter.remove();

            document.removeEventListener('click', ClickDetection);
        }

    }

    setTimeout(()=>{
        document.addEventListener('click', ClickDetection);
    }, 100)
}

function DeleteTask(e){

    for (let i = 0; i < LoggedAccount.taskList.length; i++){
        if (LoggedAccount.taskList[i].task == e.parentNode.childNodes[1].textContent){

            LoggedAccount.taskList.splice(i, 1);
            localStorage.setItem('LoggedAccount', JSON.stringify(LoggedAccount));

            AccountList[AccountList.indexOf(LoggedAccount) + 1].taskList.splice(i, 1);
            localStorage.setItem('AccountList', JSON.stringify(AccountList));

            alert('Task deleted');

            setTimeout(()=>{
                e.parentNode.remove();

                window.location.reload();
            }, 500);

            break;
        }
    }
}