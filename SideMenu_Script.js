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
        
        if(screen.width >= 800){
            document.getElementById('MainContent_Container').parentNode.insertBefore(SideMenu, document.getElementById('MainContent_Container'));
        }
    
        SideMenu_ScreenFilter = document.createElement('span');
        SideMenu_ScreenFilter.id = 'SideMenu_ScreenFilter';
        document.body.appendChild(SideMenu_ScreenFilter);
    };
    Create_SideMenuANDFilter();


    Create_SideMenuButtons = function(){

        var SideMenu_Home_AcomplishedTasks_StadisticsANDHelp = document.createElement('div');
        SideMenu_Home_AcomplishedTasks_StadisticsANDHelp.id = 'SideMenu_Home_AcomplishedTasks_StadisticsANDHelp';
        SideMenu.appendChild(SideMenu_Home_AcomplishedTasks_StadisticsANDHelp);

        var SideMenu_Logo = document.createElement('span');
        SideMenu_Logo.id = 'SideMenu_Logo';
        SideMenu_Home_AcomplishedTasks_StadisticsANDHelp.appendChild(SideMenu_Logo);

        if (screen.width >= 800){
            SideMenu_Logo.style.display = 'flex';
        }

        var SideMenu_Home_Button = document.createElement('span');
        SideMenu_Home_Button.id = 'SideMenu_Home_Button';
        SideMenu_Home_Button.textContent = 'Home';
        SideMenu_Home_AcomplishedTasks_StadisticsANDHelp.appendChild(SideMenu_Home_Button);
        SideMenu_Home_Button.addEventListener('click', (e)=>{
            e.stopPropagation();
            Load_HomeScreen();
        });

        var SideMenu_AcomplishedTasks_Button = document.createElement('span');
        SideMenu_AcomplishedTasks_Button.id = 'SideMenu_AcomplishedTasks_Button';
        SideMenu_AcomplishedTasks_Button.textContent = 'Acomplished tasks';
        SideMenu_Home_AcomplishedTasks_StadisticsANDHelp.appendChild(SideMenu_AcomplishedTasks_Button);

        SideMenu_AcomplishedTasks_Button.addEventListener('click', (e)=>{
            e.stopPropagation();

            Remove_HomeScreen();
            
            Load_Tasks('Finished', FinishedTasks);
            
            Delete_Task_Function('Finished');
        });

        var SideMenu_Stadistics_Button = document.createElement('span');
        SideMenu_Stadistics_Button.id = 'SideMenu_Stadistics_Button';
        SideMenu_Stadistics_Button.textContent = 'Stadistics';
        SideMenu_Home_AcomplishedTasks_StadisticsANDHelp.appendChild(SideMenu_Stadistics_Button);

        SideMenu_Stadistics_Button.addEventListener('click', (e)=>{
            e.stopPropagation();
            Remove_HomeScreen();
            Load_StadisticsScreen();
        });

        var SideMenu_Help_Button = document.createElement('span');
        SideMenu_Help_Button.id = 'SideMenu_Help_Button';
        SideMenu_Help_Button.textContent = 'Help';
        SideMenu_Home_AcomplishedTasks_StadisticsANDHelp.appendChild(SideMenu_Help_Button);

        SideMenu_Help_Button.addEventListener('click', (e)=>{
            e.stopPropagation();
            Remove_HomeScreen();
            Load_HelpScreen();
        });
    };
    Create_SideMenuButtons();
}


function Load_SlideMenu_DragFunction(){
    var InitialX;
    var FinalX;

    var MouseHoldInterval;
    var MouseHoldInterval_Time = 0;

    Load_SlideMenu_DragFunction_Mobile(InitialX, FinalX, MouseHoldInterval, MouseHoldInterval_Time);
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

function Remove_HomeScreen(){
    var MainContent_Container = document.getElementById('MainContent_Container');

    for (let i = MainContent_Container.childNodes.length - 1; i >= 0; i--){
        MainContent_Container.removeChild(MainContent_Container.childNodes[i]);
    }

    // for (let i = 0; i < MainContent_Container.childNodes.length; i++){
    //     console.log(MainContent_Container.childNodes[i])

    //     if (MainContent_Container.childNodes[i].classList.contains('Unfinished_Tasks')){
    //         document.querySelector('.Unfinished_Tasks').remove()
    //     }
    // }
}