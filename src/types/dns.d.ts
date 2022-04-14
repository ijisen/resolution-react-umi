/**
 * 域名解析 - TypeScript
 * */

export enum EnumDNSKeywords {
  // 默认线路标识符
  OTHERS = 'others',
}

export enum EnumRecordStatusData {
  // 开启解析
  START = 1,
  // 暂停解析
  STOP = 2,
  // 宕机切换监控状态
  DowntimeSwitchMonitor = 16,
  // 宕机切换宕机状态
  DowntimeSwitchDowntime = 32,
  // 宕机切换加入的备份IP
  DowntimeToBackupIP = 64,
}

// 数据字典映射
type DictDataItem = {
  dataKey: string | number;
  dataValue: string | number;
  desc?: string;
};

//  查询参数
export interface SearchDataParams {
  // 必填；待查询解析记录的zone的id，如baidu.com.
  zone?: string;
  // 主机记录 如 www.baidu.com.
  name?: string;
  // 类型 AAAA
  type?: string;
  // 解析记录值
  rdata?: string;
  // 智能线路的id?
  view?: string;
  // 解析记录状态(1=开启解析，2=暂停解析，16=宕机切换监控状态，32=宕机切换宕
  // 机状态，64=宕机切换加入的备份IP)
  flags?: number;
  pageSize?: number;
  pageNumber?: number;
}

// 表格数据Item
export interface ColumnsItem {
  id: string;
  zone: string;
  name: string;
  type: string;
  ttl: number;
  rdata: string;
  view: string;
  viewName: any;
  flags: number;
  note: string;
  rrLists: any;
}

// 表格数据
export type TableData = API.TableResponseData & {
  list?: ColumnsItem[];
};

// models 基础数据格式
export interface InitState {
  searchData: SearchDataParams;
  recordTypeData: DictDataItem[];
  recordStatusData: DictDataItem[];
  tableData: TableData;
}

// 新增||修改表单提交数据格式Item
export interface CreateFormData {
  // 为要添加解析记录的zone的id,如baidu.com.
  zone: string;
  // 解析记录全名，含zone的name,如www.baidu.com.
  name: string;
  // 解析记录类型: A, AW, AAAA...
  type: string;
  // 一般为3600，60~65535
  ttl: number;
  // 记录值，详见
  rdata: string;
  // 智能线路的id，others为默认线路
  view: string;
  // 解析记录状态
  flags: EnumRecordStatusData;
  // 备注，可用于全局查找
  note?: string;
}

// 修改表单提交数据格式Item
export interface EditFormData extends CreateFormData {
  id: string;
}
