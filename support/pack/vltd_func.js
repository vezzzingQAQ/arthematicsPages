function initCanvas() {
    //创建canvas
    for (let i = 0; i < objects.objectsList.length; i++) {
        currentObject = objects.objectsList[i];
        if (currentObject.type == 11 || currentObject.type == 31) {//需要canvas画布
            if (currentObject.type == 31) {
                canvasList.push(createGraphics(vpwidth * (currentObject.size.x / 300), vpwidth * (currentObject.size.y / currentObject.size.x) * (currentObject.size.x / 300)));
            } else if (currentObject.type == 11) {
                canvasList.push(createGraphics(vpwidth, vpheight));
            }
            currentObject.fuc.canvasIndex = canvasList.length - 1;
        }
    }
}