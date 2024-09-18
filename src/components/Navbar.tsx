import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default function Navbar() {
  return (
    <div className={cx('container')}>
      <Link to="/" className={cx('logo')}>
        <img
          src="/assets/wtg-logo.png"
          style={{ verticalAlign: 'initial' }}
          alt="logo"
          height={34}
        />
      </Link>
    </div>
  )
}
