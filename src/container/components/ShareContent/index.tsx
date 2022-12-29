import { memo, useEffect, useState } from 'react';
import { Button, Image, Input, Modal, Form } from 'antd';
import { useSelector } from 'react-redux'

import { post } from '../../../fetch';


import styles from './index.module.scss'

interface ShareContentProps {
  shareList: any[]
}

const selectAfter = (
  <div className={styles.commenus}>
    <div>表情</div>
    <div>相机</div>
  </div>
);


const page = {
  size: 10,
  current: 1,
  orders: [{
    "column": "id", //排序字段
    "asc": true //是否升序
  }]
}
// 分享
const ShareContent = memo(function (props: ShareContentProps) {
  const users = useSelector((state: any) => state.users);
  const [shareList, setShareList] = useState<Array<any>>([]);
  const [total, setTotal] = useState(0)
  const [isModalType, setIsModalType] = useState<boolean>(false)
  const [form] = Form.useForm();

  //let { shareList } = props;
  //shareList = [1, 2, 3]
  console.log(shareList)
  const getShareList = () => {
    post('web/dynamic/queryPageDynamicInfo', {
      userId: users.userId,
      page: page
    }).then(res => {
      const { records, total } = res
      setShareList([1, 2, 3])
      setTotal(total)
    })
  }

  useEffect(() => { getShareList() }, [])

  // 加载更多
  const onLoadMore = () => {
    page.current++;
    getShareList()
  }

  const addAppreciate = (item: any) => {
    const { dynamicId } = item
    post('web/appreciate/addAppreciate', {
      dynamicId
    }).then(res => {
      console.log("点赞成功")
    })
  }

  // 发布
  const handleOk = () => {
    setIsModalType(false)
    post('web/dynamic/releaseDynamic', {}).then(res => {
      console.log("发布成功")
    })
  }

  const handleCancel = () => {
    setIsModalType(false)
  }

  const creatDynamic = () => {
    setIsModalType(true)
  }


  return (
    <div className={styles.shareBox}>
      <Button onClick={creatDynamic}>创建动态</Button>
      {
        shareList.map((item, index) => {
          return (
            <div
              key={`shareItem_${index + 9}`}
              className={styles.shareItem}>
              <div className={styles.shareHedaer}>
                <div className={styles.shareImg}>
                  <Image
                    preview={false}
                    className={styles.img}
                    width={50}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                </div>
                <div className={styles.shareTitle}>
                  <div className={styles.line1}>内容 </div>
                  <div className={styles.line2}>内容2</div>
                </div>
                <div className={styles.optBtn}>...</div>
              </div>
              <div className={styles.sahredContent}>
                <div className={styles.subTitle}>Merry C... Happy</div>

                <div className={styles.shareImgs}>
                  <Image
                    preview={false}
                    className={styles.img}
                    width={'50%'}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                  <Image
                    preview={false}
                    className={styles.img}
                    width={'50%'}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                  <Image
                    preview={false}
                    className={styles.img}
                    width={'33.3%'}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                  <Image
                    preview={false}
                    className={styles.img}
                    width={'33.3%'}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                  <Image
                    preview={false}
                    className={styles.img}
                    width={'33.3%'}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                </div>
                <div className={styles.shareCollect}>点赞收藏39</div>

                <div className={styles.shareOpt}>
                  <div onClick={addAppreciate}>Like</div>
                  <div>Comment</div>
                </div>

                <div className={styles.commentsBox}>
                  <div className={styles.comImgav}>
                    <Image
                      preview={false}
                      className={styles.img}
                      width={30}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                  </div>
                  <Input addonAfter={selectAfter} />
                </div>
              </div>

            </div>
          )
        })
      }

      {
        total !== shareList.length && (
          <div onClick={onLoadMore}>加载更多</div>
        )
      }

      <Modal
        title="Create Dynamic"
        open={isModalType}
        onOk={handleOk}
        onCancel={handleCancel}
        className={styles.playDateModal}
        okText="Publish"
      >
        <div className={styles.playContent}>
          <Form
            form={form}
            name="register"
            scrollToFirstError
          >
            <Form.Item
              name="title"
              label="title"
              rules={[{ required: true, message: 'Please input title!', whitespace: true }]}
            >
              <Input placeholder="place input title" />
            </Form.Item>

            <Form.Item
              name="content"
              label="content"
              rules={[{ required: true, message: 'Please input content!', whitespace: true }]}
            >
              <Input placeholder="place input content" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
})

export default ShareContent;