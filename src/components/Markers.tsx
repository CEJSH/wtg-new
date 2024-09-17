import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFetchPositions } from '../hooks/kakao'

interface MarkerProps {
  map: any
  constData: any[]
  setCurrentConst: Dispatch<SetStateAction<any>>
}

export default function Markers({
  map,
  constData,
  setCurrentConst,
}: MarkerProps) {
  const { positions, fetchPositions } = useFetchPositions()
  const loadKakaoMarkers = () => {
    if (map && positions) {
      // 식당 데이터 마커 띄우기
      positions?.map((construction) => {
        var markerImage = new window.kakao.maps.MarkerImage(
          '/assets/pcrane.png',
          new window.kakao.maps.Size(24, 38),
          {
            offset: new window.kakao.maps.Point(27, 50),
          },
        )
        // 마커를 생성합니다
        var marker = new window.kakao.maps.Marker({
          position: construction.latlng,
          image: markerImage,
        })
        // 마커가 지도 위에 표시되도록 설정한다.
        marker.setMap(map)

        const bgColor = construction.cDay.startsWith('2024')
          ? `rgb(246, 24, 24)`
          : `rgb(250, 131, 76)`
        // 인포윈도우 생성
        const content =
          '<div class="customoverlay" aria-label="Open construction site details" style="padding-bottom: 1px; padding-left: 3px; padding-right: 3px; opacity: 0.7; line-height: 1.4; color: rgb(255, 255, 255); background-color: ' +
          `${bgColor};` +
          'font-size:10px; margin-right:8px; text-overflow: ellipsis;">' +
          `    <span class="title">${construction.title.slice(7)}</span>` +
          '</div>'
        // 커스텀 오버레이 생성
        new window.kakao.maps.CustomOverlay({
          map: map,
          position: construction.latlng,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        })
      })
    }
  }
  if (positions.length > 1) {
    loadKakaoMarkers()
  }

  useEffect(() => {
    if (!!constData && !!map) {
      fetchPositions(constData)
    }
  }, [map, constData])

  return <></>
}
