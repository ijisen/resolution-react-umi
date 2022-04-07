import React, { FC, useEffect } from 'react';
import { Button, Table } from 'antd';

import { getDictValue } from '@/utils';

import { ColumnsItem, TableData } from '@/types/dns';

interface pageInit {
  loading: boolean;
  tableData: TableData;
  recordStatusData: any[];
  onChange: (pageSize: number) => void;
}

const ComponentTable: FC<pageInit> = ({
  loading,
  tableData,
  recordStatusData,
  onChange,
}) => {
  useEffect(() => {}, []);

  const handlePageChange = (page: number, pageSize: number) => {
    onChange(page);
    console.log(pageSize);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
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
      title: '主机记录',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '线路',
      dataIndex: 'view',
    },
    {
      title: '记录值',
      dataIndex: 'rdata',
    },
    {
      title: 'TTL',
      dataIndex: 'ttl',
    },
    {
      title: '状态',
      dataIndex: 'flags',
      render: (text: number) =>
        getDictValue({
          value: text,
          data: recordStatusData,
        }),
    },
    {
      title: '操作',
      dataIndex: 'opt',
      width: '170px',
      render: (text: any, record: ColumnsItem) => {
        const { flags } = record;
        return (
          <>
            <Button size="small" type="text">
              编辑
            </Button>{' '}
            |
            {flags === 1 && (
              <>
                <Button size="small" type="text">
                  暂停
                </Button>{' '}
                |
              </>
            )}
            {flags === 2 && (
              <>
                <Button size="small" type="text">
                  启动
                </Button>{' '}
                |
              </>
            )}
            <Button size="small" type="text">
              删除
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
      // rowClassName={}
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
