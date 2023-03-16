const fs = require('fs')
const test = fs.readFileSync('./src/styles/_colors.scss', 'utf-8')

const colorsObj = {}
let lines = test.split('\r\n')
const extractReg = /^\$(.+):\s*([^.]*);$/

lines = lines.filter(line => {
  // 过滤注释
  return extractReg.test(line.trim())
})
lines.map(line => {
  const res = extractReg.exec(line)
  res && (colorsObj[res[1]] = res[2])
})

module.exports = colorsObj
