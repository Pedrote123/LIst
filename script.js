var UnfinishedTasks = JSON.parse(localStorage.getItem('Unfinished_Tasks')) || [];
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

        UnfinishedTasks_List_Item.innerHTML = UnfinishedTasks[i]
    }
};

function Load_PageFunctions(){

    Load_SlideMenu_Functions();

    document.getElementById('NavBar_NewTaskButton').addEventListener('click', (e)=>{
        e.stopPropagation();
        Create_NewTask_Function();
    });
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
    NewTask_Form.appendChild(NewTask_Text);

    var NewTask_Date = document.createElement('input');
    NewTask_Date.type = 'date';
    NewTask_Date.id = 'NewTask_Date';
    NewTask_Form.appendChild(NewTask_Date);

    var NewTask_Submit = document.createElement('input');
    NewTask_Submit.type = 'submit';
    NewTask_Submit.id = 'NewTask_Submit';
    NewTask_Submit.textContent = 'Submit';
    NewTask_Form.appendChild(NewTask_Submit);
}
