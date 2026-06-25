const express = require("express");
const router = express.Router();

const {signup, login} = require("../controller/auth");
const {auth , isStudent , isAdmin} = require("../middleware/Auth");


router.post("/login" , login);
router.post("/signup" , signup);

// protected Routes

router.get("/test" , auth , (req , res) => {
    return res.status(200).json({
        success:true,
        message:"testing"
    })
})

router.get("/student" , auth , isStudent , (req , res) => {
    return res.status(200).json({
        success:true,
        message:"Student protected route"
    });
});

router.get("/admin" , auth , isAdmin , (req , res) => {
    return res.status(200).json({
        success:true,
        message:"Admin protected Route"
    })
})

module.exports = router;