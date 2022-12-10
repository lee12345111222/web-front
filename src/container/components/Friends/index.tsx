import { memo, useState } from 'react';
import { Image, Modal } from 'antd';

import styles from './index.module.scss'

interface GropProps {
  friendsList: any[], // 群组礼拜
  addFirends?: Function, // 点击添加好友
  sucHandle?: Function // 点击群组
}

// 群组
const Groups = memo(function (props: GropProps) {
  let { friendsList = [] } = props

  friendsList = [0, 1, 1, 1]
  console.log("groupList", friendsList)

  // 添加群组
  const addFirends = () => {
    console.log("添加群组")
  }
  return (
    <div className={styles.friendsBox}>
      <div className={styles.friendsContent}>
        {
          friendsList.map((item, index) => {
            return <div
              className={styles.friendsAvar}
              key={index + 1}>
              <Image
                preview={false}
                className={styles.img}
                width={80}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            </div>
          })
        }
      </div>
      <div className={styles.addBtn} onClick={addFirends}>
        {/* <Image
          preview={false}
          className={styles.img}
          width={100}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /> */}
        添加朋友
      </div>
    </div>)
})

export default Groups;