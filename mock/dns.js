// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /dns/list': async (req, res) => {
    res.send({
      success: true,
      code: 1000,
      message: '请求成功',
      timestamp: 1648517225939,
      data: {
        pageNumber: 1,
        pageSize: 10,
        totalItem: 100,
        list: [
          {
            userId: 12,
            userName: '海纳百川',
            // online || offline
            settlementType: 'online',
            cellphone: '268888888',
            userType: '1',
          },
        ],
      },
    });
  },
};
