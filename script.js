var UnfinishedTasks = JSON.parse(localStorage.getItem('Unfinished_Tasks')) || [];
console.log(UnfinishedTasks)
var FinishedTasks = JSON.parse(localStorage.getItem('Finished_Tasks')) || [];



document.addEventListener('DOMContentLoaded', ()=>{
    Load_Page();
})


function Load_Page(){
    Load_UnfinishedTasks();

    Load_PageFunctions();
};


function Load_UnfinishedTasks(){
    for (let i = 0; i < UnfinishedTasks.length; i++){
        var UnfinishedTasks_List_Item = document.createElement('li');
        document.querySelector('.Unfinished_Tasks').appendChild(UnfinishedTasks_List_Item);

        var UnfinishedTasks_List_Item_Checkbox = document.createElement('input');
        UnfinishedTasks_List_Item_Checkbox.type = 'checkbox';
        UnfinishedTasks_List_Item.appendChild(UnfinishedTasks_List_Item_Checkbox);

        UnfinishedTasks_List_Item.innerHTML = UnfinishedTasks_List_Item.innerHTML + UnfinishedTasks[i];
    }
};

function Load_PageFunctions(){

    Load_SlideMenu_Functions();

    document.getElementById('NavBar_NewTaskButton').addEventListener('click', (e)=>{
        e.stopPropagation();
        Create_NewTask_Function();
    });

    Delete_Task_Function();
}


function Load_SlideMenu_Functions(){
    document.getElementById('NavBar_SideMenuIcon').addEventListener('click', (e)=>{
        e.stopPropagation();
        Load_SlideMenu_ClickFunction();
    });

    Load_SlideMenu_DragFunction();
}


function Create_NewTask_Function(){

    var NewTask_InputDisplay = null;
    var NewTask_InputDisplay_ScreenFilter = null;

    if (!NewTask_InputDisplay){
        Display_NewTask_InputScreen(NewTask_InputDisplay, NewTask_InputDisplay_ScreenFilter);

        NewTask_InputDisplay = document.getElementById('NewTask_InputDisplay');
        NewTask_InputDisplay_ScreenFilter = document.getElementById('NewTask_InputDisplay_ScreenFilter');

        var Remove_NewTask_InputDisplay = function(){

            var InputDisplay_LeftBorder = NewTask_InputDisplay.offsetLeft;
            var InputDisplay_RightBorder = InputDisplay_LeftBorder + NewTask_InputDisplay.offsetWidth;
            var InputDisplay_TopBorder = NewTask_InputDisplay.offsetTop;
            var InputDisplay_BottomBorder = InputDisplay_TopBorder + NewTask_InputDisplay.offsetHeight;

            document.addEventListener('click', (e)=>{
                e.stopPropagation();

                if ((InputDisplay_RightBorder < e.clientX || e.clientX < InputDisplay_LeftBorder || InputDisplay_TopBorder > e.clientY || e.clientY > InputDisplay_BottomBorder) && NewTask_InputDisplay){
                    document.body.removeChild(NewTask_InputDisplay);
                    NewTask_InputDisplay = null;

                    document.body.removeChild(NewTask_InputDisplay_ScreenFilter);
                    NewTask_InputDisplay_ScreenFilter = null;
                }
            });
        }
        Remove_NewTask_InputDisplay();

        Submit_NewTask();
    }
}

function Display_NewTask_InputScreen(NewTask_InputDisplay, NewTask_InputDisplay_ScreenFilter){
    NewTask_InputDisplay = document.createElement('div');
    NewTask_InputDisplay.id = 'NewTask_InputDisplay';
    document.body.appendChild(NewTask_InputDisplay);

    NewTask_InputDisplay_ScreenFilter = document.createElement('div');
    NewTask_InputDisplay_ScreenFilter.id = 'NewTask_InputDisplay_ScreenFilter';
    document.body.appendChild(NewTask_InputDisplay_ScreenFilter);

    var NewTask_Form = document.createElement('form');
    NewTask_Form.id = 'NewTask_Form';
    NewTask_InputDisplay.appendChild(NewTask_Form);

    var NewTask_Text = document.createElement('input');
    NewTask_Text.type = 'text';
    NewTask_Text.id = 'NewTask_Text';
    NewTask_Text.placeholder = 'Introduce your task';
    NewTask_Text.required = true;
    NewTask_Form.appendChild(NewTask_Text);

    // var NewTask_Date = document.createElement('input');
    // NewTask_Date.type = 'date';
    // NewTask_Date.id = 'NewTask_Date';
    // NewTask_Date.required = true;
    // NewTask_Form.appendChild(NewTask_Date);

    var NewTask_Submit = document.createElement('input');
    NewTask_Submit.type = 'submit';
    NewTask_Submit.id = 'NewTask_Submit';
    NewTask_Submit.value = 'Submit';
    NewTask_Form.appendChild(NewTask_Submit);
}

function Submit_NewTask(){
    document.getElementById('NewTask_Form').addEventListener('submit', (e)=>{
        e.preventDefault();

        alert('New task added');

        var NewTask = document.getElementById('NewTask_Text').value;

        document.getElementById('NewTask_Text').value = '';

        UnfinishedTasks.push(NewTask);
        localStorage.setItem('Unfinished_Tasks', JSON.stringify(UnfinishedTasks));

        setTimeout(()=>{location.reload()}, 2000)
    })
};

function Delete_Task_Function(){
    var TaskClicked_Interval;
    var TaskClicked_Interval_Time = 0;

    var TouchORClick_HoldFunction = function(TaskClicked){
        TaskClicked_Interval = setInterval(()=>{
            TaskClicked_Interval_Time += 100;

            if (TaskClicked_Interval_Time >= 1000){
                Create_DeleteTask_Function(TaskClicked);

                clearInterval(TaskClicked_Interval);

                TaskClicked_Interval_Time = 0;
            };
        }, 100);
    }

    for (let i = 0; i < document.querySelectorAll('.Unfinished_Tasks li').length; i++){

        if (screen.width < '800'){
            document.querySelectorAll('.Unfinished_Tasks li')[i].addEventListener('touchstart', (e)=>{
                e.stopPropagation();
                
                TouchORClick_HoldFunction(document.querySelectorAll('.Unfinished_Tasks li')[i].textContent);
            });
            document.querySelectorAll('.Unfinished_Tasks li')[i].addEventListener('touchend', (e)=> {
                e.stopPropagation();

                clearInterval(TaskClicked_Interval);
                TaskClicked_Interval_Time = 0;
            });

        } else {
            document.querySelectorAll('.Unfinished_Tasks li')[i].addEventListener('mousedown', (e)=>{
                e.stopPropagation();
                
                TouchORClick_HoldFunction(document.querySelectorAll('.Unfinished_Tasks li')[i].textContent);
            });
            document.querySelectorAll('.Unfinished_Tasks li')[i].addEventListener('mouseup', (e)=> {
                e.stopPropagation();

                clearInterval(TaskClicked_Interval);
                TaskClicked_Interval_Time = 0;
            });
        }

    };
};

function Create_DeleteTask_Function(TaskClicked){

    var DeleteTask_Display = document.getElementById('DeleteTask_Display');
    var DeleteTask_Display_Filter = document.getElementById('DeleteTask_Display_Filter');


    if (!DeleteTask_Display){
        Display_DeleteTask(TaskClicked, DeleteTask_Display, DeleteTask_Display_Filter);

        DeleteTask_Display = document.getElementById('DeleteTask_Display');
        DeleteTask_Display_Filter = document.getElementById('DeleteTask_Display_Filter');

        var Remove_DeleteTask_InputDisplay = function(){

            var DeleteTask_Display_LeftBorder = DeleteTask_Display.offsetLeft;
            var DeleteTask_Display_RightBorder = DeleteTask_Display_LeftBorder + DeleteTask_Display.offsetWidth;
            var DeleteTask_Display_TopBorder = DeleteTask_Display.offsetTop;
            var DeleteTask_Display_BottomBorder = DeleteTask_Display_TopBorder + DeleteTask_Display.offsetHeight;

            document.addEventListener('click', (e)=>{
                e.stopPropagation();

                if ((DeleteTask_Display_RightBorder < e.clientX || e.clientX < DeleteTask_Display_LeftBorder || DeleteTask_Display_TopBorder > e.clientY || e.clientY > DeleteTask_Display_BottomBorder) && document.getElementById('DeleteTask_Display')){
                    document.body.removeChild(document.getElementById('DeleteTask_Display'));
                    DeleteTask_Display = null;

                    document.body.removeChild(document.getElementById('DeleteTask_Display_Filter'));
                    DeleteTask_Display_Filter = null;
                    removeEventListener('click', e)
                }
            });
        }
        Remove_DeleteTask_InputDisplay();
    }

};

function Display_DeleteTask(TaskClicked, DeleteTask_Display, DeleteTask_Display_Filter){
    DeleteTask_Display = document.createElement('div');
    DeleteTask_Display.id = 'DeleteTask_Display';
    document.body.appendChild(DeleteTask_Display);

    DeleteTask_Display_Filter = document.createElement('span');
    DeleteTask_Display_Filter.id = 'DeleteTask_Display_Filter';
    document.body.appendChild(DeleteTask_Display_Filter);

    var DeleteTask_Display_Text = document.createElement('div');
    DeleteTask_Display_Text.id = 'DeleteTask_Display_Text';
    DeleteTask_Display_Text.textContent = 'Delete task?';
    DeleteTask_Display.appendChild(DeleteTask_Display_Text);

    var DeleteTask_Display_Buttons = document.createElement('div');
    DeleteTask_Display_Buttons.id = 'DeleteTask_Display_Buttons';
    DeleteTask_Display.appendChild(DeleteTask_Display_Buttons);

    var DeleteTask_Display_ButtonYes = document.createElement('span');
    DeleteTask_Display_ButtonYes.textContent = 'Yes';
    DeleteTask_Display_Buttons.appendChild(DeleteTask_Display_ButtonYes);

    var DeleteTask_Display_ButtonNo = document.createElement('span');
    DeleteTask_Display_ButtonNo.textContent = 'No';
    DeleteTask_Display_Buttons.appendChild(DeleteTask_Display_ButtonNo);


    var ButtonClick_Function = function(){
        DeleteTask_Display_ButtonYes.addEventListener('click', (e)=>{
            e.stopPropagation();

            var TaskToDelete = UnfinishedTasks.indexOf(TaskClicked);
            UnfinishedTasks.splice(TaskToDelete, 1);

            localStorage.setItem('Unfinished_Tasks', JSON.stringify(UnfinishedTasks))
            location.reload();
        });

        DeleteTask_Display_ButtonNo.addEventListener('click', (e)=>{
            e.stopPropagation();

            document.body.removeChild(DeleteTask_Display);
            DeleteTask_Display = null;

            document.body.removeChild(DeleteTask_Display_Filter);
            DeleteTask_Display_Filter = null;
        });
    }
    setTimeout(ButtonClick_Function, 100)

}