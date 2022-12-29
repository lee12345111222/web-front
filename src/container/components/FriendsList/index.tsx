import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { post } from '../../../fetch';

interface DataType {
  key: React.Key;
  nekiname: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Nekiname',
    dataIndex: 'nekiname',
  },

];

const data: DataType[] = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    nekiname: `Edward King ${i}`,
  });
}

const page = {
  size: 10,
  current: 1,
  orders: [{
    "column": "id", //排序字段
    "asc": true //是否升序
  }]
}

interface TableParams {
  pagination?: TablePaginationConfig;
}

let friendsData: Array<any> = []
const FriendsList = forwardRef((props, ref) => {

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [userIds, setUserIds] = useState<React.Key[]>([]);

  const [friendList, setFriendList] = useState([]);
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  useImperativeHandle(ref, () => ({
    selectedRowKeys: selectedRowKeys,
    userIds: userIds
  }));

  useEffect(() => {
    findFirendData()
  }, [])

  // 获取好友列表
  const findFirendData = () => {
    post('web/partner/queryPagePartnerInfo', { page: page }).then(res => {
      console.log("获取数据好友列表")
      const { records, total, current } = res
      friendsData = [...friendsData, ...records]
      setTotal(total)
      setFriendList(records)
    })
  }

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const getUsersId = (indexs: Array<number>) => {
    indexs.forEach(index => {
      const { userId } = friendsData[index]
      setUserIds([...userIds, userId])
    });
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleTableChange = (pagination: TablePaginationConfig,) => {
    page.current++
    setTableParams({
      pagination,
    });
    findFirendData();
  }

  return (
    <div >
      <div style={{ marginBottom: 16 }}>
      </div>
      <Table
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
});

export default FriendsList;