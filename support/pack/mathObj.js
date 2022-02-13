// ********************************************************
// V3D 数学物件：
// 各种形式的对应关系
// ********************************************************

class VFunction {
    /**
     * 所有展示物品的基类
     * @param {{}} acobj 描述对象
     */
    constructor(acobj) {
        this.acobj = acobj;
    }
    log() {
        console.log("VF" + this.acobj);
    }
}
class TdFunction extends VFunction {
    /**
     * 要用到画板的函数对象基类
     * @param {{}} acobj 描述对象
     * @param {number} canvasIndex 画板index，会自动分配，无视即可
     */
    constructor(acobj, canvasIndex) {
        super(acobj);
        this.canvasIndex = canvasIndex;
    }
}

class NormalPaint extends TdFunction {
    constructor(acobj, exp, canvasIndex) {
        super(acobj, canvasIndex);
        this.exp = exp;
        this.hasDisplayed = false;//有没有绘制过
        this.fid = 0;//vltd中用以区分
    }
    show() {
        return this.exp(this.canvasIndex);
    }
    err() {
        return (
            `
        canvasList[${this.canvasIndex}].fill(255);
        canvasList[${this.canvasIndex}].text("ERRRR",50,50);
        `
        );
    }
}

class TdFunctionFlat extends TdFunction {
    /**
     * z=f(x,y,[T]) 二维平面展示
     * @param {{}} acobj 描述文件
     * @param {number} fromx x=[fromx,tox]
     * @param {number} tox x=[fromx,tox]
     * @param {number} ax x方向的切分数量
     * @param {number} fromy y=[fromy,toy]
     * @param {number} toy y=[fromy,toy]
     * @param {number} ay y方向的切分数量
     * @param {string} sf 函数表达式 f(x,y);
     * @param {string} schangef 对于每个 (x,z) 的操作
     * @param {number} canvasIndex 画板index，会自动分配，无视即可
     */
    constructor(acobj, fromx, tox, ax, fromy, toy, ay, sf, schangef, canvasIndex) {
        super(acobj, canvasIndex);
        this.type = "2d";
        this.fromx = fromx;
        this.tox = tox;
        this.fromy = fromy;
        this.toy = toy;
        this.ax = ax;
        this.ay = ay;

        this.sf = sf;//函数表达式
        this.schangef = schangef;//对于每个点的操作

        this.timeCop = this.ax * this.ay;//时间复杂度
        this.fid = 1;
    }
    judge() {
        if (this.timeCop > 0) {
            return true;
        } else {
            return false;
        }
    }
    toStr() {
        let schangeNew = this.schangef.replace(/\n(?=\s+\w+)/g, "\n" + "canvasList[" + this.canvasIndex + "].");
        let textTemp =
            `
        canvasList[${this.canvasIndex}].rectMode(CENTER);
        canvasList[${this.canvasIndex}].background(${objects.global.background});
        for(let x=${this.fromx};x<=${this.tox};x+=${(this.tox - this.fromx) / this.ax}){
            for(let y=${this.fromy};y<=${this.toy};y+=${(this.toy - this.fromy) / this.ay}){
                let z=${this.sf};
                let px=map(x,${this.fromx},${this.tox},40,vpwidth-40);
                let py=map(y,${this.fromy},${this.toy},40,vpheight-40);
                ${schangeNew}
            }
        }
        `
        if (this.judge()) return (textTemp);
    }
    toDisplayStr() {
        let textTemp =
            `
rectMode(CENTER);
background(0);
for(let x=${this.fromx};x<=${this.tox};x+=${(this.tox - this.fromx) / this.ax}){
    for(let y=${this.fromy};y<=${this.toy};y+=${(this.toy - this.fromy) / this.ay}){
        let z=${this.sf};
        let px=map(x,${this.fromx},${this.tox},40,vpwidth-40);
        let py=map(y,${this.fromy},${this.toy},40,vpheight-40);
        ${this.schangef}
    }
}
`
        if (this.judge()) return (textTemp);
    }
    err() {
        return (
            `
        canvasList[${this.canvasIndex}].fill(255);
        canvasList[${this.canvasIndex}].text("ERRRR",50,50);
        `
        );
    }
}

class TdFunctionFlat_obj extends TdFunctionFlat {
    constructor({
        acobj,
        fx, tx, sx,
        fy, ty, sy,
        equation,
        display
    }) {
        super(acobj, fx, tx, sx, fy, ty, sy, equation, display);
    }
}

class GlFunction extends VFunction {
    /**
     * WebGL函数
     * @param {{}} acobj 描述文件
     */
    constructor(acobj) {
        super(acobj);
    }
}

class GlTdFunction extends GlFunction {
    /**
     * z=f(x,y,[T])
     * @param {{}} acobj 描述文件
     * @param {number} fromx x=[fromx,tox]
     * @param {number} tox x=[fromx,tox]
     * @param {number} ax x方向的切分数量
     * @param {number} fromy y=[fromy,toy]
     * @param {number} toy y=[fromy,toy]
     * @param {number} ay y方向的切分数量
     * @param {string} sf 函数表达式 f(x,y);
     * @param {string} schangef 对于每个 (x,z) 的操作
     */
    constructor(acobj, fromx, tox, ax, fromy, toy, ay, sf, schangef) {
        super(acobj);
        this.type = "3d";
        this.fromx = fromx;
        this.tox = tox;
        this.fromy = fromy;
        this.toy = toy;
        this.ax = ax;
        this.ay = ay;

        this.sf = sf;//函数表达式
        this.schangef = schangef;//对于每个点的操作

        this.timeCop = this.ax * this.ay;//时间复杂度
    }
    toStr() {
        let textTemp =
            `
        push();
            for(let x=${this.fromx};x<=${this.tox};x+=${(this.tox - this.fromx) / this.ax}){
                for(let y=${this.fromy};y<=${this.toy};y+=${(this.toy - this.fromy) / this.ay}){
                    let z=${this.sf};
                    push();
                    translate(map(x,${this.fromx},${this.tox},-40,40),z*15,map(y,${this.fromy},${this.toy},-40,40));
                    ${this.schangef}
                    pop();
                }
            }
        pop();
        `
        return (textTemp);
    }
    toDisplayStr() {
        let textTemp =
            `
push();
    for(let x=${this.fromx};x<=${this.tox};x+=${(this.tox - this.fromx) / this.ax}){
        for(let y=${this.fromy};y<=${this.toy};y+=${(this.toy - this.fromy) / this.ay}){
            let z=${this.sf};
            push();
            translate(map(x,${this.fromx},${this.tox},-40,40),z*15,map(y,${this.fromy},${this.toy},-40,40));
            ${this.schangef}
            pop();
        }
    }
pop();
`
        return (textTemp);
    }
    err() {
        return (
            `
        noFill();
        strokeWeight(0.8);
        stroke(255);
        box(10);
        `
        );
    }
}

class GlTdFunction_obj extends GlTdFunction {
    constructor({
        acobj,
        fx, tx, sx,
        fy, ty, sy,
        equation,
        display
    }) {
        super(acobj, fx, tx, sx, fy, ty, sy, equation, display);
    }
}
