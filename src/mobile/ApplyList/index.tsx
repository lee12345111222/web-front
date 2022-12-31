import { memo, useEffect, useState } from 'react';
import { Avatar, Button } from 'antd-mobile'

import { post } from '../../fetch';

import styles from './index.module.scss';

export const ApplyList = memo(function (props) {

  const [applyList, setApplyList] = useState([{
    nickname: 'test',
    userId: '1231',
    avatImg: ""
  }, {
    nickname: 'test',
    userId: '1231',
    avatImg: ""
  }]);

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    post('', {}).then(res => {

    })
  }

  const _onAgree = (item: any) => {
    console.log("同意")
    post('', {}).then(res => {

    })
  }

  const _onRefuse = (item: any) => {
    console.log("拒绝")
    post('', {}).then(res => {

    })
  }


  return (
    <div className={styles.applyContent}>
      {
        applyList.map(item => {
          return (<div key={item.userId}>
            <div className={styles.userInfo}>
              <Avatar src='' />
              <div className={styles.nickname}>{item.nickname}</div>
              <Button
                onClick={() => { _onAgree(item) }}
                size='small'
                fill="none"
                color='primary'>
                同意
              </Button>
              <Button
                fill="none"
                onClick={() => { _onRefuse(item) }}
                size='small' color='primary'>
                拒绝
              </Button>
            </div>
          </div>)
        })
      }
    </div>
  )
})
