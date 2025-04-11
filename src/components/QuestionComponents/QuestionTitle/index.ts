/**
 * @description 问卷 标题
 * @author  xunmlf
 */

import Component from './Component'
import PropComponent from './PropCompomemt'

import { QuestionTitleDefaultPropsType } from './interface'

export * from './interface'

// Title 组件的配置
export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 属性配置的组件
  defaultProps: QuestionTitleDefaultPropsType
}
