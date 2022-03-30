// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Response = {
    success: boolean;
    code: number;
    message: string;
    timestamp: number;
  };

  type PageInfo = {
    pageSize?: number;
    pageNumber?: number;
    totalItem?: number;
  };

  type SettlementType = 'online' | 'offline';

  type UserInfo = {
    userId: number;
    userName: string;
    // online || offline
    settlementType: SettlementType;
    cellphone: string;
    userType: string;
  };

  type ResponseCurrentUser = Response & {
    data?: UserInfo;
  };

  type ResponseList = Response & {
    data?: PageInfo & {
      list: any[];
    };
  };
}
