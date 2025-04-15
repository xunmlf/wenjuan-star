import { FC, useEffect } from 'react'

import { Form, Input, Checkbox } from 'antd'
import { QuestionParagraphPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      text,
      isCenter
    })
  }, [text, isCenter])

  const handelValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <div>
      <Form
        layout='vertical'
        initialValues={{ text, isCenter }}
        form={form}
        onValuesChange={handelValuesChange}
        disabled={disabled}
      >
        <Form.Item
          label='段落内容'
          name='text'
          rules={[{ required: true, message: '请输入段落内容' }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item name='isCenter' valuePropName='checked'>
          <Checkbox>是否居中</Checkbox>
        </Form.Item>
      </Form>
    </div>
  )
}

export default PropComponent
