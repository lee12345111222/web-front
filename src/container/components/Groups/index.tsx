import { memo, useState } from 'react';
import { Image, Modal } from 'antd';

import styles from './index.module.scss'

interface GropProps {
  groupList: any[], // 群组礼拜
  activeIndex: number, // 当前显示群组
  addGroup?: Function, // 点击加入群组
  onSucHandle?: Function // 点击群组
}

// 群组
const Groups = memo(function (props: GropProps) {
  let { groupList = [], activeIndex = 0, addGroup, onSucHandle } = props
  console.log("groupList", groupList)
  // 添加群组
  const _addGroups = () => {
    console.log("添加群组")
    if (addGroup) addGroup()
  }

  const _onGroupHandle = (item: any) => {
    if (onSucHandle) onSucHandle(item)
  }

  return (
    <div className={styles.groupsBox}>
      <div className={styles.content}>
        {
          groupList.map((item, index) => {
            return (
              <div
                className={styles.groupAvar}
                key={index + 1}
                onClick={() => { _onGroupHandle(item) }}
              >
                <Image
                  preview={false}
                  className={styles.img}
                  width={activeIndex === index ? 100 : 70}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
              </div>
            )

          })
        }
      </div>
      <div className={styles.addBtn} onClick={_addGroups}>
        {/* <Image
          preview={false}
          className={styles.img}
          width={100}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /> */}
        添加群组
      </div>
    </div>)
})

export default Groups;