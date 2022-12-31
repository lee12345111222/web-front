import React, { useState } from 'react';
import type { BadgeProps } from 'antd';
import { Badge, Calendar, Modal, Form, Input } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
const { TextArea } = Input;
import styles from './index.module.scss'
console.log(styles)

const monthEns: any = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface contentProps {
  type: string;
  content: string;
}

const getListData = (value: Dayjs, listData: any) => {
  //console.log("value", value)
  const year = value.year();
  const month = value.month() + 1;
  const day = value.date();
  console.log(year, month)
  const curObj = listData[`${year}${month}`];
  if (curObj && curObj[`${day}`]) {
    console.log("8888", curObj.content)
    return curObj[`${day}`]?.content || []
  }
  return []
  // let listData1;
  // switch (value.date()) {
  //   case 8:
  //     listData = [
  //       { type: 'warning', content: 'This is warning event.' },
  //       { type: 'success', content: 'This is usual event.' },
  //     ];
  //     break;
  //   case 10:
  //     listData = [
  //       { type: 'warning', content: 'This is warning event.' },
  //       { type: 'success', content: 'This is usual event.' },
  //       { type: 'error', content: 'This is error event.' },
  //     ];
  //     break;
  //   case 15:
  //     listData = [
  //       { type: 'warning', content: 'This is warning event' },
  //       { type: 'success', content: 'This is very long usual event。。....' },
  //       { type: 'error', content: 'This is error event 1.' },
  //       { type: 'error', content: 'This is error event 2.' },
  //       { type: 'error', content: 'This is error event 3.' },
  //       { type: 'error', content: 'This is error event 4.' },
  //     ];
  //     break;
  //   default:
  // }
  // return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const Calendars: React.FC = () => {

  const [listData, setListData] = useState<any>({})
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [day, setDay] = useState('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [form] = Form.useForm();

  // 日历点击
  const calendarChange1 = (value: any) => {
    console.log("******9999", value)
    //const { $M, $y } = value
    const month = value.month();
    const year = value.year();
    const day = value.date();
    setMonth(month)
    setYear(year)
    setDay(day)
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
    const contentData = getListData(value, listData);
    return (
      <ul
        onClick={() => {
          form.resetFields();
          setIsModalOpen(true);
        }}
        className="events" style={{
          listStyle: 'none',
          paddingLeft: '5px',
        }}>
        {contentData.map((item: contentProps) => (
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

  // 确认
  const handleOk = () => {
    setIsModalOpen(false)
    let tempList = listData;
    const params: any = form.getFieldsValue(true) || {}
    console.log(params)
    const { content } = params
    const curMonthObj = tempList[`${year}${month + 1}`];
    if (curMonthObj) {
      let curObj = curMonthObj[`${day}`]
      if (curObj) {
        tempList[`${year}${month + 1}`][day].content.push({ type: 'warning', content })
      } else {
        tempList[`${year}${month + 1}`][day] = {
          content: [{ type: 'warning', content }]
        }
      }
    } else {
      tempList[`${year}${month + 1}`] = {};
      tempList[`${year}${month + 1}`][day] =
      {
        content: [{ type: 'warning', content }]
      }
    }
    console.log('****1', tempList)
    setListData({ ...tempList })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }


  const _onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.selectDateBox}>
        <div className={styles.curDatetitle}>
          <div className={styles.month}>{monthEns[month]}</div>
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
          onChange={(e) => {
            form.resetFields();
            setIsModalOpen(true);
            calendarChange1(e);
          }}
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender} />
      </div>

      <Modal
        title="Date Deatil"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={styles.playDateModal}
        okText="Create Details"
      >
        <div className={styles.dateDetailContent}>
          <Form
            form={form}
            name="createDateDteail"
            scrollToFirstError
          >
            <Form.Item
              name="time"
              label="time"
              rules={[{ required: true, message: 'please input your time!', whitespace: true }]}
            >
              <Input placeholder="please input time" />
            </Form.Item>

            <Form.Item
              name="content"
              label="content"
              rules={[{ required: true, message: 'please input your content!', whitespace: true }]}
            >
              <TextArea placeholder="place input content" rows={4} />
            </Form.Item>

          </Form>
        </div>
      </Modal>
    </div>
  )
};

export default Calendars;