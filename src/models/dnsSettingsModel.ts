import { useCallback, useState } from 'react';
import { httpGetDictLineTypeData, httpGetDNSListData } from '@/services/dns';

import { EnumRecordStatusData, InitState, TableData } from '@/types/dns.d';

/**
 * 解析类型
 * */
const recordTypeData = [
  {
    dataKey: 'A',
    dataValue: 'A',
    desc: '将域名指向一个IPV4地址',
    descEn: 'IPV4 address',
  },
  {
    dataKey: 'AAAA',
    dataValue: 'AAAA',
    desc: '将域名指向一个IPV6地址',
    descEn: 'IPv6 address',
  },
  {
    dataKey: 'CNAME',
    dataValue: 'CNAME',
    desc: '将域名指向另外一个域名',
    descEn: 'Canonical name',
  },
  {
    dataKey: 'NS',
    dataValue: 'NS',
    desc: '将子域名指定其他DNS服务器解析',
    descEn: 'Name server',
  },
  {
    dataKey: 'MX',
    dataValue: 'MX',
    desc: '将域名指向邮件服务器地址',
    descEn: 'Mail exchange',
  },
  {
    dataKey: 'SRV',
    dataValue: 'SRV',
    desc: '记录提供特定的服务的服务器',
    descEn: 'Service locator',
  },
  {
    dataKey: 'TXT',
    dataValue: 'TXT',
    desc: '文本长度限制512，通常做SPF记录（反垃圾邮件）',
    descEn: 'Text',
  },
  {
    dataKey: 'CAA',
    dataValue: 'CAA',
    desc: 'CA证书颁发机构授权校验',
    descEn: 'Certificate Authority Authorizatio',
  },
];

/**
 * 解析状态
 * */
const recordStatusData = [
  {
    dataKey: EnumRecordStatusData.START,
    dataValue: '开启解析',
  },
  {
    dataKey: EnumRecordStatusData.STOP,
    dataValue: '暂停解析',
  },
  {
    dataKey: EnumRecordStatusData.DowntimeSwitchMonitor,
    dataValue: '宕机切换监控状态',
  },
  {
    dataKey: EnumRecordStatusData.DowntimeSwitchDowntime,
    dataValue: '宕机切换宕机状态',
  },
  {
    dataKey: EnumRecordStatusData.DowntimeToBackupIP,
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
  pageSize: 10,
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
