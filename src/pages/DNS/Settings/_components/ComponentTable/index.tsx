import React, { FC, useEffect } from 'react';
import { FormattedMessage } from 'umi';
import { Button, Table } from 'antd';

import { getDictValue } from '@/utils';

import { ColumnsItem, EnumDNSKeywords, TableData } from '@/types/dns.d';
import { EnumDictKey } from '@/types/basic.d';

// import { antdTableRowClassName } from '@/utils/commont_rely';
import styles from './style.less';

interface pageInit {
  loading: boolean;
  tableData: TableData;
  recordStatusData: any[];
  onChange: (pageSize: number) => void;
  onBtnClick: (type: EnumDictKey, record: ColumnsItem) => void;
}

const ComponentTable: FC<pageInit> = ({
  loading,
  tableData,
  recordStatusData,
  onChange,
  onBtnClick,
}) => {
  useEffect(() => {}, []);

  /**
   *  表格按钮操作事件
   *  */
  const handleTableClick = (type: EnumDictKey, record: ColumnsItem) => {};
  /**
   * 分页切换改变回调事件
   * */
  const handlePageChange = (page: number, pageSize: number) => {
    onChange(page);
    console.log(pageSize);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ColumnsItem[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    /* getCheckboxProps: (record: DataType) => ({
       disabled: record.name === 'Disabled User', // Column configuration not to be checked
       name: record.name,
     }),*/
  };

  const columns = [
    {
      // title: '主机记录',
      title: <FormattedMessage id="dns.keywords.host" />,
      dataIndex: 'name',
      render: (text: string, record: ColumnsItem) => {
        /**
         * name => www.zdns.cn.
         * zone => zdns.cn.
         * */
        let { name, zone } = record;
        name = name.replace(zone, '');
        return name ? name : '@';
      },
    },
    {
      // title: '类型',
      title: <FormattedMessage id="dns.keywords.type" />,
      dataIndex: 'type',
    },
    {
      // title: '线路',
      title: <FormattedMessage id="dns.keywords.line" />,
      dataIndex: 'view',
      render: (text: string) =>
        text === EnumDNSKeywords.OTHERS ? (
          <FormattedMessage id="dns.keywords.others" />
        ) : (
          text
        ),
    },
    {
      // title: '记录值',
      title: <FormattedMessage id="dns.keywords.value" />,
      dataIndex: 'rdata',
    },
    {
      title: 'TTL',
      dataIndex: 'ttl',
    },
    {
      // 状态
      title: <FormattedMessage id="keywords.status" />,
      dataIndex: 'flags',
      render: (text: number) =>
        getDictValue({
          value: text,
          data: recordStatusData,
        }),
    },
    {
      title: <FormattedMessage id="dns.keywords.actions" />,
      dataIndex: 'opt',
      width: '170px',
      className: styles.optStyle,
      render: (text: any, record: ColumnsItem) => {
        const { flags } = record;
        return (
          <>
            <Button
              size="small"
              type="text"
              onClick={() => onBtnClick(EnumDictKey.EDIT, record)}
            >
              <FormattedMessage id="keywords.edit" />
            </Button>
            |
            {flags === 1 && (
              <>
                <Button
                  size="small"
                  type="text"
                  onClick={() => onBtnClick(EnumDictKey.STOP, record)}
                >
                  <FormattedMessage id="dns.btn.stop" />
                </Button>
                |
              </>
            )}
            {flags === 2 && (
              <>
                <Button
                  size="small"
                  type="text"
                  onClick={() => onBtnClick(EnumDictKey.START, record)}
                >
                  <FormattedMessage id="dns.btn.start" />
                </Button>
                |
              </>
            )}
            <Button
              size="small"
              type="text"
              onClick={() => onBtnClick(EnumDictKey.DELETE, record)}
            >
              <FormattedMessage id="keywords.delete" />
            </Button>
          </>
        );
      },
    },
  ];
  const { pageNumber, pageSize, totalItem, list } = tableData;
  return (
    <Table
      loading={loading}
      bordered
      // rowClassName={antdTableRowClassName}
      rowKey="id"
      size="small"
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
      pagination={{
        current: pageNumber,
        pageSize,
        total: totalItem,
        onChange: handlePageChange,
      }}
      columns={columns}
      dataSource={list}
    />
  );
};

export default ComponentTable;
