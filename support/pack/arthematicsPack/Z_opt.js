function hideMBTbutton() {
    for (let bt of document.querySelectorAll(".mbtLayer .mbt_button")) {
        bt.style.transition = "0.3s ease-in-out";
        bt.style.opacity = 0;
    }
}
function showMBTbutton() {
    for (let bt of document.querySelectorAll(".mbtLayer .mbt_button")) {
        bt.style.transition = "0.3s ease-in-out";
        bt.style.opacity = 1;
    }
}

//升起loadingPan
function jumpPage(url) {
    let loadingTime = 30;
    let pcurrentTime = (+ new Date);
    let calFrameCount = 0;
    let exitInterval = window.setInterval(function () {
        let currentTime = (+ new Date);
        let deltaTime = currentTime - pcurrentTime;
        calFrameCount += deltaTime / (50 / 3);
        if (calFrameCount > loadingTime) {
            document.body.innerHTML += `<a id="jumpingAvltd" href="${url}" style="position:fixed;color:transparent"></a>`
            document.querySelector("#jumpingAvltd").click();
            window.clearInterval(exitInterval);
        } else {
            document.querySelector(".loadingLayer").style.top = -100 + (calFrameCount / loadingTime) * 100 + "vh";
            document.querySelector(".loadingLayer").style.opacity = (calFrameCount / loadingTime);
        }
        pcurrentTime = currentTime;
    })
}

//弹出上层平面GUI
function fadeInJumpPan(name, url_obj) {
    document.querySelector(".guiLayer ." + name).style.transition = "0.3s ease-in-out";
    document.querySelector(".guiLayer ." + name).style.opacity = 1;
    document.querySelector(".guiLayer ." + name).style.height = "100vh";
    window.onkeydown = function (e) {
        for (let i = 0; i < url_obj.length; i++) {
            if (e.keyCode == url_obj[i].keyCode) {
                jumpPage(url_obj[i].url);
            }
        }
    }
}

//跳出上层平面GUI
function fadeOutJumpPan(name) {
    document.querySelector(".guiLayer ." + name).style.opacity = 0;
    document.querySelector(".guiLayer ." + name).style.height = 0;
}

//页面加载完毕降下loadingPan
function fadeOutLoadingPan() {
    let loadingTime = 30;
    let pcurrentTime = (+ new Date);
    let calFrameCount = 0;
    let removeLoadingPan = window.setInterval(function () {
        let currentTime = (+ new Date);
        let deltaTime = currentTime - pcurrentTime;
        calFrameCount += deltaTime / (50 / 3);
        if (calFrameCount <= loadingTime) {
            document.querySelector(".loadingLayer").style.top = (calFrameCount / loadingTime) * 100 + "vh";
            document.querySelector(".loadingLayer").style.opacity = 1-(calFrameCount / loadingTime);
        } else {
            document.querySelector(".loadingLayer").style.top = "100vh";
            window.clearInterval(removeLoadingPan);
        }
        pcurrentTime = currentTime;
    })
}

//ESC退出触发事件
function escOut() {
    initTraggerPoint(
        51, "backPoint",
        { x: 0, z: 0, y: 0 },
        () => {
            //根据移动端和桌面端修改退出按钮的字
            if (window.innerWidth < PHONEEDGE) {
                document.querySelector(".guiLayer .exit .jumpURL p").innerHTML = "点击退出";
            } else {
                document.querySelector(".guiLayer .exit .jumpURL p").innerHTML = "按ENTER退出";
            }
            if (window.innerWidth > PHONEEDGE) {
                if (!window.hasShownLoading) {
                    window.hasShownLoading = true;
                    let intervalCount = 0;
                    let loadingTime = 45;
                    let removeLoadingPan = window.setInterval(function () {
                        intervalCount++;
                        if (intervalCount <= loadingTime) {
                            document.querySelector(".loadingLayer").style.top = (intervalCount / loadingTime) * 100 + "vh";
                        } else {
                            window.clearInterval(removeLoadingPan);
                        }
                    })
                }
            } else {
                document.querySelector(".loadingLayer").style.display = "none";
            }
            if (window.innerWidth < PHONEEDGE) {
                //隐藏class为hideInPhone的元素
                try {
                    for (let ele of document.querySelectorAll(".hideInPhone")) {
                        ele.style.display = "none";
                    }
                } catch {
                    console.log("no elements selected");
                }
                //移动端点击按钮弹出面板
                try {
                    document.querySelector(".mbtLayer .exit_button").onclick = function () {
                        if (!window.isShowingPan) {
                            window.isShowingPan = true;
                            document.querySelector(".guiLayer .exit").style.transition = "0.3s ease-in-out";
                            document.querySelector(".guiLayer .exit").style.opacity = 1;
                            document.querySelector(".guiLayer .exit").style.height = "100vh";
                            if (window.innerWidth < PHONEEDGE) {
                                hideMBTbutton();
                            }
                        } else {
                            window.isShowingPan = false;
                            document.querySelector(".guiLayer .exit").style.opacity = 0;
                            document.querySelector(".guiLayer .exit").style.height = 0;
                            if (window.innerWidth < PHONEEDGE) {
                                showMBTbutton();
                            }
                        }
                    }
                } catch {
                    console.log("window size changed")
                }
            }
            window.onkeydown = function (e) {
                //电脑端点击ESC弹出面板
                if (e.keyCode == 27) {
                    if (!window.isShowingPan) {
                        window.isShowingPan = true;
                        document.querySelector(".guiLayer .exit").style.transition = "0.3s ease-in-out";
                        document.querySelector(".guiLayer .exit").style.opacity = 1;
                        document.querySelector(".guiLayer .exit").style.height = "100vh";
                        if (window.innerWidth < PHONEEDGE) {
                            hideMBTbutton();
                        }
                    } else {
                        window.isShowingPan = false;
                        document.querySelector(".guiLayer .exit").style.opacity = 0;
                        document.querySelector(".guiLayer .exit").style.height = 0;
                        if (window.innerWidth < PHONEEDGE) {
                            showMBTbutton();
                        }
                    }
                } else if (e.keyCode == 13) {
                    if (window.isShowingPan) {
                        let intervalCount = 0;
                        let loadingTime = 45;
                        let exitInterval = window.setInterval(function () {
                            intervalCount++;
                            if (intervalCount > loadingTime) {
                                document.querySelector(".guiLayer .exit .jumpURL").click();
                                window.clearInterval(exitInterval);
                            } else {
                                document.querySelector(".loadingLayer").style.top = -100 + (intervalCount / loadingTime) * 100 + "vh";
                            }
                        })
                    }
                }
            }
        },
        () => { }, 10000
    )
}