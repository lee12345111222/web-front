import { memo, useState } from 'react';
import { Image, Modal } from 'antd';

import styles from './index.module.scss'

interface GropProps {
  childsList: any[], // 小孩列表
  addChilds?: Function, // 添加小孩
  onSucHandle?: Function, // 点击小孩回调
  onDelChild?: Function //删除
}

// 群组
const MyChilds = memo(function (props: GropProps) {
  let { childsList = [], } = props
  // 添加群组
  const _addChilds = () => {
    console.log("添加群组")
    const { addChilds } = props;
    if (addChilds) addChilds()
  }

  const _onSucHandle = () => {
    const { onSucHandle } = props
    if (onSucHandle) onSucHandle()
  }
  return (
    <div className={styles.myChildsBox}>
      <div className={styles.content}>
        {
          childsList.map((item, index) => {
            return <div
              className={styles.childAvar}
              key={index + 1}>
              <Image
                onClick={_onSucHandle}
                preview={false}
                className={styles.img}
                width={70}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            </div>
          })
        }
      </div>
      <div className={styles.addBtn} onClick={_addChilds}>
        {/* <Image
          preview={false}
          className={styles.img}
          width={100}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /> */}
        添加小孩
      </div>
    </div>)
})

export default MyChilds;