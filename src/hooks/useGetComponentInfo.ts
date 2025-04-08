import { useSelector } from 'react-redux'
import { storeType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

const useGetComponentInfo = () => {
  const components = useSelector<storeType>(state => state.components) as ComponentsStateType

  const { componentList = [] } = components

  return {
    componentList
  }
}

export default useGetComponentInfo
