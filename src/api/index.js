import request from '@/utils/request'

export function getStudentMonitorList() {
  return request({
    url: '/studentmonitor/getStudentMonitorList',
    method: 'get'
  })
}
