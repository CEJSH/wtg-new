import styles from './MapPage.module.scss'
import classNames from 'classnames/bind'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useLocation } from 'react-router-dom'
import Markers from '../components/Markers'
import { useFetchConstructionData } from '../hooks/db'
import ConstCard from '../components/ConstCard'
import { mapState } from '../states'
import Map from '../components/Map'

const cx = classNames.bind(styles)

declare global {
  interface Window {
    kakao: any
    Geocoder: any
  }
}

export default function MapPage() {
  const [search, setSearch] = useState('')
  const map = useRecoilValue(mapState)
  const [finalInputValue, setFinalInputValue] = useState('')
  const [currentConst, setCurrentConst] = useState(null)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const b_code = queryParams.get('b_code')
  const BaseURL =
    process.env.NEXT_PUBLIC_BASE_SERVER_URL || 'http://34.118.200.178:8000'
  const { data } = useFetchConstructionData(b_code, BaseURL)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setFinalInputValue(search)
    }
  }

  return (
    <div>
      <Navbar />
      <div className={cx('wrap-map')}>
        <Map />
        <Markers constData={data} map={map} setCurrentConst={setCurrentConst} />
        <div className={cx('wrap-detail')}>
          <div className={cx('result-title')}>
            <span>이 지역 공사 건수(2023 ~ 2024)</span>
            <input
              className={cx('search-input')}
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="번지를 입력하신 후 엔터를 누르세요"
            />
          </div>
          <ul className={cx('result-wrap')}>
            {data?.data.map((c: any, i: any) => {
              if (finalInputValue == '')
                return <ConstCard data={c} key={`result-${i}`} />
              else if (c.platPlc.includes(finalInputValue))
                return <ConstCard data={c} key={`result-${i}`} />
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
