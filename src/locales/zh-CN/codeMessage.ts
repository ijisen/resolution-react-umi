export default {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  1000: '响应成功',
  // 参数错误 #1000～1999
  1001: '参数为空',
  1002: '参数不全',
  1003: '参数类型错误',
  1004: '参数无效',
  // 用户错误 #2000～2999
  2000: '用户错误',
  2001: '用户不存在',
  2002: '未登录或登录超时',
  2003: '用户名或密码错误',
  2004: '用户账户已被禁用',
  2005: '用户已存在',
  2006: '验证码错误',
  2048: '用户登录超时',
  // 业务错误 #3000～3999
  3000: '业务错误',
  3001: '系统业务出现问题',
  // 系统错误 #4000～4999
  4000: '系统错误',
  4001: '系统内部错误',
  // 业务错误 #5000～5999
  5000: '业务错误',
  5001: '数据未找到',
  5002: '数据有误',
  5003: '数据已存在',
  // 接口错误 #6000～6999
  6000: '接口错误',
  6001: '系统内部接口调用异常',
  6002: '系统外部接口调用异常',
  6003: '接口禁止访问',
  6004: '接口地址无效',
  6005: '接口请求超时',
  6006: '接口负载过高',
  // 权限错误 #7000～7999
  7000: '权限错误',
  7001: '没有访问权限',
  'params.err': '登录超时或网络异常，请稍后再尝试',
  'network.err': '网络异常',
  'req.err': '请求错误',
};
