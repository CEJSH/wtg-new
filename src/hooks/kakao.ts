import { useCallback, useState } from 'react'
import { getPositionsFromData } from '../services/kakao'
declare global {
  interface Window {
    kakao: any
    Geocoder: any
  }
}

export const fetchLatLngBCode = (
  place: string,
): Promise<{ lat: string; long: string; b_code: string } | null> => {
  return new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder()
    geocoder.addressSearch(place, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const {
          x,
          y,
          address: { b_code },
        } = result[0]

        if (b_code.length < 1) {
          alert('행정동명이 아닌 법정동/구의 명칭을 입력해 주세요')
          resolve(null)
        } else {
          resolve({ long: x, lat: y, b_code })
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert(`${place}의 검색결과가 존재하지 않습니다.`)
        resolve(null)
      } else {
        reject(new Error('Failed to fetch location'))
      }
    })
  })
}

export const useFetchPositions = () => {
  const [positions, setPositions] = useState<
    { title: string; latlng: any; cDay: string }[]
  >([])

  const fetchPositions = useCallback(async (data: any) => {
    try {
      const validPositions = await getPositionsFromData(data)
      setPositions(validPositions)
    } catch (error) {
      console.error('Failed to fetch positions:', error)
    }
  }, [])

  return { positions, fetchPositions }
}
