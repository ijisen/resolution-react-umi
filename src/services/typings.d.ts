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

  type TableResponseData = API.PageInfo & {
    list?: any[];
  };

  type TableResponse = Response & {
    data?: TableResponseData;
  };
}
