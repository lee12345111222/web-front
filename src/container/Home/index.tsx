import { memo, useEffect, useState, createRef } from 'react';
import { gapi, loadAuth2, loadClientAuth2, loadAuth2WithProps } from "gapi-script";
import Calendars from '../components/Calendar'
import { Image, Modal, Input, Form, Select, message, Button, Badge, Avatar, DatePicker, Radio } from 'antd';
import { useSelector } from 'react-redux'
import { post } from '../../fetch';
import Groups from '../components/Groups';
import Friends from '../components/Friends'
import ShareContent from '../components/ShareContent'
import MyChilds from '../components/MyChilds'
import ChatPopup from '../components/ChatPopup';
import FriendsList from '../components/FriendsList'
//const { google } = require('googleapis');
//import getToken from '../../utils/common'

import 'animate.css';
import styles from './index.module.scss'

const { Option } = Select;


const modalTitle = ['', 'Create a Play Date', 'add Group', 'add Friends', 'add Childs', 'Apply List']
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

const okText = ['', 'Create Date', 'Create Group', 'Add Friends', 'Add Childs']
const okHandle: any = ''



const getEvents = (calendarID: any, apiKey: any, clientId: any, accessToken: any) => {
  console.log(clientId)
  async function initiate() {
    loadClientAuth2(gapi, clientId, 'https://www.googleapis.com/auth/calendar')
    let auth2 = await loadAuth2(gapi, clientId, '');
    //const auth2 = await loadAuth2(gapi, clientId, '')
    console.log("****", auth2)
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
// ??????
export const Home = memo(function () {
  const [form] = Form.useForm();
  const [messageApi] = message.useMessage();

  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;
  const clientId: any = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET: any = process.env.REACT_APP_CLIENT_SECRET;
  const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
  const scopes = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events"];

  const [isModalType, setIsMoalType] = useState(0)
  const [groupList, setGroupList]: any = useState([])
  const [friendsList, setFriendsList]: any = useState([])
  const [childsList, setChildsList]: any = useState([])
  const [isParents, setIsParents] = useState(true)
  const [openChat, setOpenChat] = useState(false)

  //const friendRef = useRef<any | null>(null);

  const friendRef = createRef<any>();

  const users = useSelector((state: any) => state.users);
  console.log("uuser", users)

  //const chatRef = useRef(null)
  //const chatRef = createRef();
  // const oauth2Client = new google.auth.OAuth2(
  //   clientId,
  //   CLIENT_SECRET,
  //   REDIRECT_URL
  // );

  // const url = oauth2Client.generateAuthUrl({
  //   // 'online' (default) or 'offline' (gets refresh_token)
  //   access_type: 'offline',
  //   // If you only need one scope you can pass it as a string
  //   scope: scopes
  // });

  useEffect(() => {
    // oauth2Client()
    //let auth2 = loadAuth2WithProps(gapi, { /* object with props from gapi */ });
    loadClientAuth2(gapi, clientId, 'https://www.googleapis.com/auth/calendar')
    console.log("&&&&", clientId)
    //loadClientAuth2(gapi, clientId, "urn:ietf:wg:oauth:2.0:oob")
    //getEvents(calendarID, apiKey, clientId, accessToken)
  }, [])

  // ????????????????????????
  useEffect(() => {
    getChildList()
  }, [])

  const getChildList = () => {
    post('web/user/queryPageUserInfo', {
      page: {
        size: '100',
        current: '1'
      }
    }).then(res => {
      const { records } = res
      setChildsList(records)
    })
  }

  // ??????
  const handleOk = () => {
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

  // ??????????????????
  const addPlayDateSuc = () => {
    const params = form.getFieldsValue(true)
    let { $y, $M, $D } = params.scheduleDate
    let { $H, $m, $s } = params.scheduleTime
    params.scheduleDate = `${$y}-${$M + 1}-${$D}`
    params.scheduleTime = `${$H}:${$m}:${$s}`
    const userIds = friendRef.current.userIds;
    params.userIds = userIds
    post('web/schedule/addSchedule', params).then(res => {
      messageApi.open({
        type: 'success',
        content: '????????????',
      });
      handleCancel()
    }).catch(err => {
      messageApi.open({
        type: 'success',
        content: '????????????',
      });
    })
    console.log("??????????????????", params)
  }

  const addGroupSuc = () => {
    console.log("????????????", friendRef.current.getUsersId())
    //const data = groupList.push(1)
    //setGroupList(...data)
  }

  const addFriendsSuc = () => {
    const data = friendsList.push(1)
    setFriendsList(...data)
  }

  const addChildsSuc = () => {
    console.log("????????????", form.getFieldsValue(true))
    const params = form.getFieldsValue(true)
    post('web/user/addOtherUser', params).then(res => {
      console.log(123)
      messageApi.open({
        type: 'success',
        content: '????????????',
      });
      setChildsList([...childsList, params])
      setIsMoalType(0)
    }).catch(err => {
      console.log(err)
      messageApi.open({
        type: 'error',
        content: '????????????',
      });
    })
  }

  const delChilds = (item: any, index: number) => {
    const { userId } = item
    post('web/user/delOtherUser', { userId }).then(res => {
      console.log("????????????")
      messageApi.open({
        type: 'success',
        content: '????????????',
      });
      childsList.splice(index, 1)
      setChildsList([...childsList])
    }).catch(err => {
      messageApi.open({
        type: 'error',
        content: '????????????',
      });
    })
  }

  const clickChildHandSuc = (item: any) => {
    setIsParents(false)
    console.log(item)
  }

  const onSucHandle = (info: any) => {
    console.log("??????????????????")
    setOpenChat(true)
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
        <div onClick={() => { setIsMoalType(5) }}>
          <Badge count={5}>
            <Avatar shape="square" size="large" />
          </Badge>
        </div>

        {
          isParents && <Groups
            groupList={groupList}
            activeIndex={0}
            addGroup={() => setIsMoalType(2)}
            onSucHandle={onSucHandle}
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
                // ??????
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
                  onDelChild={delChilds}
                  addChilds={(okHandle: Function) => {
                    okHandle = okHandle
                    form.resetFields();
                    setIsMoalType(4)
                  }} />
              </div>
            }

            <div className={styles.shareContainer}>
              <ShareContent shareList={[]} />
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
              onSucHandle={onSucHandle}
            />
          </div>
        </div>
      </div>

      {openChat && <ChatPopup
        isGroup={1}
        chatInfo={{ id: '1001' }}
        onClose={() => { setOpenChat(false) }} />}

      <Modal
        title={modalTitle[isModalType]}
        open={!!isModalType}
        onOk={handleOk}
        onCancel={handleCancel}
        className={styles.playDateModal}
        okText={okText[isModalType]}
      >
        <div className={styles.playContent}>
          {

            isModalType === 1 && <CreateCalendarContent form={form} friendRef={friendRef} />
          }
          {
            isModalType === 4 && <ChildContent form={form} />
          }
          {
            isModalType === 3 &&
            <AddFirendsConent form={form} />
          }
          {
            isModalType === 2 && (
              <div className={styles.group1}>
                <div className={styles.groupNameBox}>
                  <div className={styles.name}>????????????</div>
                  <Input placeholder="please input groupName" />
                </div>
                <div>
                  <div className={styles.addPerson}>????????????</div>
                  <FriendsList ref={friendRef} />
                </div>

              </div>
            )

          }
          {
            isModalType === 5 &&
            <ApplyListContent />
          }
        </div>
      </Modal>
    </div>
  )
})


const ChildContent = (props: any) => {
  const { form } = props
  return (
    <div>
      <Form
        form={form}
        name="register"
        scrollToFirstError
        labelAlign="right"
        labelCol={{ span: 5, offset: 0 }}
      >
        <Form.Item
          name="realName"
          label="realName"
          rules={[{ required: true, message: 'Please input your realName!', whitespace: true }]}
        >
          <Input placeholder="place input realName" />
        </Form.Item>

        <Form.Item
          name="age"
          label="age"
          rules={[{ required: true, message: 'Please input your age!', whitespace: true }]}
        >
          <Input placeholder="place input age" />
        </Form.Item>

        <Form.Item name="sex" label="Sex">
          <Radio.Group>
            <Radio value="1"> ??? </Radio>
            <Radio value="0"> ??? </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  )
}


interface FriendsProps {
  "userId"?: String, //??????ID
  "username"?: String, //?????????
  "nickname"?: String, //????????????
  "userType"?: String, //????????????[0:???????????????,1:???????????????,2:????????????,3:????????????]
  "image"?: String, //??????
  "email"?: String, //??????
  "sex"?: String, //??????
  "age"?: Number, //??????
  "realName"?: String //????????????
}

const AddFirendsConent = (props: any) => {
  const { form } = props
  const [friendInfo, setFriendInfo] = useState<FriendsProps>({})
  const [greet, setGreet] = useState<String>('')
  const [username, setUsername] = useState<String>('')
  const [messageApi] = message.useMessage();

  const findFirend = () => {
    post('web/partner/findPartner', { username }).then(res => {
      setFriendInfo(res)
    }).catch(err => {
      console.log(err)
    })
  }

  const addFriends = () => {
    const { userId } = friendInfo;
    post('web/partner/applyAddPartner', { userId, greet }).then(res => {
      messageApi.open({
        type: 'success',
        content: '????????????',
      });
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <div>
      <div className={styles.findBox}>
        <Input
          onChange={(e) => {
            console.log(e)
            setUsername(e.target.value)
          }}
          placeholder="place input username/phone" />
        <Button className={styles.findbtn} onClick={findFirend}>??????</Button>
      </div>

      {
        friendInfo.userId &&
        <div className={styles.details}>
          <div>?????????:{friendInfo.username}</div>
          <div>????????????:{friendInfo.nickname}</div>
          <div>???????????? <Input onChange={(e) => {
            console.log(e)
            setGreet(e.target.value)
          }} placeholder="place input username/phone" /></div>
          <Button type="primary" className={styles.addFriendBtn} onClick={addFriends}>????????????</Button>
        </div>
      }
    </div>
  )
}

interface ApplyListProps {
  partnerAddApplyId?: String,
  nickname?: String,
  userId?: String
}

// ????????????????????????
const ApplyListContent = () => {
  const [messageApi] = message.useMessage();

  const [applyList, setApplyList] = useState<Array<ApplyListProps>>([{
    partnerAddApplyId: '123',
    nickname: 'zhangsan '
  }, {
    partnerAddApplyId: '1234',
    nickname: 'zhangsan1 '
  }]);

  useEffect(() => {
    console.log("????????????")
    getApplyList()
  }, [])

  const getApplyList = () => {
    post('web/partner/approveAddPartner', {}).then(res => {
      setApplyList(res)
    }).catch(err => {
      console.log(err)
    })
  }

  const applyHandle = (item: ApplyListProps, approvalStatus: boolean) => {
    const { partnerAddApplyId } = item
    post('web/partner/approveAddPartner', { partnerAddApplyId, approvalStatus }).then(res => {
      messageApi.open({
        type: 'success',
        content: '????????????',
      });
    }).catch(err => {
      console.log(err)
      messageApi.open({
        type: 'error',
        content: '????????????',
      });
    })
  }
  return (
    <div>
      {applyList.map((item) => {
        const { nickname } = item
        return (<div
          className={styles.applyContent}
          key={`applyList_${item.partnerAddApplyId}`}>
          <div className={styles.applyNekiName}>{nickname}</div>
          <div className={styles.applyBtnBox}>
            <Button onClick={() => { applyHandle(item, true) }} type="primary">??????</Button>
            <Button onClick={() => { applyHandle(item, false) }} type="primary">??????</Button>
          </div>
        </div>)
      })}
    </div>
  )
}


// ????????????

const CreateCalendarContent = (props: any) => {
  const { form, friendRef } = props
  return (
    <div>
      <Form
        form={form}
        name="register"
      >
        <Form.Item
          name="name"
          label="name"
          rules={[{ required: true, message: 'Please input active name!', whitespace: true }]}
        >
          <Input placeholder="Please active name" />
        </Form.Item>

        <Form.Item
          name="address"
          label="address"
          rules={[{ required: true, message: 'Please input your address!', whitespace: true }]}
        >
          <Input placeholder="Please input your address" />
        </Form.Item>
        <Form.Item
          name="scheduleDate"
          label="scheduleDate"
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="scheduleTime"
          label="scheduleTime"
        >
          <DatePicker picker="time" />
        </Form.Item>

        <FriendsList ref={friendRef} />

      </Form>
    </div>
  )
}