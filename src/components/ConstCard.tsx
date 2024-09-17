import styles from './ConstCard.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

export default function ConstCard({ data: construction }: { data: any }) {
  const chackGongDay =
    construction.realStcnsDay?.slice(0, 4) +
      '.' +
      construction.realStcnsDay?.slice(4, 6) +
      '.' +
      construction.realStcnsDay?.slice(6) ||
    construction.stcnsSchedDay?.slice(0, 4) +
      '.' +
      construction.stcnsSchedDay?.slice(4, 6) +
      '.' +
      construction.stcnsSchedDay?.slice(6)

  return (
    <li className={cx('wrap-card')}>
      <div className={cx('arch-type')}>{construction?.archGbCdNm || ''}</div>
      <div className={cx('arch-name')}>
        {construction?.bldNm && construction?.bldNm.length > 1
          ? construction.bldNm
          : construction?.platPlc}
      </div>
      {construction?.bldNm && construction?.bldNm.length > 1 && (
        <div className={cx('arch-address')}>{construction?.platPlc}</div>
      )}
      <div className={cx('wrap-d-day')}>
        <div className={cx('d-day')}>착공일</div>
        <div>{chackGongDay}</div>
      </div>
    </li>
  )
}
