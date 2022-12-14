import { memo, useState } from 'react';
import { Image, Input } from 'antd';

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


// 群组
const ShareContent = memo(function (props: ShareContentProps) {
  let { shareList } = props;
  shareList = [1, 2, 3]
  console.log(shareList)
  return (
    <div className={styles.shareBox}>
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
                  <div>Like</div>
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
    </div>
  )
})

export default ShareContent;