import { ResponseError } from 'umi-request';
import { notification } from 'antd';
import zh_CN from '@/locales/zh-CN/codeMessage';
import en_US from '@/locales/en-US/codeMessage';
import { isLocaleEn } from '@/utils/commont_rely';
import {
  RequestInterceptor,
  ResponseInterceptor,
} from 'E:/dpp/domain-resolution/node_modules/umi-request';

/**
 * 异常处理程序
 */
export const errorHandler = (error: ResponseError) => {
  // console.log(2222222222);
  const { response } = error;

  const codeMessage: {
    [propName: string]: any;
  } = {
    ...(isLocaleEn() ? en_US : zh_CN),
  };
  console.log(error);
  console.log(response);
  if (response && response.status) {
    const { status, url } = response;
    const errorText: string = codeMessage[status] || response.statusText;
    notification.error({
      message: `${codeMessage['req.err']} ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      message: codeMessage['network.err'],
      description: codeMessage['params.err'],
    });
  }
  return response;
};

/**
 * 中间件
 * */
export const middlewares = [];

/**
 * Request 拦截器
 * */
export const requestInterceptors: RequestInterceptor[] = [
  (url, config) => {
    // console.log(url);
    // console.log(config);
    // console.log(666666);
    // config.skipErrorHandler = true;
    return {
      url,
      config,
    };
  },
];

/**
 * Response 拦截器
 * */
export const responseInterceptors = [
  async (response: Response) => {
    // const resData = await response.clone().json();
    // console.log(response);
    // console.log(resData);
    // console.log('responseInterceptors');
    return response;
  },
];
