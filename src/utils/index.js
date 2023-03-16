export const Util = {
  getImgSrcById(id) {
    return `/app/parent/img/render-${id}`
  },
  getStuCardStatus(status) {
    // 1 入园 2 待离开 3 离园 4 請假
    switch (status) {
      case 1:
        return {
          statusText: '入园',
          bgClass: 'bg-success'
        }
      case 2:
        return {
          statusText: '待离开',
          bgClass: 'bg-blue'
        }
      case 3:
        return {
          statusText: '离园',
          bgClass: 'bg-gray'
        }
      case 4:
        return {
          statusText: '請假',
          bgClass: 'bg-orange'
        }
      default:
        return {
          statusText: '未知',
          bgClass: 'bg-gray'
        }
    }
  }
}
