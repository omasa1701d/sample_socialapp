var express = require('express') 
var router = require('express').Router()

router.use(express.static(__dirname + '/../assets'))
//ディレクトリassets以下がサーバーのルート直下にあるように見せる

router.use(express.static(__dirname + '/../templates'))
//ディレクトリtemplates以下がサーバーのルート直下にあるように見せる


router.get('/',function(req,res){
    res.sendfile('layouts/app.html')
})

module.exports = router;