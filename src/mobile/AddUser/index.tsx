import { memo, useEffect, useState } from 'react';
import { Input, Button, Avatar, TextArea } from 'antd-mobile'

import { post } from '../../fetch';

import styles from './index.module.scss';

export const AddUser = memo(function (props) {

  const [username, setUserName] = useState('')
  const [userInfo, setUserInfo] = useState<any>({})

  const _onSearch = () => {
    setUserInfo({
      userId: 123,
      nickname: 'test'
    })
  }

  const _onChange = (e: any) => {
    console.log(e)
    setUserName(e)
  }

  return (
    <div className={styles.addUserContent}>
      <div className={styles.headerBox}>
        <Input
          onChange={_onChange}
          className={styles.input} placeholder="phone/email" />
        <Button
          onClick={_onSearch}
          size='large' fill="none" color='primary'>
          Search
        </Button>
      </div>

      {
        userInfo.userId &&
        <div>
          <div className={styles.userInfo}>
            <Avatar src='' />
            <div className={styles.nickname}>{userInfo.nickname}</div>
          </div>
          <div className={styles.tilte}>Send the Add Friend application</div>
          <TextArea placeholder='请输入内容' rows={5} />
          <Button block color='primary' size='large'>
            send
          </Button>
        </div>
      }

    </div>
  )
})
