import { useState, useCallback } from 'react';
import {
  httpGetDNSListData,
  ResponseData,
  SearchDataParams,
} from '@/services/dns';

export interface InitState {
  searchData: SearchDataParams;
  tableData: ResponseData;
}

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
  tableData: {
    list: [],
  },
};

export default function dnsSettingsModel() {
  const [state, setInitState] = useState<InitState>(initState);

  const fetchDNSListData = useCallback(async (params) => {
    console.log(params);
    const res = await httpGetDNSListData(params);
    console.log(res);
    const { success = false, data } = res;
    let tableData: ResponseData = {
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
        ...params,
      },
      tableData: {
        ...tableData,
      },
    });
  }, []);

  return {
    state,
    fetchDNSListData,
  };
}
