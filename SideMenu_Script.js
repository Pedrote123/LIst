function Load_SlideMenu_ClickFunction(){
    var SideMenu = null;
    var SideMenu_ScreenFilter = null;

    if (!SideMenu){

        Create_SlideMenu_Buttons(SideMenu, SideMenu_ScreenFilter);

        SideMenu = document.getElementById('SideMenu');
        SideMenu_ScreenFilter = document.getElementById('SideMenu_ScreenFilter');

    
        var Remove_SideMenu = function(){

            var SideMenuWidth = SideMenu.offsetWidth;

            document.addEventListener('click', (e)=>{
                
                e.stopPropagation();

                if (e.clientX > SideMenuWidth && SideMenu){
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
            })
        };

        setTimeout(()=>{
            Remove_SideMenu();
        }, 100)
    }
}

function Create_SlideMenu_Buttons(SideMenu, SideMenu_ScreenFilter){

    Create_SideMenuANDFilter = function(){
        SideMenu = document.createElement('div');
        SideMenu.id = 'SideMenu';
        document.body.appendChild(SideMenu);
    
        SideMenu_ScreenFilter = document.createElement('span');
        SideMenu_ScreenFilter.id = 'SideMenu_ScreenFilter';
        document.body.appendChild(SideMenu_ScreenFilter);
    };
    Create_SideMenuANDFilter();


    Create_SideMenuButtons = function(){
        var SideMenu_Home_AcomplishedTasks_StadisticsANDHelp = document.createElement('div');
        SideMenu_Home_AcomplishedTasks_StadisticsANDHelp.id = 'SideMenu_Home_AcomplishedTasks_StadisticsANDHelp';
        SideMenu.appendChild(SideMenu_Home_AcomplishedTasks_StadisticsANDHelp);

        var SideMenu_Home_Button = document.createElement('span');
        SideMenu_Home_Button.id = 'SideMenu_Home_Button';
        SideMenu_Home_Button.textContent = 'Home';
        SideMenu_Home_AcomplishedTasks_StadisticsANDHelp.appendChild(SideMenu_Home_Button);

        var SideMenu_AcomplishedTasks_Button = document.createElement('span');
        SideMenu_AcomplishedTasks_Button.id = 'SideMenu_AcomplishedTasks_Button';
        SideMenu_AcomplishedTasks_Button.textContent = 'Acomplished tasks';
        SideMenu_Home_AcomplishedTasks_StadisticsANDHelp.appendChild(SideMenu_AcomplishedTasks_Button);

        var SideMenu_Stadistics_Button = document.createElement('span');
        SideMenu_Stadistics_Button.id = 'SideMenu_Stadistics_Button';
        SideMenu_Stadistics_Button.textContent = 'Stadistics';
        SideMenu_Home_AcomplishedTasks_StadisticsANDHelp.appendChild(SideMenu_Stadistics_Button);

        var SideMenu_Help_Button = document.createElement('span');
        SideMenu_Help_Button.id = 'SideMenu_Help_Button';
        SideMenu_Help_Button.textContent = 'Help';
        SideMenu_Home_AcomplishedTasks_StadisticsANDHelp.appendChild(SideMenu_Help_Button);
    };
    Create_SideMenuButtons();
}


function Load_SlideMenu_DragFunction(){
    var InitialX;
    var FinalX;

    var MouseHoldInterval;
    var MouseHoldInterval_Time = 0;

    if (screen.width < 800){
        Load_SlideMenu_DragFunction_Mobile(InitialX, FinalX, MouseHoldInterval, MouseHoldInterval_Time);
    } else {
        Load_SlideMenu_DragFunction_Computer(InitialX, FinalX, MouseHoldInterval, MouseHoldInterval_Time);
    }  
}

function Load_SlideMenu_DragFunction_Mobile(InitialX, FinalX, MouseHoldInterval, MouseHoldInterval_Time){
    document.addEventListener('touchstart', (e)=>{
        e.stopPropagation();

        if (!document.getElementById('NewTask_InputDisplay')){
            InitialX = e.touches[0].clientX;

            if (InitialX < 200){
                MouseHoldInterval = setInterval(()=>{
                    MouseHoldInterval_Time += 100;
                }, 100)
            }
        }
    });

    document.addEventListener('touchend', (e)=>{
        e.stopPropagation();

        if (!document.getElementById('NewTask_InputDisplay')){
            FinalX = e.changedTouches[0].clientX;

            clearInterval(MouseHoldInterval);
            
            if (MouseHoldInterval_Time > 50){
                if ((FinalX - InitialX) > 50){
                    Load_SlideMenu_ClickFunction();
                }
            }
    
            MouseHoldInterval_Time = 0;
        }
    })
};

function Load_SlideMenu_DragFunction_Computer(InitialX, FinalX, MouseHoldInterval, MouseHoldInterval_Time){
    document.addEventListener('mousedown', (e)=>{
        e.stopPropagation();

        if (!document.getElementById('NewTask_InputDisplay')){
            InitialX = e.clientX;

            if (InitialX < 200){
                MouseHoldInterval = setInterval(()=>{
                    MouseHoldInterval_Time += 100;
                }, 100)
            }
        }
    });

    document.addEventListener('mouseup', (e)=>{
        e.stopPropagation();
        
        if (!document.getElementById('NewTask_InputDisplay')){
            FinalX = e.clientX;

            clearInterval(MouseHoldInterval);
            
            if (MouseHoldInterval_Time > 50){
                if ((FinalX - InitialX) > 50){
                    Load_SlideMenu_ClickFunction();
                }
            }
    
            MouseHoldInterval_Time = 0;
        }
    })
}