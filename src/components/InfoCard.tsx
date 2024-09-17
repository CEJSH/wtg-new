import { Link } from 'react-router-dom'
import styles from './InfoCard.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

export default function InfoCard({
  title,
  desc,
}: {
  title: string
  desc: string
}) {
  return (
    <div className={cx('card-container')}>
      <div className={cx('title-container')}>
        <div className={cx('title')}>{title}</div>
      </div>
      {title === '정확한 법정동을 알고싶어요' && (
        <Link
          target="_blank"
          rel="preconnect"
          to={'https://www.code.go.kr/stdcode/regCodeL.do'}
        >
          <button className={cx('btn')}>법정동 확인하기</button>
        </Link>
      )}
      <div className={cx('desc')}>{desc}</div>
    </div>
  )
}
