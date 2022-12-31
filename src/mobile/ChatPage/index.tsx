import { memo, useEffect, useState } from 'react';
import { Input, Avatar, Button } from 'antd-mobile'

import { post } from '../../fetch';

import styles from './index.module.scss';

interface contentProps {
  userId: string;
  nickname: string;
  type: string;
  content: string;
}

export const ChatPage = memo(function (props) {

  const userId = '123';
  const [content, setContent] = useState<string>('')
  const [contentList, setContentList] = useState([
    {
      userId: '123',
      nickname: 'test',
      type: 'text',
      content: '在吗'
    }, {
      userId: '567',
      nickname: 'test',
      type: 'text',
      content: '在吗'
    },
    {
      userId: '567',
      nickname: 'test',
      type: 'text',
      content: '在吗'
    }, {
      userId: '567',
      nickname: 'test',
      type: 'text',
      content: '在吗'
    }, {
      userId: '123',
      nickname: 'test',
      type: 'text',
      content: '在吗'
    }
  ])

  const _onChange = (e: any) => {
    setContent(e)
  }

  const onSend = () => {
    const temp = {
      userId,
      nickname: 'test',
      type: 'text',
      content: content
    }
    setContentList([...contentList, temp])
  }
  return (
    <div className={styles.chatSwrap}>
      <div className={styles.content}>
        {
          contentList.map((item, index) => {
            const flexDirection = item.userId !== userId ? 'row-reverse' : 'unset'
            return (
              <div className={styles.contentItem}>
                <div
                  style={{
                    flexDirection
                  }}
                  className={styles.headerBox}
                >
                  <Avatar src='' style={{ '--size': '30px' }} />
                  <div className={styles.content}> {item.content}</div>
                </div>

              </div>
            )
          })
        }

      </div>
      <div className={styles.inputBox}>
        <Input
          onChange={_onChange}
          className={styles.input} placeholder="please chat content"></Input>
        <div>表情</div>
        <Button
          onClick={onSend}
          size='small'
          fill="none"
          color='primary'>
          send
        </Button>
      </div>
    </div >
  )
})
