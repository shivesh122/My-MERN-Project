const ImageKit = require('@imagekit/nodejs');
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
 async function uploadImage(buffer) {
    
        const response = await imagekit.files.upload({
            file: buffer.toString('base64'),
            fileName: Date.now().toString() + '.jpg',
        });
        return response;
    }

module.exports = uploadImage;