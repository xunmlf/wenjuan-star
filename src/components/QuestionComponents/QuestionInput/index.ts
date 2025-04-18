/**
 * @description 问卷 输入框
 */

import Component from './Component'
import PropComponent from './PropComponent'

import { QuestionInputDefaultPropsType } from './interface'

export * from './interface'

// Input 组件的配置
export default {
  title: '输入框',
  type: 'questionInput',
  Component,
  PropComponent, // 属性配置的组件
  defaultProps: QuestionInputDefaultPropsType
}
