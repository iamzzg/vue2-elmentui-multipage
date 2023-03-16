class DictArray extends Array {
  constructor(array) {
    if (Array.isArray(array)) {
      super(...array)
    } else {
      super(array)
    }
  }

  findItemByKey(value, key = 'value') {
    return this.find(item => item[key] == value)
  }
}

export const attendanceTypeList = new DictArray([
  { value: 'ontime', id: 'ontime', name: '按時' },
  { value: 'belate', id: 'belate', name: '遲到' },
  { value: 'early', id: 'early', name: '早退' },
  { value: 'absent', id: 'absent', name: '缺卡' },
  { value: 'leave', id: 'leave', name: '請假' }
])

export const genderList = new DictArray([
  { value: 0, id: 0, name: '男' },
  { value: 1, id: 1, name: '女' }
])

export const inSchoolStatusList = new DictArray([
  { value: 1, id: 1, name: '入园' },
  { value: 2, id: 2, name: '待离开' },
  { value: 3, id: 3, name: '离园' },
  { value: 4, id: 4, name: '請假' }
])
