import { memo, useEffect, useState } from 'react';
import { Avatar, Image, Divider, Button, Input } from 'antd-mobile'

import { post } from '../../../fetch';

import styles from './index.module.scss';

interface ShareContentProps {
  title: string;
  avatarImg: string;
  content: any;
  date: string;
  isAttention: boolean;
  imgList?: any;
  comment?: string;
}

const demoSrc =
  'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60';
const a = 'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
const list: Array<ShareContentProps> = [{
  title: "test",
  avatarImg: a,
  content: "新年快乐",
  date: '1',
  isAttention: false,
  imgList: [demoSrc, demoSrc, demoSrc]
}, {
  title: "test",
  avatarImg: a,
  content: "开心",
  date: '1',
  isAttention: false
}, {
  title: "test",
  avatarImg: a,
  content: '444454545今天天气不错',
  date: '1',
  isAttention: true,
  imgList: [demoSrc, demoSrc, demoSrc]
}]

export const ShareContent = memo(function (props) {
  const [curComment, setCurComment] = useState<number>(-1)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {

  }, [])

  const _loadData = () => {
    console.log("init data")
    post('', {}).then(res => {
      console.log(res)
    })
  }

  const _onLoadMore = () => {
    console.log("加载更多")
  }
  return (
    <div className={styles.shareContent}>
      {
        list.map((item, index) => {
          const { title, avatarImg, content, date, isAttention, imgList = [] } = item;
          console.log(imgList)
          return (
            <div className={styles.shareItem}>
              <div className={styles.itemHeader}>
                <Avatar src={avatarImg} style={{ '--size': '48px' }} />
                <div className={styles.centerBox}>
                  <div className={styles.line1}>
                    <div className={styles.title}>{title}</div>
                    {
                      isAttention && <div className={styles.attention}> 关注</div>
                    }
                  </div>
                  <div>{date}</div>
                </div>
                <div>...</div>
              </div>

              <div className={styles.content}>
                <div >{content}</div>
                {
                  imgList.length > 0 && (
                    <div className={styles.imgBox}>
                      {
                        imgList.map((img: any, index: number) => {
                          return (
                            <Image
                              style={{ marginRight: '10px' }}
                              key={`img${index + 30}`}
                              src={img} width={70} height={70} fit='fill' />
                          )
                        })
                      }
                    </div>
                  )
                }
                <div className={styles.optBtn}>
                  <Button color='primary' fill='none'>
                    like
                  </Button>
                  <Button onClick={() => {
                    console.log(item)
                    setCurComment(index)
                  }} color='primary' fill='none'>
                    comment
                  </Button>
                </div>
                {
                  curComment === index &&
                  <div className={styles.commenInputBox}>
                    <Input
                      className={styles.input}
                      onBlur={() => { setCurComment(-1) }}
                      value={item.comment}
                      onChange={(e) => {
                        item.comment = e
                        console.log(e, list)
                      }}
                      placeholder="please input comment" />
                    <Button onClick={() => {
                      console.log(item)
                      setCurComment(index)
                    }}
                      color='primary' fill='none'>
                      评论
                    </Button>
                  </div>
                }
              </div>
              <Divider />
            </div>
          )
        })
      }
      {
        list.length !== total &&
        <Button
          block
          onClick={_onLoadMore}
          color='primary' fill='none'>
          加载更多
        </Button>
      }
    </div>
  )
})
