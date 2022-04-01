import { useState, useCallback } from 'react';
import {
  httpGetDictLineTypeData,
  httpGetDNSListData,
  ResponseData,
} from '@/services/dns';
import { InitState } from '@/models/data';

/**
 * 解析类型
 * */
export const recordTypeData = [
  {
    dataKey: 'A',
    dataValue: 'A',
  },
  {
    dataKey: 'AAAA',
    dataValue: 'AAAA',
  },
  {
    dataKey: 'CNAME',
    dataValue: 'CNAME',
  },
  {
    dataKey: 'MX',
    dataValue: 'MX',
  },
  {
    dataKey: 'TXT',
    dataValue: 'TXT',
  },
  {
    dataKey: 'CAA',
    dataValue: 'CAA',
  },
  {
    dataKey: 'NS',
    dataValue: 'NS',
  },
  {
    dataKey: 'SRV',
    dataValue: 'SRV',
  },
];

/**
 * 解析状态
 * */
export const recordStatusData = [
  {
    dataKey: 1,
    dataValue: '开启解析',
  },
  {
    dataKey: 2,
    dataValue: '暂停解析',
  },
  {
    dataKey: 16,
    dataValue: '宕机切换监控状态',
  },
  {
    dataKey: 32,
    dataValue: '宕机切换宕机状态',
  },
  {
    dataKey: 64,
    dataValue: '宕机切换加入的备份IP',
  },
];
export const searchData = {
  // 主机记录
  host: '',
  // 类型
  type: '',
  // 记录值
  value: '',
  // 线路
  line: '',
};

const initState = {
  searchData: {
    ...searchData,
    pageSize: 1,
    pageNumber: 10,
  },
  // 解析类型
  recordTypeData,
  // 解析状态
  recordStatusData,
  tableData: {
    list: [],
  },
};

export default function dnsSettingsModel() {
  const [state, setInitState] = useState<InitState>(initState);
  const [hostLine, setHostLine] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * 获取域名dns 列表数据
   *
   * */
  const fetchDNSListData = useCallback(async (params) => {
    console.log(params);
    const { searchData } = state;
    setLoading(true);
    const res = await httpGetDNSListData({
      ...searchData,
      ...params,
    });
    console.log(res);
    console.log(22222222222);
    const { success = false, data = [], message = '' } = res;
    let tableData: ResponseData = {
      list: [],
    };
    if (success) {
      console.log(888888888888);
      tableData = {
        list: [],
        ...data,
      };
    }
    setInitState({
      ...state,
      searchData: {
        ...searchData,
        ...params,
      },
      tableData: {
        ...tableData,
      },
    });
    setLoading(false);
    return {
      success,
      message,
    };
  }, []);

  /**
   * 获取主机线路数据
   * */
  const fetchGetDictLineTypeData = () => {
    httpGetDictLineTypeData().then((res) => {
      const { success = false, data = [] } = res || {};
      if (success && Array.isArray(data)) {
        setHostLine(data);
      } else {
        setHostLine([]);
      }
      console.log(data);
    });
  };
  /**
   * 页面基础数据配置
   * */
  const getPageInitData = () => {
    // fetchGetDictLineTypeData();
  };
  return {
    loading,
    state,
    hostLineData: hostLine,
    fetchDNSListData,
    getPageInitData,
  };
}
