import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'

import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'

// 各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

//  组件的配置
export type ComponentConfigType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

//  全部的组件配置的列表
const componentConfList: ComponentConfigType[] = [QuestionInputConf, QuestionTitleConf]

// 对组件进行分组
export const componentConfGroup = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [QuestionTitleConf]
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [QuestionInputConf]
  }
]

// 通过 type 获取组件的配置
export function getComponentConfByType(type: string) {
  return componentConfList.find(conf => conf.type === type)
}
