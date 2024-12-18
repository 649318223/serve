var express = require('express')
var PublicRoter = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'public/user' })

PublicRoter.post('/admin/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ data: req.file, message: '上传成功', status: 200 })
})

module.exports = PublicRoter
