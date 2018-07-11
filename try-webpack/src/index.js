// 文件引用 顺序打包文件=> 文件依赖(顺序)
// require('./style.less')
require('./style/index')
require('./style/normalize')

const { log } = require('./utils')
const format = require('utils/format')
// log('hello world')

log(format('hello world'))
document.querySelector('.superman').style.display = 'block'

log(_.map([1, 2, 3], item => item * 2))