exports.handelPage = req => {
  const page = Number(req.body.pageNum) || 1 // 获取当前页码，默认为1
  const limit = Number(req.body.pageSize) || 10 // 获取每页显示条数，默认为10
  const skip = (page - 1) * limit // 计算跳过的文档数
  return { page, limit, skip }
}
