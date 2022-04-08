import { Settings as LayoutSettings } from '@ant-design/pro-layout';

/**
 * 基础数据 - TypeScript
 * */

// 枚举变量数据
export enum EnumDictKey {
  // 清空
  CLEAR = 'clear',
  // 新增
  CREATE = 'create',
  // 删除
  DELETE = 'del',
  // 下载
  DOWN = 'down',
  // 编辑
  EDIT = 'edit',
  // 导出
  EXPORT = 'export',
  // 导入
  IMPORT = 'import',
  // redirect 变量名
  REDIRECT = 'redirect',
  // 重新开始
  RESTART = 'reStart',
  // 查询
  SEARCH = 'search',
  // 开始
  START = 'start',
  // 暂停
  STOP = 'stop',
}

// 用户类型枚举
export enum EnumUserType {
  admin = '1',
  user = '0',
  childUser = '2',
}

// 用户类型枚举
export enum EnumLanguageType {
  en = 'en-US',
  zh = 'zh-CN',
}

type SettlementType = 'online' | 'offline';

export type UserInfo = {
  userId: number;
  userName: string;
  settlementType: SettlementType;
  cellphone: string;
  userType: string;
};

export type ResponseCurrentUser = API.Response & {
  data?: UserInfo;
};

export interface InitialState {
  settings?: Partial<LayoutSettings>;
  currentUser?: UserInfo | undefined;
  fetchUserInfo?: () => Promise<UserInfo | undefined>;
}
