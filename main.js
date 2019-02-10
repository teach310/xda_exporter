const { showDialogY } = require("./dialog.js");
const { mapScreen, findArtboardInParent } = require("./nodeMapper.js");
const { saveText } = require("./textWriter.js");

const saveScreen = () => {
    const { selection } = require("scenegraph");
    let artboard = findArtboardInParent(selection.items[0]);
    if(artboard == null){
        showDialogY("Please select any node");
        return;
    }
    let screenData = mapScreen(artboard);
    
    saveText(artboard.name + ".xda", JSON.stringify(screenData, null , "\t"));
}

module.exports = {
    commands: {
        "exportXda": saveScreen
    }
};
