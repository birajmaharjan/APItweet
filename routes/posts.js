const express = require('express');
const Posts = require('../models/posts');
const router = express.Router();
// const jwt = require('jsonwebtoken');

router.post('/add', (req, res, next) => {
    
        Posts.create({
            name: req.body.name,
            username: req.body.username,
            story: req.body.story,
            like: req.body.like,
            comment: req.body.comment,
            retweet: req.body.retweet,
            time: req.body.time,
            image: req.body.image,
            uimage: req.body.uimage
        }).then((postweet) => {
           // let token = jwt.sign({ _id: posty._id }, process.env.SECRET);
                        res.json({postweet, status: 'Post success!' });
        }).catch(next);
    });




// router.route('/:id').get('/me',  (req, res, next) => {
//     res.json({ _id: req.post.id\, username: req.user.username, name: req.user.name, post: req.user.post, comment: req.user.comment, image: req.user.image });
// });
router.route('/')
    .get((req, res, next) => {
        Posts.find({})
            .then((postweet) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(postweet);
            }).catch(next);
    })
    .put((req, res, next) => {
        Posts.findOneAndUpdate({ author: req.user._id, _id: req.params.id }, { $set: req.body }, { new: true })
            .then((reply) => {
                if (reply == null) throw new Error("Task not found!");
                res.json(reply);
            }).catch(next);
    });

module.exports = router;
