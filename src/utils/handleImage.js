const fs = require('fs')
module.exports = {
    convertBase64: async (file) => {
        if(file){
            if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" && file.mimetype !== "image/jpg") {
              throw new Error('image type not supported');
            }
          }
        let avatar = file ? file.buffer : undefined;
        let base64data = avatar? await avatar.toString('base64') : undefined;
        return base64data;
    }
}
