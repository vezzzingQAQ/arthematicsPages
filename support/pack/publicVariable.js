// ********************************************************
// V3D 公共变量：
// 所有文件中可以引用
// ********************************************************
var player;
var roomObjects

var T;

const PI = Math.PI;
const vpwidth = 300;
const vpheight = 300;

const PHONEEDGE = 1000;

var canvasList = [];//储存房间里的画板列表
var calFrameCount = 0;//计算过后的应有帧数

var mbt_bottomIsTouched = false;

var mbt_isTouching = false;
var mbt_pisTouching = false;
var mbt_touchTime = 0;
var mbt_ptouchx = 0;
var mbt_ptouchy = 0;

const SHOWPLAYERDATA = true;//是否显示player的辅助坐标系
var showPlayerDataLashowPlayerDataLayeryer;//显示player坐标信息层画板

/*鼠标转向*/
var xrotation;
var xdelta = 0;
