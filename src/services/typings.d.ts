// @ts-ignore
/* eslint-disable */

declare namespace API {
  type SettlementType = 'online' | 'offline';

  type UserInfo = {
    userId: number;
    userName: string;
    // online || offline
    settlementType: SettlementType;
    cellphone: string;
    userType: string;
  };

  type Response = {
    success: boolean;
    code: number;
    message: string;
    timestamp: number;
  };

  type ResponseCurrentUser = Response & {
    data?: UserInfo;
  };

  type PageInfo = {
    pageSize?: number;
    pageNumber?: number;
  };

  type ResponseList = Response & {
    data?: PageInfo & {
      list: any[];
    };
  };
}
