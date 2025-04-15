import Component from './Component'
import { QuestionInfoDefaultPropsType } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultPropsType
}
