import { useSelector } from 'react-redux'
import { storeType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

const useGetComponentInfo = () => {
  const components = useSelector<storeType>(state => state.components) as ComponentsStateType

  const { componentList = [], seleceId, copiedComponent } = components

  // 点击选中的组件
  const selectComponent = componentList.find(c => c.fe_id === seleceId)

  return {
    componentList,
    seleceId,
    // 选中的组件
    selectComponent,
    copiedComponent
  }
}

export default useGetComponentInfo
