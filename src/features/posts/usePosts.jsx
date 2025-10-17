import { useContext } from 'react'
import PostContext from './PostContext'

export const usePostAction = () => {
  return useContext(PostContext)
}
