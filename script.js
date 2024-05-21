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

    Create_NewTask_Function();
}

function Load_SlideMenu_Functions(){
    document.getElementById('NavBar_SideMenuIcon').addEventListener('click', (e)=>{
        e.stopPropagation();
        Load_SlideMenu_ClickFunction();
    });

    Load_SlideMenu_DragFunction();
}

function Load_SlideMenu_ClickFunction(){
    var SideMenu = null;
    var SideMenu_ScreenFilter = null;

    if (!SideMenu){
        SideMenu = document.createElement('div');
        SideMenu.id = 'SideMenu';
        document.body.appendChild(SideMenu);

        SideMenu_ScreenFilter = document.createElement('span');
        SideMenu_ScreenFilter.id = 'SideMenu_ScreenFilter';
        document.body.appendChild(SideMenu_ScreenFilter);

        //Clarify this mess
        var Remove_SideMenu = function(){
            document.addEventListener('click', (e)=>{
                e.stopPropagation();

                if (!(e.target == SideMenu)){
                    if (SideMenu){
                        SideMenu.classList.add('Removing');

                        setTimeout(()=>{
                            document.body.removeChild(SideMenu);
                            SideMenu = null;
                        }, 500)

                        setTimeout(()=>{
                            document.body.removeChild(SideMenu_ScreenFilter);
                            SideMenu_ScreenFilter = null;
                        }, 300)
                    }
                }
            })
        };
        setTimeout(()=>{
            Remove_SideMenu();
        }, 100)
    }
}

function Load_SlideMenu_DragFunction(){
    var InitialX;
    var FinalX;

    var MouseHoldInterval;
    var MouseHoldInterval_Time = 0;

    document.addEventListener('pointerdown', (e)=>{
        e.stopPropagation();

        InitialX = e.clientX;

        if (InitialX < 200){
            MouseHoldInterval = setInterval(()=>{
                MouseHoldInterval_Time += 100;
            }, 100)
        }
    });

    document.addEventListener('pointerup', (e)=>{
        e.stopPropagation();

        FinalX = e.clientX;

        clearInterval(MouseHoldInterval);
        
        if (MouseHoldInterval_Time > 50){
            if ((FinalX - InitialX) > 50){
                Load_SlideMenu_ClickFunction();
            }
        }

        MouseHoldInterval_Time = 0;
    })

}

function Create_NewTask_Function(){
    document.getElementById('NavBar_NewTaskButton').addEventListener('click', ()=>{
        var Display_NewTaskInputScreen = function(){}
    });
}
