import Component from './Component'

import PropComponent from './PropComponent'

import { QuestionTextareaDefaultPropsType } from './interface'

export * from './interface'

// questionTextarea  组件的配置
export default {
  title: '多行输入框',
  type: 'questionTextarea', // 要和后端统一好
  Component, // 画布中显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionTextareaDefaultPropsType
}
