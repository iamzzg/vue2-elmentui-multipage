import request from '@/utils/request'

// 獲取學生監控狀態
export function getStudentMonitorList() {
  return request({
    url: '/studentmonitor/getStudentMonitorList',
    method: 'get'
  })
}

// 获取学生月度考勤报表
export function getStudentMonthReport(params) {
  return request({
    url: '/attendancereport/getStudentMonthReport',
    method: 'post',
    data: params
  })
}
// 获取班級月度考勤报表
export function getClassMonthReport(params) {
  return request({
    url: '/attendancereport/getClassMonthReport',
    method: 'post',
    data: params
  })
}

// 獲取學生詳細
export function getStudentDetail(data) {
  return request({
    url: '/studentmonitor/getStudentDetail',
    method: 'post',
    data: data
  })
}

//获取班级列表
export function getClassInfoList(data) {
  return request({
    url: '/attendancereport/getClassInfoList',
    method: 'post',
    data: data
  })
}
//修改学生状态
export function changeInschool(data) {
  return request({
    url: '/attend/change_inschool',
    method: 'post',
    data: data
  })
}

//上传图片
export function imgUpload(data) {
  return request({
    url: process.env.VUE_APP_UPLOAD_PREFIX,
    method: 'post',
    data: data
  })
}
//修改学生
export function updateStudentInfo(data) {
  return request({
    url: '/user/updateStudentInfo',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
//修改学生
export function updateParentInfo(data) {
  return request({
    url: '/user/updateParentInfo',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function exportStudentMonthReport(data) {
  return request({
    url: '/attendancereport/export/studentMonthReport',
    method: 'post',
    data: data,
    headers: {
      responseTye: 'arraybuffer'
    }
  })
}
