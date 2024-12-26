const fs = require('fs')
const express = require('express')
const PublicRoter = express.Router()
const path = require('path')
const multer = require('multer')

// 设置存储引擎
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 动态构建文件存储路径
    const uploadDir = path.join('upload', file.fieldname, new Date().toISOString().substring(0, 10))
    // 创建路径（如果不存在）
    fs.mkdir(uploadDir, { recursive: true }, err => {
      if (err) return cb(err)
      cb(null, uploadDir)
    })
  },
  filename: function (req, file, cb) {
    // 生成唯一的文件名
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage })
// const upload = multer({ dest: 'public/user' })

PublicRoter.post('/admin/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ data: req.file, message: '上传成功', status: 200 })
})

module.exports = PublicRoter
