import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className={cx('container')}>
        <Link to="/" className={cx('logo')}>
          WTG
        </Link>
        {/* <div className={cx('list')}>
          <Link to="/" className={cx('list-item')}>
            맛집 목록
          </Link>
          <Link to="/" className={cx('list-item')}>
            맛집 등록
          </Link>
          <Link to="/" className={cx('list-item')}>
            찜한 가게
          </Link>
          <Link to="/" className={cx('list-item')}>
            마이페이지
          </Link>
        </div> */}
        {/* mobile button */}
        {/* <div
          role="presentation"
          className="button"
          onClick={() => {
            setIsOpen((val) => !val)
          }}
        >
          {isOpen ? <></> : <></>}
        </div> */}
        {/* mobile navbar */}
        {isOpen && (
          <div className="navbar--mobile">
            <div className="list--mobile">
              <Link to="/" className="list--item--mobile">
                맛집 목록
              </Link>
              <Link to="/" className="list--item--mobile">
                맛집 등록
              </Link>
              <Link to="/" className="list--item--mobile">
                찜한 가게
              </Link>
              <Link to="/" className="list--item--mobile">
                마이페이지
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
