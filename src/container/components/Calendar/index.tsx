import React, { useState } from 'react';
import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import styles from './index.module.scss'
console.log(styles)

const monthEns = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};



const Calendars: React.FC = () => {

  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  // 日历点击
  const calendarChange1 = (value: any) => {

    console.log("******9999", value)
    const { $M, $y } = value
    setMonth(monthEns[$M])
    setYear($y)
  }

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li
            style={{ color: "red !important" }}
            key={item.content}>
            <Badge
              status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };


  const _onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.selectDateBox}>
        <div className={styles.curDatetitle}>
          <div className={styles.month}>{month}</div>
          <div className={styles.year}>{year}</div>
        </div>
        <div className={styles.calendarCon}>
          <Calendar fullscreen={false}
            onChange={calendarChange1}
            onPanelChange={_onPanelChange} />
        </div>
      </div>
      <div className={styles.content}>
        <Calendar
          headerRender={() => {
            return null
          }}
          onChange={calendarChange1}
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender} />
      </div>
    </div>
  )

};

export default Calendars;