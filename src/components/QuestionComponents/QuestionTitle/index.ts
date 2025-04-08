/**
 * @description 问卷 标题
 * @author  xunmlf
 */

import Component from './Component'

import { QuestionTitleDefaultPropsType } from './interface'

export * from './interface'

// Title 组件的配置
export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component,
  defaultProps: QuestionTitleDefaultPropsType
}
