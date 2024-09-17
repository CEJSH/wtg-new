import styles from './Search.module.scss'
import classNames from 'classnames/bind'
import { useCallback, useEffect, useState } from 'react'
import { fetchLatLngBCode } from '../hooks/kakao'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

declare global {
  interface Window {
    kakao: any
    Geocoder: any
  }
}

export default function Search() {
  const navigate = useNavigate()
  const [inputPlace, setInputPlace] = useState<string>('')
  const [isKakaoLoaded, setIsKakaoLoaded] = useState<boolean>(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&libraries=services&autoload=false`
    script.async = true

    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log('first loaded')
        setIsKakaoLoaded(true)
      })
    }
  }, [])

  const handleFetchLatLong = useCallback(
    async (place: string) => {
      if (!isKakaoLoaded) {
        console.log(isKakaoLoaded)
        return
      }
      try {
        const result = await fetchLatLngBCode(place)
        if (result) {
          navigate(
            `/map?latitude=${result.lat}&longitude=${result.long}&b_code=${result.b_code}`,
          )
        }
      } catch (error) {
        console.error('Failed to fetch lat/lng/Bcode:', error)
      }
    },
    [isKakaoLoaded],
  )

  const onSearch = () => {
    if (!inputPlace.trim()) {
      alert('지역명을 입력해 주세요')
      return
    } else {
      handleFetchLatLong(inputPlace)
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <input
        onChange={(e) => {
          setInputPlace(e.target.value)
        }}
        value={inputPlace}
        onKeyDown={handleKeyDown}
        className={cx('search-input')}
        placeholder="원하시는 지역명을 입력해 주세요"
      />
      <div
        onClick={() => {
          onSearch()
        }}
        className={cx('search-button')}
      >
        <SearchIcon />
      </div>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg
      height="22"
      viewBox="0 0 48 48"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
      <path d="M0 0h48v48h-48z" fill="none" />
    </svg>
  )
}
