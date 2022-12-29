import { memo, useEffect, useState, createRef } from 'react';
import { gapi, loadAuth2 } from "gapi-script";
import Calendars from '../components/Calendar'
import { Image, Modal, Input, Form, Select, message, Button, Badge, Avatar, DatePicker } from 'antd';
import { useSelector } from 'react-redux'
import { post } from '../../fetch';
import Groups from '../components/Groups';
import Friends from '../components/Friends'
import ShareContent from '../components/ShareContent'
import MyChilds from '../components/MyChilds'
import ChatPopup from '../components/ChatPopup';
import FriendsList from '../components/FriendsList'

import 'animate.css';
import styles from './index.module.scss'

const { Option } = Select;


const modalTitle = ['', 'Create a Play Date', 'add Group', 'add Friends', 'add Childs', 'Apply List']
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';


const getEvents = (calendarID: any, apiKey: any, clientId: any, accessToken: any) => {
  console.log(clientId)
  async function initiate() {
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
// 首页
export const Home = memo(function () {
  const [form] = Form.useForm();
  const [messageApi] = message.useMessage();

  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;
  const clientId = process.env.REACT_APP_CLIENT_ID;

  const [isModalType, setIsMoalType] = useState(0)
  const [groupList, setGroupList]: any = useState([1])
  const [friendsList, setFriendsList]: any = useState([1])
  const [childsList, setChildsList]: any = useState([1])
  const [isParents, setIsParents] = useState(true)
  const [openChat, setOpenChat] = useState(false)

  //const friendRef = useRef<any | null>(null);

  const friendRef = createRef<any>();

  const users = useSelector((state: any) => state.users);
  console.log("uuser", users)


  //const chatRef = useRef(null)
  //const chatRef = createRef();

  useEffect(() => {
    getEvents(calendarID, apiKey, clientId, accessToken)
  }, [])

  // 获取附属用户列表
  useEffect(() => {
    getChildList()
  }, [])

  const getChildList = () => {
    post('web/user/queryPageUserInfo', { realName: '', age: '', sex: '' }).then(res => {
      const { records } = res
      setChildsList(records)
    })
  }

  // 确认
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

  // 创建日程成功
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
        content: '创建成功',
      });
      handleCancel()
    }).catch(err => {
      messageApi.open({
        type: 'success',
        content: '创建失败',
      });
    })
    console.log("创建日程成功", params)
  }

  const addGroupSuc = () => {
    console.log("添加成功", friendRef.current.selectedRowKeys)
    //const data = groupList.push(1)
    //setGroupList(...data)
  }

  const addFriendsSuc = () => {
    const data = friendsList.push(1)
    setFriendsList(...data)
  }

  const addChildsSuc = () => {
    console.log("添加小孩", form.getFieldsValue(true))
    const params = form.getFieldsValue(true)
    post('web/user/addOtherUser', params).then(res => {
      console.log("创建成功")
      messageApi.open({
        type: 'success',
        content: '注册成功',
      });
      const data = childsList.push(params)
      setChildsList(...data)
      setIsMoalType(0)
    }).catch(err => {
      messageApi.open({
        type: 'error',
        content: '注册成功',
      });
    })
  }

  const delChilds = (item: any) => {
    const { userId } = item
    post('web/user/delOtherUser', { userId }).then(res => {
      console.log("创建成功")
      messageApi.open({
        type: 'success',
        content: '删除成功',
      });
      const index = childsList.findIndex((item: { userId: any; }) => item.userId === userId)
      childsList.splice(index, 1)
      setChildsList(...childsList)
    }).catch(err => {
      messageApi.open({
        type: 'error',
        content: '删除失败',
      });
    })
  }

  const clickChildHandSuc = (item: any) => {
    setIsParents(false)
    console.log(item)
  }

  const onSucHandle = (info: any) => {
    console.log("当前操作模块")
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
                  onDelChild={delChilds}
                  addChilds={() => {
                    form.resetFields();
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
            isModalType === 2 &&
            <FriendsList ref={friendRef} />
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

        <Form.Item
          name="sex"
          label="Sex">
          <Select
            defaultValue="1"
          >
            <Select.Option value="1">男</Select.Option>
            <Select.Option value="0">女</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
}


interface FriendsProps {
  "userId"?: String, //用户ID
  "username"?: String, //用户名
  "nickname"?: String, //用户昵称
  "userType"?: String, //用户类型[0:超级管理员,1:普通管理员,2:普通用户,3:附属用户]
  "image"?: String, //头像
  "email"?: String, //邮箱
  "sex"?: String, //性别
  "age"?: Number, //年龄
  "realName"?: String //真实姓名
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
        content: '发送成功',
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
        <Button className={styles.findbtn} onClick={findFirend}>查找</Button>
      </div>

      {
        friendInfo.userId &&
        <div className={styles.details}>
          <div>用户名:{friendInfo.username}</div>
          <div>用户昵称:{friendInfo.nickname}</div>
          <div>问候语： <Input onChange={(e) => {
            console.log(e)
            setGreet(e.target.value)
          }} placeholder="place input username/phone" /></div>
          <Button type="primary" className={styles.addFriendBtn} onClick={addFriends}>添加好友</Button>
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

// 获取好友申请列表
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
    console.log("申请列表")
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
        content: '操作成功',
      });
    }).catch(err => {
      console.log(err)
      messageApi.open({
        type: 'error',
        content: '操作失败',
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
            <Button onClick={() => { applyHandle(item, true) }} type="primary">同意</Button>
            <Button onClick={() => { applyHandle(item, false) }} type="primary">拒绝</Button>
          </div>
        </div>)
      })}
    </div>
  )
}


// 创建日历

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