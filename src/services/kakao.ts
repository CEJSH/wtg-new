declare global {
  interface Window {
    kakao: any
    Geocoder: any
  }
}

export const getPositionsFromData = async (
  data: any,
): Promise<{ title: string; latlng: object; cDay: string }[]> => {
  const geocoder = new window.kakao.maps.services.Geocoder()
  const promises = data.data.map((d: any) => {
    return new Promise((resolve) => {
      geocoder.addressSearch(d['platPlc'], (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK && result[0].x) {
          const newPosition = {
            title: result[0].address.address_name,
            latlng: new window.kakao.maps.LatLng(
              Number(result[0].y),
              Number(result[0].x),
            ),
            cDay: d['realStcnsDay'] || d['stcnsSchedDay'],
          }
          resolve(newPosition)
        } else {
          resolve(null)
        }
      })
    })
  })
  const newPositions = await Promise.all(promises)
  return newPositions.filter((position) => position !== null) as {
    title: string
    latlng: any
    cDay: string
  }[]
}
