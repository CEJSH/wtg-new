import { useQuery } from 'react-query'
import { fetchConstructionData } from '../services/const_db'

export const useFetchConstructionData = (
  b_code: string | null,
  BaseURL: string,
) => {
  return useQuery({
    queryKey: ['getSearchedRegionData', b_code],
    queryFn: () => fetchConstructionData(b_code, BaseURL),
    enabled: !!b_code,
  })
}
