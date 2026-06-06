const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./src/db/db');
const cors = require('cors');
connectDB();
app.use(cors());
app.use(express.json());
const postModel = require('./src/models/post.model');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});
const uploadImage = require('./src/services/storage.service');


app.post('/create-post', upload.single('postImage'), async (req, res) => {
    const response = await uploadImage(req.file.buffer);
    const post = await postModel.create({
        image: response.url,
        caption: req.body.caption,
    });
    return res.status(201).json({
        message: 'Post created successfully',
        post,
    });
});

app.get('/posts', async (req, res) => {
    const posts = await postModel.find().sort({createdAt: -1});
    return res.status(200).json({
        message: 'Posts fetched successfully',
        posts,
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000')
});