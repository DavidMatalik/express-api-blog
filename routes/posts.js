const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')

router.get('/', postController.getAllPosts)
router.post('/', postController.createNewPost)

router.get('/:postid', postController.getPost)
router.put('/:postid', postController.updatePost)
router.delete('/:postid', postController.deletePost)

router.get('/:postid/comments', commentController.getAllComments)
router.post('/:postid/comments', commentController.createNewComment)

router.get('/:postid/comments/:commentid', commentController.getComment)
router.put('/:postid/comments/:commentid', commentController.updateComment)
router.delete('/:postid/comments/:commentid', commentController.deleteComment)

module.exports = router
