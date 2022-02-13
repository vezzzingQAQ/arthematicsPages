// ********************************************************
// V3D HUD动画：
// 进入通过CSS动画
// 退出依靠...Out函数，同时自动删除对象
// ********************************************************

var isRemovingHUD=false;//是否正在移除HUD对象，避免多次移除同一个对象
var isShowingHUD=false;//是否正在显示HUD对象，避免多层显示

/**
 * 淡出HUD屏
 * @param {HTMLElement} obj 要淡出的DOM物体
 * @param {number} time 淡出的持续时间
 */
function fadeOut(obj,time){
    let count=0;
    let fadeouti=window.setInterval(function(){
        count++;
        if(count>time || obj.style.opacity<0){
            document.querySelector(".hudLayer").removeChild(obj);
            isRemovingHUD=false;
            isShowingHUD=false;
            clearInterval(fadeouti);
        }
        obj.style.opacity=1-count/5;    
    },1);
}

/**
 * 淡出HUD屏幕，调用函数
 * @param {string} name 要淡出的对象名字
 */
function fadeOutHUD(name){
    let child=document.getElementById("t"+name);
    if(!isRemovingHUD){
        isRemovingHUD=true;
        fadeOut(child,10);
    }
}
/**
 * 控制HUD对象
 * @param {string} name 对应RoomObj的name属性，用于指定HUD屏的ID
 * @param {number} id 对应RoomObj的Type属性，用于区分不同的RoomObj类型
 * @param {{}} discribeObj 描述对象，通常传入函数对象的acobj，记录作者、日期、名字等信息
 * @param {boolean} aom 指定是移入还是移出：true->移入 ; false->移出
 */
function editHUDobject(name,id,discribeObj,aom/*true/false制定移除或插入*/){
    if(!isShowingHUD){
        
    }
    switch(id){
        case 11://T11展示屏
            if(aom){
                if(!isShowingHUD){
                    let htmlTemp=`
                    <div id="t${name}" class="t11HUD centerHUDp">
                        <p class="author">by ${discribeObj.acobj.author}</p>
                        <br>
                        <p class="date">at ${discribeObj.acobj.date}</p>
                        <br>
                        <pre class="code">${discribeObj.toDisplayStr()}</pre>
                    </div>
                    `;
                    document.querySelector(".hudLayer").innerHTML+=htmlTemp;
                    isShowingHUD=true;
                }
            }else{
                fadeOutHUD(name);
            }
            break;
        case 21://T21展示柜
            if(aom){
                if(!isShowingHUD){
                    let htmlTemp=`
                    <div id="t${name}" class="t21HUD centerHUDp">
                        <p class="author">by ${discribeObj.acobj.author}</p>
                        <br>
                        <p class="date">at ${discribeObj.acobj.date}</p>
                        <br>
                        <pre class="code">${discribeObj.toDisplayStr()}</pre>
                    </div>
                    `;
                    document.querySelector(".hudLayer").innerHTML+=htmlTemp;
                    isShowingHUD=true;
                }
            }else{
                fadeOutHUD(name);
            }
            break;
    }
}