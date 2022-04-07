import { Settings as LayoutSettings } from '@ant-design/pro-layout';

/**
 * 基础数据 - TypeScript
 * */

// 枚举变量数据
export enum EnumDictKey {
  // redirect 变量名
  REDIRECT = 'redirect',
  // 查询
  SEARCH = 'search',
  // 清空
  CLEAR = 'clear',
  // 删除
  DELETE = 'del',
  // 编辑
  EDIT = 'edit',
  // 暂停
  STOP = 'stop',
  // 开始
  START = 'start',
  // 重新开始
  RESTART = 'reStart',
  // 下载
  DOWN = 'down',
  // 导入
  IMPORT = 'import',
  // 导出
  EXPORT = 'export',
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
