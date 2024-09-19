import { atom } from 'recoil'

export const mapState = atom<any>({
  key: 'map',
  default: null,
  dangerouslyAllowMutability: true,
})
