import { useState, useCallback } from 'react';
import { httpGetDNSListData, httpGetDictLineTypeData } from '@/services/dns';

import { InitState, TableData } from '@/types/dns.d';

/**
 * 解析类型
 * */
const recordTypeData = [
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
const recordStatusData = [
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

export const initSearchData = {
  // 必填；待查询解析记录的zone的id，如baidu.com.
  zone: '',
  // 如 www.baidu.com.
  name: undefined,
  // 类型 AAAA
  type: '',
  // 解析记录值
  rdata: undefined,
  // 智能线路的id?
  view: '',
  // 解析记录状态(1=开启解析，2=暂停解析，16=宕机切换监控状态，32=宕机切换宕
  // 机状态，64=宕机切换加入的备份IP)
  // flags: undefined,
  pageNumber: 1,
  pageSize: 5,
};

const initState: InitState = {
  searchData: {
    ...initSearchData,
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
  const [hostLine, setHostLine] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * 获取域名dns 列表数据
   *
   * */
  const fetchDNSListData = useCallback(async (params) => {
    console.log(params);
    setLoading(true);
    const res = await httpGetDNSListData({
      ...params,
    });
    console.log(res);
    const { success = false, data = [], message = '' } = res;
    let tableData: TableData = {
      list: [],
    };
    if (success) {
      tableData = {
        list: [],
        ...data,
      };
    }
    setInitState({
      ...state,
      searchData: {
        ...initSearchData,
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
      let resData: any[] = [];
      const { data, success } = res;
      if (success && Array.isArray(data)) {
        resData = data;
      }
      setHostLine(resData);
      console.log(res);
    });
  };
  /**
   * 页面基础数据配置
   * */
  const getPageInitData = async () => {
    fetchGetDictLineTypeData();
  };

  return {
    loading,
    state,
    hostLineData: hostLine,
    fetchDNSListData,
    getPageInitData,
  };
}
