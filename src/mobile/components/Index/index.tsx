import { memo, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Avatar, Input, Image, Divider } from 'antd-mobile'
import { ShareContent } from '../ShareContent';

import { post } from '../../../fetch';

import styles from './index.module.scss';

export const Index = memo(function (props) {
  const navgate = useNavigate()
  const dispatch = useDispatch()

  const gotoPublic = () => {
    console.log("去发布")
  }
  const img = 'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
  return (
    <div className={styles.mobileIndexContent}>
      <div className={styles.indexHomeHeader}>
        <Avatar src={img} style={{ '--size': '48px' }} />
        <Input
          placeholder='发布状态更新'
        />
        <Image width={50} height={50} src={img} />
      </div>

      <div className={styles.publishBox} onClick={gotoPublic}>
        发布内容
      </div>

      <Divider />

      <div>
        <div> 推荐帖子</div>
        <Divider />
        <ShareContent></ShareContent>
      </div>
    </div>
  )
})
