import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { post } from '../../../fetch';
import styles from './index.module.scss'

interface DataType {
  key: React.Key;
  nekiname: string;
  userId: number;
  check?: boolean;
}

const data: DataType[] = [];
for (let i = 0; i < 120; i++) {
  data.push({
    key: i,
    nekiname: `Edward King ${i}`,
    userId: i
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


let friendsData: Array<any> = []
const FriendsList = forwardRef((props, ref) => {

  const [userIds, setUserIds] = useState<React.Key[]>([]);

  const [friendList, setFriendList] = useState([]);
  const [total, setTotal] = useState(30)
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    userIds: userIds,
    getUsersId: getUsersId
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

  const getUsersId = () => {
    const userIds: any = [];
    data.forEach(item => {
      const { check, userId } = item
      if (check) {
        userIds.push(userId)
      }
    })
    return userIds
  }

  const onChange = (e: CheckboxChangeEvent, item: DataType) => {
    item.check = e.target.checked
    console.log(`checked = ${e.target.checked}`);
  };


  return (
    <div className={styles.friendsListContainer}>
      {
        data.map(item => {
          return (
            <div className={styles.frienditem} key={item.userId}>
              <div className={styles.check}>
                <Checkbox onChange={(e) => onChange(e, item)} />
              </div>
              <div>{item.nekiname}</div>
            </div>
          )
        })
      }
      {
        //total !== data.length && <div>加载更多</div>
      }
    </div>
  );
});

export default FriendsList;