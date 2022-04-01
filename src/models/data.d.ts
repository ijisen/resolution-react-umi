import { ResponseData, SearchDataParams } from '@/services/dns';

export interface InitState {
  searchData: SearchDataParams;
  recordTypeData: any[];
  recordStatusData: any[];
  tableData: ResponseData;
}
