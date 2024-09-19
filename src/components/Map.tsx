import styles from './Map.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { mapState } from '../states'
import { useSetRecoilState } from 'recoil'

const cx = classNames.bind(styles)

export default function Map() {
  const mapContainer = useRef(null)
  const location = useLocation()
  const setMap = useSetRecoilState(mapState)
  const queryParams = new URLSearchParams(location.search)
  const lat = queryParams.get('latitude')
  const lng = queryParams.get('longitude')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&libraries=services&autoload=false`
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      console.log('loaded')
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(lat, lng)
        const options = {
          center: position,
          level: 4,
        }
        const map = new window.kakao.maps.Map(mapContainer.current, options)
        setMap(map)
      })
    }
  }, [])

  return <div className={cx('map')} ref={mapContainer} />
}
