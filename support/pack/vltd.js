// ********************************************************
// V3D 执行文件：
// 玩家操作&界面渲染
// ********************************************************

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    smooth();
    class Player {
        constructor(player, objects) {
            this.x = player.startPosition.x;
            this.z = player.startPosition.z;
            this.y = player.startPosition.y + player.height / 2;

            this.height = player.height;
            this.originHeight = player.height;
            this.moveSpeed = player.moveSpeed;
            this.originMoveSpeed = player.moveSpeed;//原有speed
            this.moveHeightRange = player.moveHeightRange;
            this.bumpR = player.bumpR;
            this.objectsList = objects;

            this.isWalking = false;//是否在行走

            this.isWalkingForward = false;
            this.isWalkingBackward = false;
            this.isWalkingLeft = false;
            this.isWalkingRight = false;

            this.ud = player.ud;

            this.isMovingUpwards = false;
            this.isMovingDownwards = false;

            this.thetarw = player.thetarw;
            this.thetaeh = player.thetaeh;
        }
        _calBump(x, z, cube) {//返回x,z位置坐标的值
            //&& cube.position.y+cube.bump.size.y/2>(this.y+this.height)/2
            if (cube.hasOwnProperty("bump") && cube.bump != null) {
                let leftBound = cube.position.x - cube.bump.size.x / 2 - this.bumpR;
                let rightBound = cube.position.x + cube.bump.size.x / 2 + this.bumpR;
                let upperBound = cube.position.z + cube.bump.size.z / 2 + this.bumpR;
                let lowerBound = cube.position.z - cube.bump.size.z / 2 - this.bumpR;
                if ((x < rightBound && x > leftBound) && (z < upperBound && z > lowerBound)) {
                    let distLeftBound = abs(x - leftBound);
                    let distRightBound = abs(x - rightBound);
                    let distUpperBound = abs(z - upperBound);
                    let distLowerBound = abs(z - lowerBound);
                    let minDist = (min(distLeftBound, distRightBound, distUpperBound, distLowerBound));
                    if (minDist == distLeftBound) {
                        return ({ x: leftBound, z: z });
                    } else if (minDist == distRightBound) {
                        return ({ x: rightBound, z: z });
                    } else if (minDist == distUpperBound) {
                        return ({ x: x, z: upperBound });
                    } else {
                        return ({ x: x, z: lowerBound });
                    }
                } else {
                    return ({ x: x, z: z });
                }
            } else {
                return ({ x: x, z: z });
            }
        }
        _walk() {
            this.isWalking = true;
            this.moveSpeed = this.originMoveSpeed * (deltaTime / (50 / 3));//根据帧率计算行走速度
            for (let i = 0; i < this.objectsList.length; i++) {
                let newPosition = this._calBump(this.x, this.z, this.objectsList[i]);
                this.x = newPosition.x;
                this.z = newPosition.z;
            }
            this.height = this.originHeight + sin(frameCount / 10) * this.moveHeightRange;
        }
        walkForward() {
            this.x += this.moveSpeed * cos(this.thetarw);
            this.z -= this.moveSpeed * sin(this.thetarw);
            this._walk();
        }
        walkBackward() {
            this.x -= this.moveSpeed * cos(this.thetarw);
            this.z += this.moveSpeed * sin(this.thetarw);
            this._walk();
        }
        walkLeft() {
            this.x += this.moveSpeed * sin(this.thetarw);
            this.z += this.moveSpeed * cos(this.thetarw);
            this._walk();
        }
        walkRight() {
            this.x -= this.moveSpeed * sin(this.thetarw);
            this.z -= this.moveSpeed * cos(this.thetarw);
            this._walk();
        }
        moveUpwards() {
            this.y += this.moveSpeed;
        }
        moveDownwards() {
            this.y -= this.moveSpeed;
        }
        lookAround() {
            camera(this.x, this.y + this.height, this.z,
                this.x + 200 * cos(this.thetarw),
                this.y + this.height - 300 * tan(this.thetaeh),
                this.z - 200 * sin(this.thetarw),
                0, -1, 0);
        }
        update() {

            //走路
            if (this.isWalkingForward) {
                this.walkForward();
            }
            if (this.isWalkingBackward) {
                this.walkBackward();
            }
            if (this.isWalkingLeft) {
                this.walkLeft();
            }
            if (this.isWalkingRight) {
                this.walkRight();
            }
            if (this.ud) {
                if (this.isMovingUpwards) {
                    this.moveUpwards();
                }
                if (this.isMovingDownwards) {
                    this.moveDownwards();
                }
            }
            this.lookAround();
        }
    }
    player = new Player(objects.player, objects.objectsList);
    {//显示player辅助信息层
        if (SHOWPLAYERDATA) {
            showPlayerDataLayer = document.querySelector(".guiLayer").innerHTML += `
            <div class="vp_showplayer" style="text-align:right;position:fixed;right:10px;top:10px;text-align:left">
            <p class="pi_positionx" style="text-align:right;color:rgb(0,255,0,0.9);font-size:10px;margin:5px"></p>
            <p class="pi_positionz" style="text-align:right;color:rgb(0,255,0,0.9);font-size:10px;margin:5px"></p>
            <p class="pi_rotation_thetarw" style="text-align:right;color:rgb(0,255,0,0.9);font-size:10px;margin:5px"></p>
            <p class="pi_rotation_thetaeh" style="text-align:right;color:rgb(0,255,0,0.9);font-size:10px;margin:5px"></p>
            <p class="pi_fps" style="text-align:right;color:rgb(0,255,0,0.9);font-size:10px;margin:5px"></p>
            <p class="pi_fps" style="text-align:right;color:rgb(0,255,255,0.9);font-size:10px;margin:5px">F11全屏极致体验</p>
            <p class="pi_fps" style="text-align:right;color:rgb(0,255,255,0.9);font-size:10px;margin:5px">按ESC键回主界面</p>
            </div>
            `;
        }
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(objects.global.background);
    T = calFrameCount / 20;
    {//显示player辅助信息层
        if (SHOWPLAYERDATA) {
            document.querySelector(".pi_positionx").innerHTML = "position_x:" + player.x;
            document.querySelector(".pi_positionz").innerHTML = "position_z:" + player.z;
            document.querySelector(".pi_rotation_thetarw").innerHTML = "rotation_thetarw:" + player.thetarw;
            document.querySelector(".pi_rotation_thetaeh").innerHTML = "rotation_thetaeh:" + player.thetaeh;
            document.querySelector(".pi_fps").innerHTML = "fps:" + 1000 / deltaTime;
        }
    }
    {//渲染场景中的每个物体
        try {
            for (let i = 0; i < objects.objectsList.length; i++) {
                let currentObject = objects.objectsList[i];
                {//渲染物体
                    if (currentObject.hasOwnProperty("strokeWeight") && currentObject.strokeWeight != null) {
                        strokeWeight(currentObject.strokeWeight);
                    } else {
                        strokeWeight(1);
                    }
                    if (currentObject.hasOwnProperty("stroke") && currentObject.stroke != null) {
                        stroke.apply(null, currentObject.stroke);
                    } else {
                        noStroke();
                    }
                    if (currentObject.hasOwnProperty("fill") && currentObject.fill != null) {
                        fill.apply(null, currentObject.fill);
                    } else {
                        noFill();
                    }
                    //解析运动函数
                    if (currentObject.hasOwnProperty("change") && currentObject.change != null) {
                        // eval(currentObject.change(calFrameCount));
                        currentObject.change(calFrameCount);
                    }
                    //HUD界面渲染
                    if (currentObject.hasOwnProperty("showHUD") && currentObject.showHUD != null) {
                        currentObject.showHUD();
                    }
                    //如果有玩家进入检测区效果就执行
                    if (currentObject.hasOwnProperty("playerEnter") && currentObject.playerEnter != null) {
                        currentObject.playerEnter();
                    }
                }
                push();
                translate(currentObject.position.x, currentObject.position.y, currentObject.position.z);
                if (currentObject.hasOwnProperty("rotation") && currentObject.rotation != null) {
                    rotateX(currentObject.rotation.x);
                    rotateY(currentObject.rotation.y);
                    rotateZ(currentObject.rotation.z);
                }
                switch (currentObject.type) {
                    case 1:
                        box(currentObject.size.x, currentObject.size.y, currentObject.size.z);
                        break;
                    case 2:
                        sphere(currentObject.size.r);
                        break;
                    case 3:
                        cone(currentObject.size.r, currentObject.size.h);
                        break;
                    case 4:
                        cylinder(currentObject.size.r, currentObject.size.h);
                        break;
                    case 11:
                        box(currentObject.size.x, currentObject.size.y, currentObject.size.z);
                        //绘制画板
                        if (currentObject.fuc.fid == 0) {
                            try {
                                eval(currentObject.fuc.show());
                            } catch {
                                eval(currentObject.fuc.err());
                            }
                        } else if (currentObject.fuc.fid == 1) {
                            try {
                                eval(currentObject.fuc.toStr());
                            } catch {
                                eval(currentObject.fuc.err());
                            }
                        }
                        texture(canvasList[currentObject.fuc.canvasIndex]);
                        box(currentObject.displayCubeSize.x, currentObject.displayCubeSize.y, currentObject.displayCubeSize.z);
                        break;
                    case 21:
                        box(currentObject.size.x, currentObject.size.y, currentObject.size.z);
                        translate(0, currentObject.size.y / 2 + currentObject.displayBoxSize.y / 2, 0);
                        noFill();
                        box(currentObject.displayBoxSize.x, currentObject.displayBoxSize.y, currentObject.displayBoxSize.z);
                        push();
                        try {
                            eval(currentObject.fuc.toStr());
                        } catch {
                            pop();
                            eval(currentObject.fuc.err());
                        }
                        pop();
                        break;
                    case 31:
                        //绘制画板
                        if (currentObject.fuc.fid == 0) {
                            try {
                                eval(currentObject.fuc.show());
                            } catch {
                                eval(currentObject.fuc.err());
                            }
                        } else if (currentObject.fuc.fid == 1) {
                            try {
                                eval(currentObject.fuc.toStr());
                            } catch {
                                eval(currentObject.fuc.err());
                            }
                        }
                        texture(canvasList[currentObject.fuc.canvasIndex]);
                        plane(currentObject.size.x, currentObject.size.y);
                        break;
                    case 41:
                        //圆环
                        let slideSize = 2 * PI / currentObject.accuracy;
                        for (let i = 0; i < 2 * PI; i += slideSize) {
                            push();
                            let x = sin(i) * currentObject.size.r;
                            let z = cos(i) * currentObject.size.r;
                            translate(x, 0, z);
                            rotateY(i);
                            box(currentObject.size.x, currentObject.size.y, currentObject.size.z);
                            pop();
                        }
                        break;
                    case 51:
                        break;
                    default:
                        console.log("无法识别的物体类型");
                        break;
                }
                pop();
            }
        } catch {
            console.log("导入物体出错");
        }
    }
    {//测试代码

    }
    //加入玩家视角
    player.update();
    //处理帧率
    calFrameCount += deltaTime / (50 / 3);

    // {//全屏
    //     fullscreen(true);
    // }
    {//适配移动端视角变化
        for (let currentTouch of touches) {
            if (mbt_pisTouching == false) {
                mbt_ptouchx = currentTouch.x;
                mbt_ptouchy = currentTouch.y;
            }
            if (!(currentTouch.x < 220 && currentTouch.y > window.innerHeight - 220)) {
                console.log(player.thetaeh, currentTouch.y - mbt_ptouchy);
                player.thetarw += (currentTouch.x - mbt_ptouchx) * 0.016;
                player.thetaeh += (currentTouch.y - mbt_ptouchy) * 0.016;
                if (Math.cos(player.thetaeh) < 0 && Math.sin(player.thetaeh) > 0) {
                    player.thetaeh = Math.PI / 2;
                } else if (Math.cos(player.thetaeh) < 0 && Math.sin(player.thetaeh) < 0) {
                    player.thetaeh = -Math.PI / 2;
                }

                mbt_ptouchx = currentTouch.x;
                mbt_ptouchy = currentTouch.y;
                break;
            }
        }
        mbt_pisTouching = mbt_isTouching;
        if (mbt_isTouching) {
            mbt_touchTime++;
        }
    }
}
function mouseMoved() {
    {//实现视线转向
        if (window.innerWidth > PHONEEDGE) {
            player.thetaeh = map(mouseY, 0, height, -PI / 2 + Number.MIN_VALUE, PI / 2 - Number.MIN_VALUE);
        }
        let delta = mouseX - pmouseX;
        if (delta > 0) {
            xrotation = true;
            xdelta = delta;
        } else if (delta < 0) {
            xrotation = false;
            xdelta = -delta;
        }
        let rotateValue = 0.008;
        if (xrotation) {
            player.thetarw += rotateValue * xdelta;
        } else {
            player.thetarw -= rotateValue * xdelta;
        }
    }
}
function keyPressed() {
    switch (keyCode) {
        case 87:
            player.isWalkingForward = true;
            break;
        case 83:
            player.isWalkingBackward = true;
            break;
        case 65:
            player.isWalkingLeft = true;
            break;
        case 68:
            player.isWalkingRight = true;
            break;
        case 81:
            player.isMovingUpwards = true;
            break;
        case 69:
            player.isMovingDownwards = true;
            break;
    }
}
function keyReleased() {
    switch (keyCode) {
        case 87:
            player.isWalkingForward = false;
            player.isWalking = false;
            break;
        case 83:
            player.isWalkingBackward = false;
            player.isWalking = false;
            break;
        case 65:
            player.isWalkingLeft = false;
            player.isWalking = false;
            break;
        case 68:
            player.isWalkingRight = false;
            player.isWalking = false;
            break;
        case 81:
            player.isMovingUpwards = false;
            break;
        case 69:
            player.isMovingDownwards = false;
            break;
    }
}
function touchStarted() {
    mbt_isTouching = true;
}
function touchEnded() {
    mbt_isTouching = false;
    mbt_touchTime = 0;
}