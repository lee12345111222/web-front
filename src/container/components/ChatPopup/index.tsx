import { memo, useEffect, useState, useRef } from 'react';
import { Image, Modal, Input } from 'antd';
import type { InputRef } from 'antd';
import EmojiPopover from '../EmojiPopover'

const { TextArea } = Input;

import styles from './index.module.scss'

interface ChatPopupProps {
  chatInfo?: { id: string },// 当前聊天对象
  onClose: Function,
  isGroup: number
  //openChat: boolean, // 是否展示聊天
  //onHandleOk?: Function, // 弹窗确认
  //onHandleCancel?: Function, // 弹窗关闭
}

// 聊天对象属性
interface ChatProps {
  headPortrait: string,
  type: string,
  nickname: string,
  date: string,
  content: string,
  user?: { id: string },
}

const list: Array<ChatProps> = [{
  headPortrait: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nickname: 'zhangsan',
  content: '在吗',
  date: '2022',
  type: 'text',
}, {
  headPortrait: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nickname: 'zhangsan',
  content: '在',
  date: '2022',
  user: { id: "1001" },
  type: 'text'
}, {
  headPortrait: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nickname: 'zhangsan',
  content: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  date: '2022',
  type: 'img',
},
{
  headPortrait: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nickname: 'zhangsan',
  content: '在吗',
  date: '2022',
  type: 'text'
}, {
  headPortrait: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nickname: 'zhangsan',
  content: '在',
  date: '2022',
  user: { id: "1001" },
  type: 'text'
}, {
  headPortrait: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nickname: 'zhangsan',
  content: '在吗',
  date: '2022',
  type: 'text'
}, {
  headPortrait: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nickname: 'zhangsan',
  content: '在吗',
  date: '2022',
  type: 'text'
}, {
  headPortrait: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nickname: 'zhangsan',
  content: '在',
  date: '2022',
  user: { id: "1001" },
  type: 'text'
}, {
  headPortrait: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nickname: 'zhangsan',
  content: '在吗',
  date: '2022',
  type: 'text'
}]

const ChatPopup = function (props: ChatPopupProps) {
  const [recordList, setRecordList] = useState(list)
  const [content, setContent] = useState('')
  const inputRef = useRef<InputRef>(null);
  const messagesEnd = useRef<HTMLDivElement>(null);

  console.log(props)
  const { chatInfo = { id: '' }, onClose, isGroup } = props
  //const [openChat, setOpenChat] = useState(false)

  useEffect(() => {
    console.log(inputRef)
    inputRef.current!.focus({
      cursor: 'start',
    });
    scrollToBottom();
  }, [recordList]);

  // 确认
  const handleOk = () => {
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
    setContent(`${e.target.value}`)
  };

  // 选择表情
  const selectEmoji = (value: any) => {
    setContent(`${content}${value}`)
  }

  // 发送消息
  const onSendMsg = () => {
    console.log("发送消息")
    const info = {
      headPortrait: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      nickname: 'zhangsan',
      content: content,
      date: '2022',
      type: 'text'
    }
    setRecordList([...recordList, info])
    setContent('')
  }

  const scrollToBottom = () => {
    if (messagesEnd && messagesEnd.current) {
      console.log("ref滚动到最底部")
    //  const 
      messagesEnd.current.scrollTop =  messagesEnd.current.scrollHeight
     // messagesEnd.current.scrollIntoView(false);
    }
  };

  return (
    <Modal
      title="聊天界面"
      open={true}
      onOk={() => onClose()}
      onCancel={() => onClose()}
      className={styles.chatModal}
      footer={null}
    >
      <div className={styles.playContent}>
        <div
          ref={messagesEnd}
          className={styles.recordList} >
          {recordList.map((item, index) => {
            const { user = { id: '' }, type, content } = item
            return (
              <div
                key={`record_${index + 9}`}
                className={`${user.id === chatInfo.id ? styles.rightItem : ''} ${styles.item}`}>
                <div className={styles.avarImg}>
                  <Image width={30} src={item.headPortrait}></Image>
                </div>
                <div className={styles.leftBox1}>
                  {
                    isGroup && <div className={styles.nickname}>昵称</div>
                  }

                  <div className={styles.content}>
                    {type === 'text' && content}
                    {type === 'img' && <Image width={100} src={content} />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.footer}>
          <div style={{marginLeft:'10px'}}>
          <EmojiPopover onSelect={selectEmoji}></EmojiPopover>
          </div>
          
          <TextArea
            className={styles.input_area}
            value={content}
            ref={inputRef}
            maxLength={100}
            style={{ height: 80, resize: 'none' }}
            onChange={onChange}
            placeholder="请输入..."
          // onInput={onInput}
          />
          <div className={styles.but_area}>
            <button
              className={styles.but}
              onClick={onSendMsg}
            //disabled={!isAllowSend}
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </Modal>

  )
}

export default ChatPopup