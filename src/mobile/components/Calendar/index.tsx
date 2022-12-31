import { memo, useEffect } from 'react';
import { Calendar } from 'antd-mobile'

import { post } from '../../../fetch';

import styles from './index.module.scss';

export const CalendarDteail = memo(function (props) {

  const defaultSingle = new Date('2022-03-09')
  return (
    <div className={styles.mobileMyContent}>
      <Calendar
        selectionMode='single'
        defaultValue={defaultSingle}
        onChange={val => {
          console.log(val)
        }}
      />
    </div>
  )
})
