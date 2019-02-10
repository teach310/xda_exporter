const fs = require("uxp").storage.localFileSystem;


const saveText = async (suggestedName, text) => {
    const file = await fs.getFileForSaving(suggestedName);
    if (!file) {
        // file picker was cancelled
        return;
    }
    await file.write(text);
}

module.exports = {
    saveText
}