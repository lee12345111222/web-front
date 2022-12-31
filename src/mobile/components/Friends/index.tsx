import { memo, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Button, Avatar } from 'antd-mobile'

import { post } from '../../../fetch';

import styles from './index.module.scss';

export const Friends = memo(function (props) {
  const navgate = useNavigate()

  const [userList, setUser] = useState([{
    nickname: '章三',
    avatImg: '',
    userId: '123',
  }, {
    nickname: '章三',
    avatImg: '',
    userId: '123',
  }, {
    nickname: '章三',
    avatImg: '',
    userId: '123',
  }, {
    nickname: '章三',
    avatImg: '',
    userId: '123',
  }])

  useEffect(() => {
    _loadData()
  }, [])

  const _loadData = () => {
    post('', {}).then(res => {
      console.log(res)
    })
  }

  const _onAddUser = () => {
    console.log("add user")
    navgate('/mobile/adduser')

  }

  const _onApplyList = () => {
    console.log("apply list ")
    navgate('/mobile/applylist')
  }

  const _onChatPage = () => {
    console.log("apply list ")
    navgate('/mobile/chatpage')
  }

  return (
    <div className={styles.mobileFriendsContent}>
      <div className={styles.btnBox}>
        <Button
          className={styles.addUser}
          onClick={_onAddUser}
          color='primary' fill='solid'>
          Add User
        </Button>
        <Button
          onClick={_onApplyList}
          className={styles.applyList}
          color='primary' fill='outline'>
          Apply list
        </Button>
      </div>
      <div className={styles.userBox}>
        {
          userList.map(item => {
            const { nickname, avatImg = '', userId } = item
            return (
              <div
                onClick={_onChatPage}
                key={userId} className={styles.userItem}>
                <Avatar src={avatImg} />
                <div className={styles.nickname}>{nickname}</div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
})
