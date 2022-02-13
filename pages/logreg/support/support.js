function showDom(dom, height = 40, marginButton = 20) {
    dom.style.height = height + "px";
    dom.style.opacity = "1";
    dom.style.marginBottom = marginButton + "px";
    dom.style.pointerEvents = "all";
}
function hideDom(dom) {
    dom.style.height = "0";
    dom.style.opacity = "0";
    dom.style.margin = 0;
    dom.style.pointerEvents = "none";
}
window.addEventListener("load", function () {
    //有时候initialHide的元素会卡住，要手动隐藏
    for (let ele of document.querySelectorAll(".initialHide")) {
        hideDom(ele);
    }
})