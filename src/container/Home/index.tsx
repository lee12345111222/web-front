import { memo, useEffect, useState } from 'react';
import { gapi, loadAuth2 } from "gapi-script";
import Calendars from '../components/Calendar'
import { Image, Modal, Input } from 'antd';
import Groups from '../components/Groups';
import Friends from '../components/Friends'
import ShareContent from '../components/ShareContent'
import MyChilds from '../components/MyChilds'

import 'animate.css';
import styles from './index.module.scss'


const modalTitle = ['', 'Create a Play Date', 'add Group', 'add Friends']
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

const getEvents = (calendarID: any, apiKey: any, clientId: any, accessToken: any) => {
  console.log(clientId)
  async function initiate() {
    //const auth2 = await loadAuth2(gapi, clientId, '')
    //console.log("****", auth2)
    // gapi.client
    //   // .init({
    //   //   apiKey: apiKey,
    //   //   clientId: clientId
    //   //   //discoveryDocs: [DISCOVERY_DOC]
    //   // })
    //   .then(function () {
    gapi.client.request({
      path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
      method: 'GET',
      body: { apiKey: apiKey },
      headers: {
        //"Content-type": "application/json",
        Authorization: `Bearer ya29.a0AeTM1ifgLm0uuGeMSlJxLBeobZp_ywP805xhlxdbNM9u-CQ8PlpJI2odfrA8qUhPVBeAysqnJIgQW07FZNHPAqTDTT93fS6i3ycJiB3swENHwEZtKlijtTfIMP5vz7GS2Q4lQzNzQqMeaKu6Qi4xnhlIE5iqaCgYKAWESARESFQHWtWOmDOX0rw1Gea97vESVrTwUjQ0163`,
      },
    })
      .then(
        (response: any) => {
          let events = response.result.items;
          console.log("events", events)
          return events;
        },
        function (err: any) {
          return [false, err];
        }
      );
  }

  gapi.load("client", initiate);

};
// 首页
export const Home = memo(function () {

  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;
  const clientId = process.env.REACT_APP_CLIENT_ID;
  console.log(process.env)
  console.log(calendarID)
  console.log(apiKey)
  console.log(accessToken)
  console.log(clientId)

  const [isModalType, setIsMoalType] = useState(0)
  const [groupList, setGroupList]: any = useState([1])
  const [friendsList, setFriendsList]: any = useState([1])
  const [childsList, setChildsList]: any = useState([1])
  const [isParents, setIsParents] = useState(true)

  useEffect(() => {
    getEvents(calendarID, apiKey, clientId, accessToken)
  }, [])

  // 确认
  const handleOk = () => {
    setIsMoalType(0)
    switch (isModalType) {
      case 1: addPlayDateSuc(); break;
      case 2: addGroupSuc(); break;
      case 3: addFriendsSuc(); break;
      case 4: addChildsSuc(); break;
      default: break
    }
  }

  const handleCancel = () => {
    setIsMoalType(0)
  }

  const addPlayDateSuc = () => {
    console.log("创建日程成功")
  }

  const addGroupSuc = () => {
    console.log("添加成功")
    const data = groupList.push(1)
    setGroupList(...data)
  }

  const addFriendsSuc = () => {
    const data = friendsList.push(1)
    setFriendsList(...data)
  }

  const addChildsSuc = () => {
    const data = childsList.push(1)
    setChildsList(...data)
  }

  const clickChildHandSuc = (item: any) => {
    setIsParents(false)
    console.log(item)
  }

  return (
    <div className={styles.homeSwrap}>
      <div className={styles.leftBox}>
        <Calendars></Calendars>

        <div className={styles.noneLabel}></div>

        <div className={styles.createBtn}>
          <Image
            width={20}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <div onClick={() => { setIsMoalType(1) }}>
            Create a Play Date
          </div>
        </div>
      </div>
      <div className={styles.rightBox}>
        {
          isParents && <Groups
            groupList={groupList}
            activeIndex={0}
            addGroup={() => setIsMoalType(2)}
          />
        }

        <div className={styles.contentBox}>
          <div className={styles.leftConent}>
            <div
              style={{
                justifyContent: !isParents ? 'space-around' : "flex-start",
              }}
              className={styles.defaultBox}
            >
              {
                !isParents &&
                <div style={{ marginRight: '20px' }}>
                  <Image
                    preview={false}
                    className={`${styles.childAvrImg} animate__animated animate__bounceIn`}
                    width={65}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                </div>
              }
              {
                // 父母
              }
              <Image
                style={{ left: !isParents ? 0 : '30px' }}
                onClick={
                  () => { setIsParents(true) }
                }
                preview={false}
                className={styles.img}
                width={80}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />

            </div>
            {
              isParents && <div className={styles.myChilds}>
                <MyChilds
                  childsList={childsList}
                  onSucHandle={clickChildHandSuc}
                  addChilds={() => {
                    setIsMoalType(4)
                  }} />
              </div>
            }
            <div className={styles.shareMoment}>
              <Input
                className={styles.shareInput}
                placeholder="Share a moment" />
              <div className={styles.line1} />
              <div className={styles.videoBox}>
                <div>Live video</div>
                <div>Phone/video</div>
              </div>
            </div>

            <div className={styles.shareContainer}>
              <ShareContent shareList={[]}></ShareContent>
            </div>

            <div className={styles.knowFriends}>
              <div className={styles.title}> Parents you may know</div>
              <div className={styles.frilist}>
                <div> <Image
                  className={styles.img}
                  width={80}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /></div>
                <div>
                  <Image
                    className={styles.img}
                    width={80}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightContent}>

            <Friends
              title="Friends"
              friendsList={friendsList}
              addFirends={() => setIsMoalType(3)}
            />
          </div>
        </div>
      </div>

      <Modal
        title={modalTitle[isModalType]}
        open={!!isModalType}
        onOk={handleOk}
        onCancel={handleCancel}
        className={styles.playDateModal}
      >
        <div className={styles.playContent}>
          {
            modalTitle[isModalType]
          }
        </div>
      </Modal>
    </div>
  )
})