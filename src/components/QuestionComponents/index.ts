import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'

import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'

export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

//  组件的配置
export type ComponentConfigType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

//  全部的组件配置的列表
const componentConfList: ComponentConfigType[] = [QuestionInputConf, QuestionTitleConf]

// 通过 type 获取组件的配置
export function getComponentConfByType(type: string) {
  return componentConfList.find(conf => conf.type === type)
}
