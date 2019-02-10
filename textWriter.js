const fs = require("uxp").storage.localFileSystem;

const saveText = async (suggestedName, text) => {
    suggestedName = verifyString(suggestedName);
    const file = await fs.getFileForSaving(suggestedName);
    if (!file) {
        // file picker was cancelled
        return;
    }
    await file.write(text);
}

const saveTexts = async (fileInfos) => {
    const folder = await fs.getFolder();
    if (!folder) {
        // folder picker was cancelled
        return;
    }
    for (var t of fileInfos){
        const file = await folder.createFile(verifyString(t.name));
        await file.write(t.text);
    };
}

const verifyString = (text) => {
    return text.replace(/\//g, "-");;
}

module.exports = {
    saveText,
    saveTexts
}