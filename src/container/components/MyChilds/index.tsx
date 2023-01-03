import { memo, useEffect, useState } from 'react';
import { Image } from 'antd';
import {
  PlusOutlined
} from '@ant-design/icons';

import { post } from '../../../fetch';

import styles from './index.module.scss'

interface GropProps {
  childsList?: any[], // 小孩列表
  addChilds?: Function, // 添加小孩
  onSucHandle?: Function, // 点击小孩回调
  onDelChild?: Function //删除
}

// 群组
const MyChilds = memo(function (props: GropProps) {
  let { childsList = [], } = props
  //const [childsList, setChildList] = useState([])

  // useEffect(() => {
  //   loadChild()
  // }, []);

  // const addChildHandle = (param: { age: string, sex: string, realName: string }) => {
  //   post('web/user/addOtherUser', param).then(res => {
  //     const { records } = res
  //     setChildList(records)
  //   })
  // }

  // 添加小孩
  const _addChilds = () => {
    const { addChilds } = props;
    if (addChilds) addChilds()
  }

  const delChild = (item: any, index: number) => {
    const { onDelChild } = props
    if (onDelChild) onDelChild(item, index)
    // post('web/user/delOtherUser', { userId }).then(res => {
    //   childsList.splice(index, 1)
    //   
    //   if (onDelChild) onDelChild(index)
    // })
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
              <div
                onClick={() => { delChild(item, index) }}
                className={styles.delChild}>删除</div>
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
        <PlusOutlined />
        添加小孩
      </div>
    </div>)
})

export default MyChilds;