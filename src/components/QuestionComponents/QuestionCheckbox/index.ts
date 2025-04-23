import { QuestionCheckboxDefaultProps } from './interface'

import Component from './Component' // 画布显示组件
import PropComponent from './PropComponent' // 修改属性
export * from './interface' // 导出接口类型

// checkbox 多选组件配置
export default {
  title: '多选',
  type: 'questionCheckbox',
  Component, // 画布显示组件
  PropComponent, // 修改属性
  defaultProps: QuestionCheckboxDefaultProps
}
