import qs from 'qs'
/**
 * 改变window.location
 * @param {*} pathname html 文件位置
 * @param {*} searchObject search对象
 */
export const changeLocationHref = (pathname, searchObject) => {
  if (searchObject) {
    window.location.href =
      process.env.VUE_APP_PUBLIC_PATH + pathname + '?' + qs.stringify(searchObject)
  } else {
    window.location.href = process.env.VUE_APP_PUBLIC_PATH + pathname
  }
}
/**
 * 获取反序列化search对象
 * @returns 返回search对象
 */
export const getLocationSearchObject = () => {
  return qs.parse(window.location.search.slice(1))
}
