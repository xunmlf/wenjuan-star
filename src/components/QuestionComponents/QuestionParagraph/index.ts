import Component from './Component'

import PropComponent from './PropComponent'

import { QuestionParagraphDefaultPropsType } from './interface'

export * from './interface'

// paragraph   组件的配置
export default {
  title: '段落',
  type: 'questionParagraph', // 要和后端统一好
  Component, // 画布中显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionParagraphDefaultPropsType
}
