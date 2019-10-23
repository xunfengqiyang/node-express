const router = require("express").Router();
const log4js = require('log4js');
const logger = log4js.getLogger();

var mutipart= require('connect-multiparty');
var mutipartMiddeware = mutipart();


router.post('/upload', mutipartMiddeware, function (req,res) {
    
    let path = req.files.file.path;
    let arr = path.split('/');
    let newName = arr[arr.length-1];
    logger.info("upload audio", newName);
    res.send({"success": true, "result": newName});
});

//心跳
router.get('/heart', function (req, res) {
    logger.info("heart beat");
    res.send({"success": true})
})

module.exports = router;