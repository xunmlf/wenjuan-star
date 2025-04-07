import Mock from 'mockjs'

Mock.mock('/api/getUserInfo', 'get', () => {
  return {
    code: 0,
    data: {
      name: '张三' + Date.now(),
      age: 18
    }
  }
})
