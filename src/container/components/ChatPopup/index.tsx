import { memo, useEffect, useState } from 'react';
import { Image, Modal, Input } from 'antd';
import styles from './index.module.scss'

interface ChatPopupProps {
  curChatInfo?: Object,// 当前聊天对象
  //openChat: boolean, // 是否展示聊天
  //onHandleOk?: Function, // 弹窗确认
  //onHandleCancel?: Function, // 弹窗关闭
}

const ChatPopup = function (props: any) {
  console.log(props)
  const { onClose } = props
  //const [openChat, setOpenChat] = useState(false)

  // 确认
  const handleOk = () => {
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Modal
      title="聊天界面"
      open={true}
      onOk={() => onClose()}
      onCancel={() => onClose()}
      className={styles.chatModal}
    >
      <div className={styles.playContent}>
        聊天界面
      </div>
    </Modal>

  )
}

export default ChatPopup