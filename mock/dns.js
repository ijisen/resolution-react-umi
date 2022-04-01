// 代码中会兼容本地 service mock 以及部署站点的静态数据

const recordTypeData = [
  {
    dataKey: 1,
    dataValue: 'A记录',
  },
  {
    dataKey: 2,
    dataValue: 'CNAME记录',
  },
  {
    dataKey: 3,
    dataValue: 'MX记录',
  },
  {
    dataKey: 4,
    dataValue: 'AAAA记录',
  },
  {
    dataKey: 5,
    dataValue: 'TXT记录',
  },
  {
    dataKey: 6,
    dataValue: 'URL显性转发',
  },
  {
    dataKey: 7,
    dataValue: 'URL隐性转发',
  },
  {
    dataKey: 8,
    dataValue: 'NS记录',
  },
  {
    dataKey: 9,
    dataValue: 'SRV记录',
  },
  {
    dataKey: 10,
    dataValue: 'CAA记录',
  },
  {
    dataKey: 11,
    dataValue: 'PTR记录',
  },
];

const dnsListData = (req) => {
  console.log(req);
  let arr = [];
  for (let i = 1; i++; i < 11) {
    arr.push({
      id: '1',
      //
      zone: 'zdns.cn.',
      // 域名
      name: `${i}.zdns.cn.`,
      // 记录类型
      type: recordTypeData[i].dataKey,
      ttl: 3600,
      // 记录值
      rdata: '记录值',
      // 线路
      view: '线路',
      // 状态
      flags: 1,
      // 备注
      note: '',
    });
  }
  return arr;
};
export default {
  // dns 列表数据获取
  'GET /resolution/rr/list': async (req, res) => {
    res.send({
      success: true,
      code: 1000,
      message: '请求成功',
      timestamp: 1648517225939,
      data: {
        pageNumber: 1,
        pageSize: 10,
        totalItem: 100,
        list: dnsListData(req),
      },
    });
  },
  // dns 记录类型数据获取
  'GET /dns/dict/recordType': async (req, res) => {
    res.send({
      success: true,
      code: 1000,
      message: '请求成功',
      timestamp: 1648517225939,
      data: recordTypeData,
    });
  },
  // dns 主机线路数据获取
  'GET /dns/dict/line': async (req, res) => {
    res.send({
      success: true,
      code: 1000,
      message: '请求成功',
      timestamp: 1648517225939,
      data: [
        {
          dataKey: 1,
          dataValue: '默认线路',
        },
        {
          dataKey: 2,
          dataValue: '中国移动',
        },
        {
          dataKey: 3,
          dataValue: '中国联通',
        },
      ],
    });
  },
};
