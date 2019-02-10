
const { Rectangle, Text, Artboard, Group, Color } = require("scenegraph")

const addMappedNodeRecursive = (target, nodeMap) => {
    if (!target.name.includes("@ignore") && target.visible) {
        var mappedNode = mapNode(target);
        var key = toLowerCaseAtHead(mappedNode["component"]);

        if (key == "artboard") {
            nodeMap[key] = mappedNode;
        } else {
            key += "List";
            if (!nodeMap[key])
                nodeMap[key] = [];
            nodeMap[key].push(mappedNode);
        }
        target.children.forEach(x => addMappedNodeRecursive(x, nodeMap));
    }
}

// 頭文字を小文字にする
const toLowerCaseAtHead = (p) => {
    return p.charAt(0).toLowerCase() + p.slice(1);
}

const mapScreen = (artboard) => {
    if (artboard == null) {
        return null;
    }
    var result = {}
    addMappedNodeRecursive(artboard, result);
    return result;
}

const findArtboardInParent = (node) => {
    var target = node;
    while (target != null) {
        if (target instanceof Artboard)
            return target;
        target = target.parent;
    }
    return null;
}

const mapNode = (node) => {
    if (node instanceof Rectangle) {
        return mapRectangle(node);
    } else if (node instanceof Text) {
        return mapText(node);
    } else if (node instanceof Group) {
        return mapGroup(node);
    } else if (node instanceof Artboard) {
        return mapArtboard(node);
    } else {
        return node;
    }
}

const mapRectangle = (rectangle) => {
    let artboard = findArtboardInParent(rectangle);
    return {
        "guid": rectangle.guid,
        "component": "Rectangle",
        "name": rectangle.name,
        "parentGuid": rectangle.parent.guid,
        "siblingIndex" : getSiblingIndex(rectangle),
        "artboardPosX": rectangle.globalBounds.x - artboard.globalBounds.x,
        "artboardPosY": rectangle.globalBounds.y - artboard.globalBounds.y,
        "width": rectangle.width,
        "height": rectangle.height,
        "color": getRectColor(rectangle),
    }
}

const getRectColor = (rectangle) => {
    if (rectangle.fill instanceof Color) {
        return rectangle.fill.toHex(true);
    } else {
        return "#FFF";
    }
}

const mapText = (text) => {
    let artboard = findArtboardInParent(text);
    return {
        "guid": text.guid,
        "component": "Text",
        "name": text.name,
        "parentGuid": text.parent.guid,
        "siblingIndex" : getSiblingIndex(text),
        "artboardPosX": text.globalBounds.x - artboard.globalBounds.x,
        "artboardPosY": text.globalBounds.y - artboard.globalBounds.y,
        "text": text.text,
        "fontSize": text.fontSize,
        "color": text.fill ? text.fill.toHex(true) : "#FFF",
        "charSpacing": text.charSpacing, // 横の間隔フォントサイズの1/1000
        "lineSpacing": text.lineSpacing,
        "align": text.textAlign
    }
}

const mapGroup = (group) => {
    let artboard = findArtboardInParent(group);
    return {
        "guid": group.guid,
        "component": "Group",
        "name": group.name,
        "parentGuid": group.parent.guid,
        "siblingIndex" : getSiblingIndex(group),
        "artboardPosX": group.globalBounds.x - artboard.globalBounds.x,
        "artboardPosY": group.globalBounds.y - artboard.globalBounds.y,
    }
}

const mapArtboard = (artboard) => {
    return {
        "guid": artboard.guid,
        "component": "Artboard",
        "name": artboard.name,
        "width": artboard.width,
        "height": artboard.height
    }
}

const getSiblingIndex = (node) => {
    if(node == null)
        return 0;
    for (let index = 0; index < node.parent.children.length; index++) {
        const element = node.parent.children.at(index);
        if(element.guid == node.guid)
            return index;
    }
    return 0;
}

module.exports = {
    findArtboardInParent,
    mapScreen
}