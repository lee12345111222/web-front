import React, { Component, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import style from './index.module.scss'
import cns from '../../../utils/toClass'

const emojiList = [
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐คฃ',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐ฅฐ',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐คช',
  '๐คจ',
  '๐ง',
  '๐ค',
  '๐',
  '๐คฉ',
  '๐ฅณ',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐ฃ',
  '๐',
  '๐ซ',
  '๐ฉ',
  '๐ฅบ',
  '๐ข',
  '๐ญ',
  '๐ค',
  '๐ ',
  '๐ก',
  '๐คฌ',
  '๐คฏ',
  '๐ณ',
  '๐ฅต',
  '๐ฅถ',
  '๐ฑ',
  '๐จ',
  '๐ฐ',
  '๐ฅ',
  '๐',
  '๐ค',
  '๐ค',
  '๐คญ',
  '๐คซ',
  '๐คฅ',
  '๐ถ',
  '๐',
  '๐',
  '๐ฌ',
  '๐',
  '๐ฏ',
  '๐ฆ',
  '๐ง',
  '๐ฎ',
  '๐ฒ',
  '๐ฅฑ',
  '๐ด',
  '๐คค',
  '๐ช',
  '๐ต',
  '๐ค',
  '๐ฅด',
  '๐คข',
  '๐คฎ',
  '๐คง',
  '๐ท',
  '๐ค',
  '๐ค',
]

interface IProps {
  onSelect: Function
}

const EmojiPopover = ({ onSelect }: IProps) => {
  const [visible, setVisible] = useState<boolean>(false)

  const switchEmojiModal = (vis: boolean) => {
    setVisible(vis)
  }

  const iconClickHandle = (emoji: string) => {
    onSelect(emoji)
  }

  useEffect(() => {
    addEventListener('click', (e: { target: any }) => {
      if (e.target.getAttribute('datatype') === 'emoji') {
        switchEmojiModal(true)
      } else {
        switchEmojiModal(false)
      }
    })
  }, [])

  return (
    <div className={style.content}>
      <div
        className={style.emoji_wrapper}
        style={{ display: visible ? 'flex' : 'none' }}>
        {emojiList.map((emoji) => (
          <span
            onClick={iconClickHandle.bind(null, emoji)}
            className={style.emoji_item}
            datatype={emoji}
            key={emoji}>
            {emoji}
          </span>
        ))}
      </div>
      <div
        className={cns([style.tool_icon, style.emoji])}
        datatype="emoji"></div>
    </div>
  )
}

export default EmojiPopover;

EmojiPopover.propTypes = {
  onSelect: PropTypes.func.isRequired,
}
