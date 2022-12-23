import { memo, useEffect, useState, useRef } from 'react';
import { Image, Modal, Input } from 'antd';
import type { InputRef } from 'antd';

const { TextArea } = Input;

import styles from './index.module.scss'

interface ChatPopupProps {
  curChatInfo?: Object,// 当前聊天对象
  //openChat: boolean, // 是否展示聊天
  //onHandleOk?: Function, // 弹窗确认
  //onHandleCancel?: Function, // 弹窗关闭
}
const list = [{
  avarImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nikiName: 'zhangsan',
  value: '在吗',
  date: '2022',
}, {
  avarImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nikiName: 'zhangsan',
  value: '在',
  date: '2022',
  isSelf: 1
}, {
  avarImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nikiName: 'zhangsan',
  value: '在吗',
  date: '2022'
},
{
  avarImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nikiName: 'zhangsan',
  value: '在吗',
  date: '2022',
}, {
  avarImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nikiName: 'zhangsan',
  value: '在',
  date: '2022',
  isSelf: 1
}, {
  avarImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nikiName: 'zhangsan',
  value: '在吗',
  date: '2022'
}, {
  avarImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nikiName: 'zhangsan',
  value: '在吗',
  date: '2022',
}, {
  avarImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nikiName: 'zhangsan',
  value: '在',
  date: '2022',
  isSelf: 1
}, {
  avarImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  nikiName: 'zhangsan',
  value: '在吗',
  date: '2022'
}]

const ChatPopup = function (props: any) {
  const [recordList, setRecordList] = useState(list)
  const inputRef = useRef<InputRef>(null);
  console.log(props)
  const { onClose, isGroup } = props
  //const [openChat, setOpenChat] = useState(false)

  useEffect(() => {
    console.log(inputRef)
    inputRef.current!.focus({
      cursor: 'start',
    });
  }, []);

  // 确认
  const handleOk = () => {
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
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
        <div className={styles.recordList}>
          {recordList.map((item, index) => {
            const { isSelf } = item
            return (
              <div
                key={`record_${index + 9}`}
                className={`${isSelf === 1 ? styles.rightItem : ''} ${styles.item}`}>
                <div className={styles.avarImg}>
                  <Image width={30} src={item.avarImg}></Image>
                </div>
                <div className={styles.leftBox1}>
                  {
                    isGroup && <div className={styles.nikiname}>昵称</div>
                  }
                  <div className={styles.content}>{item.value}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.footer}>
          <TextArea
            ref={inputRef}
            maxLength={100}
            style={{ height: 80, resize: 'none' }}
            onChange={onChange}
            placeholder="请输入聊天内容"
          />
        </div>
      </div>
    </Modal>

  )
}

export default ChatPopup