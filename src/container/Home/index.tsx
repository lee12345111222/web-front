import { memo, useState } from 'react';
import Calendars from '../components/Calendar'
import { Image, Modal, Input } from 'antd';

import styles from './index.module.scss'
import Groups from '../components/Groups';
import Friends from '../components/Friends'
import ShareContent from '../components/ShareContent'

// 首页
export const Home = memo(function () {

  const [isModalType, setIsMoalType] = useState(false)

  const creatPlayDate = () => {
    console.log("创建日程")
    setIsMoalType(true)
  }

  const handleOk = () => {
    setIsMoalType(false)
  }

  const handleCancel = () => {
    setIsMoalType(false)
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
          <div onClick={creatPlayDate}>
            Create a Play Date
          </div>
        </div>
      </div>
      <div className={styles.rightBox}>
        <Groups groupList={[]}
          activeIndex={0} />
        <div className={styles.contentBox}>
          <div className={styles.leftConent}>
            <div className={styles.defaultBox}>
              <Image
                className={styles.img}
                width={80}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            </div>

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
            <Friends friendsList={[]}></Friends>
          </div>
        </div>
      </div>

      <Modal
        title=" Create a Play Date"
        open={isModalType}
        onOk={handleOk}
        onCancel={handleCancel}
        className={styles.playDateModal}
      >
        <div className={styles.playContent}> Create a Play Date</div>
      </Modal>
    </div>
  )
})