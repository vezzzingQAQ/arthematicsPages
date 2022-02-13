// ********************************************************
// V3D 房间内的物品：
// 封装函数来修改objects.objectsList
// ********************************************************

/**
 * 
 * @param {{x:number,z:number,ud:boolean}} param0 玩家的位置 
 * @param {{background:Array<number>}} param1 全局参数
 * @returns 
 */
function initStruc({ x = 0, z = 0, thetarw = 0, thetaeh = 0, ud = false }, { background = [0] }) {
    return (
        {
            player: {
                "startPosition": {
                    "x": x,
                    "z": z,
                    "y": 0
                },
                "height": 170,
                "moveSpeed": 9,
                "moveHeightRange": 9,
                "bumpR": 120,
                "thetarw": thetarw,
                "thetaeh": thetaeh,
                "ud": ud,
            },
            global: {
                background: background
            },
            objectsList: [

            ]
        }
    );
}

/**
 * 生成基本的长方体
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {{x:number,y:number,z:number}} size 大小
 * @param {{x:number,y:number,z:number}|null} bump 碰撞盒
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {{x:number,y:number,z:number}|null} rotation 旋转量
 * @param {(t:number,obj:object)=>void|null} f 动效函数，obj是自身this
 * @param {{}} paraList 携带的参数列表
 */
function initCube(name, position, size, bump = null, stroke = [200], strokeWeight = 1, fill = null, rotation = null, f = null, paraList = {}) {
    let currentBlock = {
        name: name,
        type: 1,//1标准长方体
        position: position,
        rotation: rotation,
        size: size,
        strokeWeight: strokeWeight,
        stroke: stroke,
        fill: fill,
        paraList: paraList,
    }
    if (bump != null) {
        currentBlock.bump = { size: bump };
    }
    if (f != null) {
        currentBlock.change = (t) => {
            f(t, currentBlock);
        }
    }
    objects.objectsList.push(currentBlock);
}

/**
 * 生成基本的球体
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {{r:number}} size 大小
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {{x:number,y:number,z:number}|null} rotation 旋转量
 * @param {(t:number,obj:object)=>void|null} f 动效函数，obj是自身this
 * @param {{}} paraList 携带的参数列表
 */
function initSphere(name, position, size, stroke = [200], strokeWeight = 1, fill = null, rotation = null, f = null, paraList = {}) {
    let currentBlock = {
        name: name,
        type: 2,//2标准球体
        position: position,
        rotation: rotation,
        size: size,
        strokeWeight: strokeWeight,
        stroke: stroke,
        fill: fill,
        paraList: paraList,
    }
    if (f != null) {
        currentBlock.change = (t) => {
            f(t, currentBlock);
        }
    }
    objects.objectsList.push(currentBlock);
}

/**
 * 生成基本的圆锥
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {{r:number,h:number}} size 大小
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {{x:number,y:number,z:number}|null} rotation 旋转量
 * @param {(t:number,obj:object)=>void|null} f 动效函数，obj是自身this
 * @param {{}} paraList 携带的参数列表
 */
function initCone(name, position, size, stroke = [200], strokeWeight = 1, fill = null, rotation = null, f = null, paraList = {}) {
    let currentBlock = {
        name: name,
        type: 3,//3标准圆锥
        position: position,
        rotation: rotation,
        size: size,
        strokeWeight: strokeWeight,
        stroke: stroke,
        fill: fill,
        paraList: paraList,
    }
    if (f != null) {
        currentBlock.change = (t) => {
            f(t, currentBlock);
        }
    }
    objects.objectsList.push(currentBlock);
}

/**
 * 生成基本的圆柱
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {{r:number,h:number}} size 大小
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {{x:number,y:number,z:number}|null} rotation 旋转量
 * @param {(t:number,obj:object)=>void|null} f 动效函数，obj是自身this
 * @param {{}} paraList 携带的参数列表
 */
function initCylinder(name, position, size, stroke = [200], strokeWeight = 1, fill = null, rotation = null, f = null, paraList = {}) {
    let currentBlock = {
        name: name,
        type: 4,//4标准圆柱
        position: position,
        rotation: rotation,
        size: size,
        strokeWeight: strokeWeight,
        stroke: stroke,
        fill: fill,
        paraList: paraList,
    }
    if (f != null) {
        currentBlock.change = (t) => {
            f(t, currentBlock);
        }
    }
    objects.objectsList.push(currentBlock);
}

/**
 * 生成2D函数式地板
 * @param {number} xsize x方向边长
 * @param {number} xcount x方向的切分数量
 * @param {number} zsize z方向边长
 * @param {number} zcount z方向的切分数量
 * @param {number} centerX x方向中心点位置
 * @param {number} centerZ z方向中心点位置
 * @param {(t:number,obj:object)=>void|null} f 动效函数，obj是自身this
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {number} plRatiox x方向缩放比例
 * @param {number} plRatioz z方向缩放比例
 */
function initBasicFunctionGround(xsize = 2000, xcount = 20, zsize = 2000, zcount = 20, centerX = 0, centerZ = 0, f = null, stroke = [100], strokeWeight = 3, fill = objects.global.background, plRatiox = 1, plRatioz = 1) {
    for (let x = centerX - xsize / 2; x < centerX + xsize / 2; x += xsize / xcount) {
        for (let z = centerZ - zsize / 2; z < centerZ + zsize / 2; z += zsize / zcount) {
            initCube(
                "ground",
                {
                    x: x,
                    z: z,
                    y: -50,
                },
                {
                    x: xsize / xcount,
                    z: zsize / zcount,
                    y: 100,
                },
                null,
                stroke,
                strokeWeight,
                fill,
                { x: 0, z: 0, y: 0 },
                f,
                {
                    x: (x - centerX) / plRatiox,
                    z: (z - centerZ) / plRatioz,
                }
            );
        }
    }
}

/**
 * 生成2D函数式天花板
 * @param {number} xsize x方向边长
 * @param {number} xcount x方向的切分数量
 * @param {number} zsize z方向边长
 * @param {number} zcount z方向的切分数量
 * @param {number} centerX x方向中心点位置
 * @param {number} centerZ z方向中心点位置
 * @param {number} height 天花板初始离地高度【有动效的话在函数f里设置】
 * @param {(t:number,obj:object)=>void|null} f 动效函数，obj是自身this
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {number} plRatiox x方向缩放比例
 * @param {number} plRatioz z方向缩放比例
 */
function initBasicFunctionCelling(xsize = 2000, xcount = 20, zsize = 2000, zcount = 20, centerX = 0, centerZ = 0, height = 1300, f = null, stroke = [100], strokeWeight = 3, fill = objects.global.background, plRatiox = 2, plRatioz = 2) {
    for (let x = centerX - xsize / 2; x < centerX + xsize / 2; x += xsize / xcount) {
        for (let z = centerZ - zsize / 2; z < centerZ + zsize / 2; z += zsize / zcount) {
            initCube(
                "celling",
                {
                    x: x,
                    z: z,
                    y: height,
                },
                {
                    x: xsize / xcount,
                    z: zsize / zcount,
                    y: 100,
                },
                null,
                stroke,
                strokeWeight,
                fill,
                null,
                f,
                {
                    x: (x - centerX) / plRatiox,
                    z: (z - centerZ) / plRatioz,
                    height: height,
                },
            );
        }
    }
}

/**
 * 生成基本的墙
 * @param {number} wallHeight 墙的高度
 * @param {number} sizex 墙在X方向的长度
 * @param {number} sizez 墙在Z方向的长度
 * @param {Array<number>|null} stroke P5-stroke
 * @param {Array<number>|null} fill P5-fill
 */
function initCalWall(wallHeight = 2200, sizex = 2000, sizez = 2000, stroke, fill) {
    objects.objectsList.push(
        {
            name: "wall1",
            type: 1,//1标准长方体
            position: {//中心点位置
                x: -sizex / 2,
                z: 0,
                y: wallHeight / 2,
            },
            size: {
                x: 97,
                z: sizez,
                y: wallHeight,
            },
            stroke: stroke,
            fill: fill,
            bump: {//立方体碰撞盒
                size: {
                    x: 90,
                    z: sizez,
                    y: wallHeight,
                },
            }
        }
    );
    objects.objectsList.push(
        {
            name: "wall2",
            type: 1,//1标准长方体
            position: {//中心点位置
                x: sizex / 2,
                z: 0,
                y: wallHeight / 2,
            },
            size: {
                x: 97,
                z: sizez,
                y: wallHeight,
            },
            stroke: stroke,
            fill: fill,
            bump: {//立方体碰撞盒
                size: {
                    x: 90,
                    z: sizez,
                    y: wallHeight,
                },
            }
        }
    );
    objects.objectsList.push(
        {
            name: "wall3",
            type: 1,//1标准长方体
            position: {//中心点位置
                x: 0,
                z: -sizez / 2,
                y: wallHeight / 2,
            },
            size: {
                x: sizex,
                z: 97,
                y: wallHeight,
            },
            stroke: stroke,
            fill: fill,
            bump: {//立方体碰撞盒
                size: {
                    x: sizex,
                    z: 90,
                    y: wallHeight,
                },
            }
        }
    );
    objects.objectsList.push(
        {
            name: "wall4",
            type: 1,//1标准长方体
            position: {//中心点位置
                x: 0,
                z: sizez / 2,
                y: wallHeight / 2,
            },
            size: {
                x: sizex,
                z: 97,
                y: wallHeight,
            },
            stroke: stroke,
            fill: fill,
            bump: {//立方体碰撞盒
                size: {
                    x: sizex,
                    z: 90,
                    y: wallHeight,
                },
            }
        }
    );
}

/**
 * 生成基本墙四周的支柱
 * @param {number} wallHeight 墙的高度
 * @param {number} sizex x方向长度
 * @param {number} sizez z方向长度
 * @param {Array<number>|null} strokeColor P5-stroke值
 * @param {Array<number>|null} fillColor P5-fill值
 */
function initCalWallBlocks(wallHeight = 2200, sizex = 2000, sizez = 2000, strokeColor, fillColor) {
    objects.objectsList.push(
        {
            name: "z1",
            type: 1,//1标准长方体
            position: {//中心点位置
                x: -sizex / 2,
                z: sizez / 2,
                y: wallHeight / 2,
            },
            size: {
                x: 97,
                z: 97,
                y: wallHeight,
            },
            stroke: strokeColor,
            fill: fillColor,
        }
    );
    objects.objectsList.push(
        {
            name: "z2",
            type: 1,//1标准长方体
            position: {//中心点位置
                x: sizex / 2,
                z: sizez / 2,
                y: wallHeight / 2,
            },
            size: {
                x: 97,
                z: 97,
                y: wallHeight,
            },
            stroke: strokeColor,
            fill: fillColor,
        }
    );
    objects.objectsList.push(
        {
            name: "z2",
            type: 1,//1标准长方体
            position: {//中心点位置
                x: sizex / 2,
                z: -sizez / 2,
                y: wallHeight / 2,
            },
            size: {
                x: 97,
                z: 97,
                y: wallHeight,
            },
            stroke: strokeColor,
            fill: fillColor,
        }
    );
    objects.objectsList.push(
        {
            name: "z2",
            type: 1,//1标准长方体
            position: {//中心点位置
                x: -sizex / 2,
                z: -sizez / 2,
                y: wallHeight / 2,
            },
            size: {
                x: 97,
                z: 97,
                y: wallHeight,
            },
            stroke: strokeColor,
            fill: fillColor,
        }
    );
}

/**
 * 生成展示屏
 * @param {number} type 类型  
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {boolean} heading 朝向：true->z ; false->x
 * @param {TdFunction} fuc 展示的函数对象
 * @param {number} sw 宽度
 * @param {number} sh 高度
 * @param {number} sz 厚度
 * @param {number} siw 内部展示屏宽度
 * @param {number} sih 内部展示屏高度
 * @param {number} siz 内部展示屏厚度
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {number} enterLen HUD显示的检测区长度
 * @param {Array<number>|null} enterStroke 进入HUD显示区时的描边颜色
 * @param {(t:number,self:object)=>void} schange 动画函数
 * @param {boolean} hasbump 是否有碰撞盒
 */
function initDisplayScreen(type, name, position, heading, fuc, sw = 300, sh = 300, sz = 20, siw = 300, sih = 300, siz = 0, stroke = [200], strokeWeight = 1,
    fill = null, enterLen = 300, enterStroke = null, schange = null, hasbump = true) {
    let size, displayCubeSize;
    if (heading) {
        size = { x: sw, z: sz, y: sh };
        displayCubeSize = { x: siw, z: siz, y: sih };
    } else {
        size = { x: sz, z: sw, y: sh };
        displayCubeSize = { x: siz, z: siw, y: sih };
    }
    let currentBlock = {
        name: name,
        heading: heading,
        type: type,//11展示屏
        position: position,
        rotation: { x: 0, y: 0, z: 0 },
        originPosition: position,//保存初始位置
        size: size,
        displayCubeSize: displayCubeSize,
        fuc: fuc,
        stroke: stroke,
        strokeWeight: strokeWeight,
        fill: fill
    }
    if (enterLen != 0) {
        currentBlock.enterLen = enterLen;
        currentBlock.enterStroke = enterStroke;
        currentBlock.checkInShowArea = function () {//检测玩家是否进入检测区
            let len = currentBlock.enterLen;
            let x = player.x;
            let z = player.z;
            if (player.thetaeh < 0.38 && player.thetaeh > -0.38) {
                if (currentBlock.heading) {
                    if ((x < currentBlock.position.x + currentBlock.size.x / 2 && x > currentBlock.position.x - currentBlock.size.x / 2) && (abs(cos(player.thetarw)) < 0.6)) {
                        if (z < currentBlock.position.z + len && z > currentBlock.position.z) {
                            if (sin(player.thetarw) > 0) return true; else return false;
                        } else if (z > currentBlock.position.z - len && z < currentBlock.position.z) {
                            if (sin(player.thetarw) < 0) return true; else return false;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    if ((z < currentBlock.position.z + currentBlock.size.z / 2 && z > currentBlock.position.z - currentBlock.size.z / 2) && (abs(cos(PI / 2 - player.thetarw)) < 0.6)) {
                        if (x < currentBlock.position.x + len && x > currentBlock.position.x) {
                            if (cos(player.thetarw) < 0) return true; else return false;
                        } else if (x > currentBlock.position.x - len && x < currentBlock.position.x) {
                            if (cos(player.thetarw) > 0) return true; else return false;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
            }
        }
        currentBlock.playerEnter = function () {//检测玩家进入，如果玩家在行走，就不显示
            let x = player.x;
            let z = player.z;
            if (currentBlock.checkInShowArea(x, z)) {
                if (!player.isWalking && currentBlock.enterStroke != null) {
                    currentBlock.stroke = currentBlock.enterStroke;
                }
            } else {
                currentBlock.stroke = [200];
            }
        }
        currentBlock.showHUD = function () {//显示HUD界面，玩家停下来才能看到
            let x = player.x;
            let z = player.z;
            if (!player.isWalking && currentBlock.checkInShowArea(x, z) && document.getElementById("t" + currentBlock.name) == undefined) {
                editHUDobject(currentBlock.name, currentBlock.type, currentBlock.fuc, true);
            } else if (!isRemovingHUD && !currentBlock.checkInShowArea(x, z) && document.getElementById("t" + currentBlock.name) != undefined) {
                editHUDobject(currentBlock.name, currentBlock.type, currentBlock.fuc, false);
            }
        }
    }
    if (schange != null) {
        currentBlock.change = (t) => {
            schange(t, currentBlock);
        }
    }
    if (hasbump) {
        currentBlock.bump = {
            size: size
        }
    }
    objects.objectsList.push(currentBlock);
}

/**
 * 显示基本T11的展示屏
 * @param {string} name 名称【不能重复】
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {boolean} heading 朝向：true->z ; false->x
 * @param {TdFunction} fuc 展示的函数对象
 * @param {number} showHUDlen HUD检测区大小，0为不显示
 * @param {Array<number>|null} enterStroke 玩家进入HUD显示区时描边变色
 */
function initBasicDisplayScreen(name, position, heading, fuc, showHUDlen = 300, enterStroke = null) {
    initDisplayScreen(11, name, position, heading, fuc, 300, 300, 20, 300, 300, 0, [200], 1, null, showHUDlen, enterStroke);
}

/**
 * 显示T11小号的展示屏
 * @param {string} name 名称【不能重复】
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {boolean} heading 朝向：true->z ; false->x
 * @param {TdFunction} fuc 展示的函数对象
 * @param {number} showHUDlen HUD检测区大小，0为不显示
 * @param {Array<number>|null} enterStroke 玩家进入HUD显示区时描边变色
 */
function initSmallDisplayScreen(name, position, heading, fuc, showHUDlen = 300, enterStroke = null) {
    initDisplayScreen(11, name, position, heading, fuc, 100, 100, 20, 100, 100, 0, [200], 1, null, showHUDlen, enterStroke);
}

/**
 * 显示T11大号的展示屏
 * @param {string} name 名称【不能重复】
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {boolean} heading 朝向：true->z ; false->x
 * @param {TdFunction} fuc 展示的函数对象
 * @param {number} showHUDlen HUD检测区大小，0为不显示
 * @param {Array<number>|null} enterStroke 玩家进入HUD显示区时描边变色
 */
function initLargeDisplayScreen(name, position, heading, fuc, showHUDlen = 300, enterStroke = null) {
    initDisplayScreen(11, name, position, heading, fuc, 500, 500, 20, 500, 500, 0, [200], 1, null, showHUDlen, enterStroke);
}

/**
 * 显示旋转的T11展示屏立方体
 * @param {string} name 名称【不能重复】
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {TdFunction} fuc 展示的函数对象
 */
function initRotatingDisplayScreenBox(name, position, fuc) {
    initDisplayScreen(11, name, position, true, fuc, 200, 200, 200, 202, 202, 202, null, 0, objects.global.background, 0, null, (t, self) => {
        self.rotation.y += 0.003;
    }, false);
}

/**
 * 显示自定义动画方程的T11展示立方体
 * @param {string} name 名称【不能重复】
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {TdFunction} fuc 展示的函数对象
 * @param {(t:number,self:object)=>void} changeFunc 物体动画方程
 */
function initChangingDisplayScreenBox(name, position, fuc, changeFunc) {
    initDisplayScreen(11, name, position, true, fuc, 200, 200, 200, 202, 202, 202, null, 0, objects.global.background, 0, null, changeFunc, false);
}

/**
 * 生成展示柜
 * @param {number} type 类型
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {GlFunction} fuc 展示的函数对象 
 * @param {{x:number,y:number,z:number}} sizeBase 底座大小
 * @param {{x:number,y:number,z:number}} sizeBox 展示盒大小
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {number} enterR HUD显示区半径
 * @param {Array<number>|null} enterStroke 进入HUD显示区时的描边颜色
 * @param {(t:number,self:object)=>void} schange 动画函数
 * @param {boolean} hasbump 是否有碰撞盒
 */
function initDisplayBox(type, name, position, fuc, sizeBase, sizeBox, stroke = [200], strokeWeight = 1, fill = null, enterR = 300, enterStroke = null, schange = null, hasbump = true) {
    let currentBlock = {
        name: name,
        type: type,
        position: position,
        rotation: { x: 0, y: 0, z: 0 },
        size: {
            x: sizeBase.x,
            z: sizeBase.z,
            y: sizeBase.y,
        },
        displayBoxSize: {//立体展柜特有
            x: sizeBox.x,
            z: sizeBox.z,
            y: sizeBox.y,
        },
        fuc: fuc,
        stroke: stroke,
        strokeWeight: strokeWeight,
        fill: fill,

    }
    if (enterR != 0) {
        currentBlock.enterR = enterR;
        currentBlock.enterStroke = enterStroke,
            currentBlock.checkInShowArea = function () {//检测玩家是否进入检测区
                let len = currentBlock.enterR;
                let x = player.x;
                let z = player.z;
                if (player.thetaeh < 0.38 && player.thetaeh > -0.38) {
                    if (Math.sqrt((x - currentBlock.position.x) * (x - currentBlock.position.x) + (z - currentBlock.position.z) * (z - currentBlock.position.z)) < len) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        currentBlock.playerEnter = function () {//检测玩家进入，如果玩家在行走，就不显示
            let x = player.x;
            let z = player.z;
            if (currentBlock.checkInShowArea(x, z)) {
                if (!player.isWalking && currentBlock.enterStroke != null) {
                    currentBlock.stroke = currentBlock.enterStroke;
                }
            } else {
                currentBlock.stroke = [200];
            }
        }
        currentBlock.showHUD = function () {//显示HUD界面，玩家停下来才能看到
            let x = player.x;
            let z = player.z;
            if (!player.isWalking && currentBlock.checkInShowArea(x, z) && document.getElementById("t" + currentBlock.name) == undefined) {
                editHUDobject(currentBlock.name, currentBlock.type, currentBlock.fuc, true);
            } else if (!isRemovingHUD && !currentBlock.checkInShowArea(x, z) && document.getElementById("t" + currentBlock.name) != undefined) {
                editHUDobject(currentBlock.name, currentBlock.type, currentBlock.fuc, false);
            }
        }
    }
    if (schange != null) {
        currentBlock.change = (t) => {
            schange(t, currentBlock);
        }
    }
    if (hasbump) {
        currentBlock.bump = {
            size: {
                x: sizeBox.x,
                z: sizeBox.z,
                y: sizeBox.y,
            }
        }
    }
    objects.objectsList.push(currentBlock);
}

/**
 * 生成基本的T21展示柜
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {GlFunction} fuc 展示的函数对象 
 * @param {{x:number,y:number,z:number}} sizeBase 底座大小
 * @param {{x:number,y:number,z:number}} sizeBox 展示盒大小
 * @param {number} enterR HUD显示区半径
 * @param {Array<number>|null} enterStroke 进入HUD显示区时的描边颜色
 */
function initBasicDisplayBox(name, position, fuc, sizeBase, sizeBox, enterR = 300, enterStroke = null) {
    initDisplayBox(21, name, position, fuc,
        sizeBase,
        sizeBox,
        [200], 1, null, enterR, enterStroke);
}

/**
 * 生成无碰撞的T21展示柜
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {GlFunction} fuc 展示的函数对象 
 * @param {{x:number,y:number,z:number}} sizeBase 底座大小
 * @param {{x:number,y:number,z:number}} sizeBox 展示盒大小
 */
function initBasicNoBumpDisplayBox(name, position, fuc, sizeBase, sizeBox) {
    initDisplayBox(21, name, position, fuc,
        sizeBase,
        sizeBox,
        [200], 1, null, 0, null, null, false);
}

/**
 * 生成自动旋转的T21展示柜
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {GlFunction} fuc 展示的函数对象 
 * @param {{x:number,y:number,z:number}} sizeBase 底座大小
 * @param {{x:number,y:number,z:number}} sizeBox 展示盒大小
 */
function initBasicRotatingDisplayBox(name, position, fuc, sizeBase, sizeBox) {
    initDisplayBox(21, name, position, fuc,
        sizeBase,
        sizeBox,
        [200], 1, null, 0, null, (t, self) => {
            self.rotation.y += 0.003;
        }, false);
}

/**
 * 生成平面展示屏
 * @param {number} type 类型  
 * @param {string} name 名称
 * @param {{x:number,y:number}} position 位置
 * @param {{x:number,y:number,z:number}} rotation 旋转角
 * @param {TdFunction} fuc 展示的函数对象
 * @param {number} sw 宽度
 * @param {number} sh 高度
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {(t:number,self:object)=>void} schange 动画函数
 */
function initDisplayPlane(type, name, position, rotation, fuc, sw = 300, sh = 300, stroke = [200], strokeWeight = 1,
    fill = null, schange = null) {
    let size;
    size = { x: sw, y: sh };
    let currentBlock = {
        name: name,
        type: type,//31展示屏
        position: position,
        rotation: rotation,
        originPosition: position,//保存初始位置
        size: size,
        fuc: fuc,
        stroke: stroke,
        strokeWeight: strokeWeight,
        fill: fill,
    }
    if (schange != null) {
        currentBlock.change = (t) => {
            schange(t, currentBlock);
        }
    }
    objects.objectsList.push(currentBlock);
}

/**
 * 生成朝向玩家的平面展示屏
 * @param {string} name 名称
 * @param {{x:number,y:number}} position 位置
 * @param {{x:number,y:number,z:number}} rotation 旋转角
 * @param {TdFunction} fuc 展示的函数对象
 * @param {number} sw 宽度
 * @param {number} sh 高度
 */
function initFacingDisplayPlane(name, position, rotation, fuc, sw, sh) {
    initDisplayPlane(
        31, name, position, rotation, fuc, sw, sh, null, 0, null,
        (t, self) => {
            let deltax = self.position.x - player.x;
            let deltaz = self.position.z - player.z;
            let theta = Math.atan(deltax / deltaz);
            let rotateTheta;
            if (deltaz > 0) {
                rotateTheta = theta;
            } else {
                rotateTheta = Math.PI + theta;
            }
            self.rotation.y = rotateTheta;
        }
    )
}

/**
 * 生成基本的环形物件
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {{x:number,y:number,z:number,r:number}} size 大小
 * @param {number} accuracy 创建圆环的精度
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {{x:number,y:number,z:number}|null} rotation 旋转量
 * @param {(t:number,obj:object)=>void|null} f 动效函数，obj是自身this
 * @param {{}} paraList 携带的参数列表
 */
function initLoop(name, position, size, accuracy = 10, stroke = [200], strokeWeight = 1, fill = null, rotation = null, f = null, paraList = {}) {
    let currentBlock = {
        name: name,
        type: 41,//41:立方体圆环
        position: position,
        rotation: rotation,
        size: size,
        accuracy: accuracy,
        strokeWeight: strokeWeight,
        stroke: stroke,
        fill: fill,
        paraList: paraList,
    }
    if (f != null) {
        currentBlock.change = (t) => {
            f(t, currentBlock);
        }
    }
    objects.objectsList.push(currentBlock);
}

/**
 * 触发点
 * @param {number} type 51触发点 
 * @param {string} name 名字
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {()=>void} enterf 在检测区内执行函数 
 * @param {()=>void} outerf 在检测区外执行函数 
 * @param {number} enterR 触发距离
 * @param {(t:number,self:object)=>void} schange 动画函数
 */
function initTraggerPoint(type, name, position, enterf, outerf, enterR = 300, schange = null) {
    let currentBlock = {
        name: name,
        type: type,//51触发点
        position: position,
        rotation: { x: 0, y: 0, z: 0 },
        enterR: enterR,

        checkInShowArea: function () {//检测玩家是否进入检测区
            let len = this.enterR;
            let x = player.x;
            let z = player.z;
            if (Math.sqrt((x - this.position.x) * (x - this.position.x) + (z - this.position.z) * (z - this.position.z)) < len) {
                return true;
            } else {
                return false;
            }
        },
        playerEnter() {//检测玩家进入，如果玩家在行走，就不显示
            let x = player.x;
            let z = player.z;
            if (this.checkInShowArea(x, z)) {
                enterf();
            } else {
                outerf();
            }
        },
    }
    if (schange != null) {
        currentBlock.change = (t) => {
            schange(t, currentBlock);
        }
    }
    objects.objectsList.push(currentBlock);
}
