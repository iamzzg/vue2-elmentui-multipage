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
