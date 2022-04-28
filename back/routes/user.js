const express = require("express");
var router = express.Router();
const User = require("../schema/User");

router.get('/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.get('/', async (req, res) => {
    try {
        let users = await User.find()
        users = users.map(user => ({
            id: user._id,
            username: user.username,
            role: user.roles,
            friendList: user.friendList
        }))
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.post('/add', async (req, res) => {
    const { userId, userAsked } = req.body
    try {
        User.findById(userId).then(async (doc) => {
            if (doc) {
                doc.friendList.push({ _id: userAsked })
                await doc.save()
            }
        })
        return res.status(200).json({ success: `${userAsked} successfully added` })
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.post('/delete', async (req, res) => {
    const { userId, userAsked } = req.body
    try {
        User.findById(userId).then(async (doc) => {
            if (doc) {
                doc.friendList.pull({ _id: userAsked })
                await doc.save()
            }
        })
        return res.status(200).json({ success: `${userAsked} successfully deleted` })
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.post('/update', async (req, res) => {
    const { userId, role } = req.body
    console.log(req.body)
    try {
        User.findById(userId).then(async (doc) => {
            if (doc) {
                doc.roles = role
                await doc.save()
                return res.status(200).json({ success: `${userId} successfully edited` })
            }
        })

    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router;
