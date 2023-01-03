import { memo, useEffect, useState } from 'react';
import { Image, Input, Modal, Form, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux'

import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';


import { post } from '../../../fetch';
import EmojiPopover from '../EmojiPopover'

const { TextArea } = Input;
import styles from './index.module.scss'

interface ShareContentProps {
  shareList: any[]
}

interface ContentProps {
  id: string,
  avatarImg?: string;
  content?: string,
  nickname?: string,
  imgList?: any,
  commentList?: any,
  like?: boolean,
  likeNum?: number,
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });


const page = {
  size: 10,
  current: 1,
  orders: [{
    "column": "id", //排序字段
    "asc": true //是否升序
  }]
}
// 分享

let curCommentIndex = -1;
const ShareContent = memo(function (props: ShareContentProps) {
  const users = useSelector((state: any) => state.users);
  const [shareList, setShareList] = useState<Array<any>>([]);
  const [total, setTotal] = useState(0)
  const [isModalType, setIsModalType] = useState<boolean>(false)
  const [isShowComment, setIsShowComment] = useState<boolean>(false)
  const [form] = Form.useForm();
  const [comment, setComment] = useState('')
  const [content, setContent] = useState('')


  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  console.log(shareList)
  const getShareList = () => {
    post('web/dynamic/queryPageDynamicInfo', {
      userId: users.userId,
      page: page
    }).then(res => {
      const { records, total } = res
      // setShareList([1, 2, 3])
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
    console.log("list", fileList)
    const temp: ContentProps = {
      id: Math.random() * 10 + 1 + '',
      content: content,
      imgList: fileList,
      nickname: 'testname',
      avatarImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
    setIsModalType(false)
    setShareList([...shareList, temp])
    // post('web/dynamic/releaseDynamic', {}).then(res => {
    //   console.log("发布成功")
    // })
  }

  const handleCancel = () => {
    setIsModalType(false)
  }

  const creatDynamic = () => {
    setIsModalType(true)
  }

  const sendComment = () => {
    const tempList = shareList
    if (tempList[curCommentIndex].commentList) {
      tempList[curCommentIndex].commentList.push({
        avatarImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        comment: comment
      })
    } else {
      tempList[curCommentIndex].commentList = [{
        avatarImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        comment: comment
      }]
    }

    setShareList([...tempList])
    setIsShowComment(false)
  }

  // 选择表情
  const selectEmoji = (value: any) => {
    //setContent(`${content}${value}`)
    setContent(`${content}${value}`)
  }

  const onChange = (e: any) => {
    console.log('Change:', e.target.value);
    setComment(`${e.target.value}`)
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const selectAfter = (
    <div className={styles.commenus}>
      <EmojiPopover onSelect={(value: any) => {
        setContent(`${content}${value}`)
      }} />
      <div onClick={sendComment}>send</div>
    </div>
  );

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <div className={styles.shareMoment} onClick={() => {
        setContent('');
        setFileList([]);
        setIsModalType(true);
      }}>
        <Input
          className={styles.shareInput}
          placeholder="Share a moment" />
        <div className={styles.line1} />
        <div className={styles.videoBox}>
          <div>Live video</div>
          <div>Phone/video</div>
        </div>
      </div>
      {

        shareList.length > 0 &&
        <div className={styles.shareBox}>
          {
            shareList.map((item: ContentProps, index) => {
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
                        src={item.avatarImg} />
                    </div>
                    <div className={styles.shareTitle}>
                      <div className={styles.line1}>{item.nickname} </div>
                    </div>
                    <div className={styles.optBtn}>...</div>
                  </div>
                  <div className={styles.sahredContent}>
                    <div className={styles.subTitle}>{item.content}</div>

                    <div className={styles.shareImgs}>
                      <Image.PreviewGroup>
                        {
                          item.imgList.map((img: any, index: number) => {
                            const imglen = item.imgList.length;
                            let width = '50%'
                            if (imglen > 5 && index > 2) {
                              width = '33%'
                            }
                            return <Image
                              key={img.url}
                              className={styles.img}
                              width={width}
                              src={img.thumbUrl} />
                          })
                        }
                      </Image.PreviewGroup>
                    </div>

                    <div className={styles.shareOpt}>
                      <div onClick={addAppreciate}>Like</div>
                      <div onClick={() => {
                        curCommentIndex = index;
                        setIsShowComment(!isShowComment)
                      }}>Comment</div>
                    </div>
                    {
                      isShowComment && curCommentIndex === index &&
                      <div className={styles.commentsBox}>
                        <Input onChange={onChange} addonBefore={selectAfter} />
                      </div>
                    }

                    {
                      <div className={styles.commentsBox}>
                        {
                          item?.commentList && item?.commentList.map((comitem: any) => {
                            return (
                              <div className={styles.comitem}>
                                <Image
                                  preview={false}
                                  className={styles.img}
                                  width={30}
                                  src={comitem.avatarImg} />
                                <div className={styles.bgCom}>{comitem.comment}</div>
                              </div>
                            )
                          })}
                      </div>
                    }
                  </div>
                </div>
              )
            })
          }

          {
            total !== shareList.length && (
              <div className={styles.loadmore} onClick={onLoadMore}>加载更多</div>
            )
          }

        </div>
      }
      <Modal
        title="Create Dynamic"
        open={isModalType}
        onOk={handleOk}
        onCancel={handleCancel}
        className={styles.shareContentModal}
        okText="Publish"
      >
        <div className={styles.content}>
          <TextArea
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              console.log(e.target.value)
            }}
            rows={4} placeholder="share content" />
          <div className={styles.toolsBox}>
            <EmojiPopover onSelect={selectEmoji}></EmojiPopover>
          </div>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </div>
      </Modal>
    </div>
  )
})

export default ShareContent;