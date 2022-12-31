import { memo, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Tabs } from 'antd-mobile'
import { Index } from '../components/Index'
import { Friends } from '../components/Friends'

import { CalendarDteail } from '../components/Calendar'


import { post } from '../../fetch';

import styles from './index.module.scss';

export const MobileHome = memo(function (props) {
  const navgate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className={styles.mobileHomeSwrap}>
      <Tabs
        style={{ '--active-line-color': 'rgba(255,255,255,0.1)' }}>
        <Tabs.Tab title='HOME' key='home'>
          <Index></Index>
        </Tabs.Tab>
        <Tabs.Tab title='Friends' key='friends'>
          <Friends></Friends>
        </Tabs.Tab>
        <Tabs.Tab title='Calendar' key='Calendar'>
          <CalendarDteail></CalendarDteail>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
})
