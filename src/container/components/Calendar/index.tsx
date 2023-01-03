import React, { useState } from 'react';
import type { BadgeProps } from 'antd';
import { Badge, Calendar, Modal, Form, Input } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
const { TextArea } = Input;
import styles from './index.module.scss'
console.log(styles)

const monthEns: any = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface ContentProps {
  //type: string;
  title: string;
}

const timeList = [{
  time: 'GMT+08',
}, {
  time: '上午1点',
}, {
  time: '上午2点',
}, {
  time: '上午3点',
}, {
  time: '上午4点',
}, {
  time: '上午5点',
}, {
  time: '上午6点',
}, {
  time: '上午7点',
}, {
  time: '上午8点',
}, {
  time: '上午9点',
}, {
  time: '上午10点',
}, {
  time: '上午11点',
}, {
  time: '下午12点',
}, {
  time: '下午1点',
}, {
  time: '下午2点',
}, {
  time: '下午3点',
}, {
  time: '下午4点',
}, {
  time: '下午5点',
}, {
  time: '下午6点',
}, {
  time: '下午7点',
}, {
  time: '下午8点',
}, {
  time: '下午9点',
}, {
  time: '下午10点',
}, {
  time: '下午11点',
}];

let curDateInfo = {};
let curIndex = -1

const getListData = (value: Dayjs, listData: any) => {
  const year = value.year();
  const month = value.month() + 1;
  const day = value.date();
  console.log(year, month)
  const curObj = listData[`${year}${month}`];
  if (curObj && curObj[`${day}`]) {
    return curObj[`${day}`]?.content || []
  }
  return []
};

let tempTimeList: any = [];

const Calendars: React.FC = () => {
  const [listData, setListData] = useState<any>({})
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [day, setDay] = useState('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false)
  const [form] = Form.useForm();

  // 日历点击
  const calendarChange1 = (value: any) => {
    const month = value.month();
    const year = value.year();
    const day = value.date();
    setMonth(month)
    setYear(year)
    setDay(day)
  }

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
        {contentData.map((item: ContentProps) => {
          console.log(item.title)
          if (!item.title) return null
          return (
            <li
              style={{ color: "red !important" }}
              key={item.title}>
              <Badge color="blue" text={item.title} />
            </li>
          )
        }
        )}
      </ul>
    );
  };

  // 确认
  const handleOk = () => {
    setIsModalOpen(false)
    let tempList = listData;
    const curMonthObj = tempList[`${year}${month + 1}`];
    if (curMonthObj) {
      let curObj = curMonthObj[`${day}`]
      if (curObj) {
        tempList[`${year}${month + 1}`][day].content.push(tempTimeList)
      } else {
        tempList[`${year}${month + 1}`][day] = {
          content: tempTimeList
        }
      }
    } else {
      tempList[`${year}${month + 1}`] = {};
      tempList[`${year}${month + 1}`][day] =
      {
        content: tempTimeList
      }
    }
    setListData({ ...tempList })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const _onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  // oncreateok
  const onCreateOk = (values: any) => {
    listData[curIndex] = Object.assign(curDateInfo, values)
    console.log("date", curDateInfo)
  }

  const openModal = (value: any) => {
    const month = value.month();
    const year = value.year();
    const day = value.date();
    const curMonthObj = listData[`${year}${month + 1}`];
    if (curMonthObj && curMonthObj[day]) {
      tempTimeList = curMonthObj[day].content
    } else {
      tempTimeList = JSON.parse(JSON.stringify(timeList));
    }
    setIsModalOpen(true);
  }

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
            openModal(e);
            calendarChange1(e);
          }}
          dateCellRender={dateCellRender}
        />
      </div>

      {
        isOpenDetail && <CreateDateDetailModal
          curDateInfo={curDateInfo}
          onOk={onCreateOk}
          onClose={() => setIsOpenDetail(false)} />
      }
      <Modal
        title="Date Deatil"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={styles.playDateModal}
        okText="Create Details"
      >
        <div className={styles.dateDetailContent}>
          {
            tempTimeList.map((item: any, index: number) => {
              const { time, title, content } = item
              return (
                <div
                  onClick={
                    () => {
                      curDateInfo = item
                      curIndex = index
                      setIsOpenDetail(true)
                    }
                  }
                  className={styles.timedteialBox} key={`time_${index * 7}`}>
                  <div className={styles.leftTimeBox}>{time}</div>
                  <div className={styles.rightTimeBox}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.content}>{content}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </Modal>
    </div>
  )
};


const CreateDateDetailModal = (props: any) => {
  const [form] = Form.useForm();
  const { onClose, onOk, curDateInfo } = props
  form.setFieldsValue(curDateInfo)
  const handleOk = () => {
    const formValue = form.getFieldsValue(true)
    onOk(formValue)
    onClose()
  }
  const handleCancel = () => {
    onClose()
  }

  return (
    <Modal
      title="Date Deatil"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      className={styles.playDateModal}
      okText="Create Details"
    >
      <div className={styles.dateDetailContent}>
        {
          <Form
            form={form}
            name="createDateDteail"
            scrollToFirstError
          >
            <Form.Item
              name="title"
              label="title"
            >
              <Input value={curDateInfo?.title} placeholder="please input time" />
            </Form.Item>

            <Form.Item
              name="content"
              label="content"
            >
              <TextArea value={curDateInfo?.conent} placeholder="place input content" rows={4} />
            </Form.Item>
          </Form>
        }
      </div>
    </Modal >
  )
}

export default Calendars;