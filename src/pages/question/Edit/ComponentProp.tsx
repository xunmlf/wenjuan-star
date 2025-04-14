import { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentsReducer'
const NoProps = () => {
  return <div>请选择组件</div>
}
const ComponentProp: FC = () => {
  const { selectComponent } = useGetComponentInfo()
  const dispatch = useDispatch()

  // 是否选中画布中的组件
  if (!selectComponent) return <NoProps />

  // 选中的组件 根绝 type 判断组件是什么类型
  const { type, props, isHidden, isLocked } = selectComponent
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return <NoProps />

  function changeProps(newProps: ComponentPropsType) {
    // 修改组件的props
    // console.log(newProps)
    if (selectComponent == null) return
    const { fe_id } = selectComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
    // console.log('fe_id', fe_id, newProps)
  }

  // 获取组件的配置
  const { PropComponent } = componentConf

  return (
    <PropComponent
      {...props}
      onChange={changeProps}
      disabled={isLocked || isHidden}
    ></PropComponent>
  )
}
export default ComponentProp
