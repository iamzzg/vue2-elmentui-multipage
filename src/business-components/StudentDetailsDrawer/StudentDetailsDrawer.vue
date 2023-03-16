<template>
  <el-drawer title="學生詳細" v-bind="$attrs" v-on="$listeners" :size="440" @open="handleOpen">
    <section class="p-20px" v-if="infoObj">
      <div class="flex">
        <cn6-image style="width: 130px; height: 130px" class="round"></cn6-image>
        <div class="ml-20px">
          <div>
            <span class="text-20px font-bold text-333">{{ infoObj.userinfo?.name }}</span>
            <i class="el-icon-chat-dot-round text-primary text-26px"></i>
          </div>
          <p class="text-16px text-666 mt-10px mb-20px">{{ infoObj.userinfo?.student_num }}</p>
          <div class="flex items-center">
            <span class="text-14px text-999">狀態：</span>
            <span
              class="h-22px px-10px rounded-11px text-center ml-10px text-white"
              :class="getStuCardStatus(infoObj.userinfo?.card_status).bgClass">
              {{ getStuCardStatus(infoObj.userinfo?.card_status).statusText }}
            </span>
          </div>
          <div class="mt-4px">
            <span class="text-14px text-999">入學時間：</span>
            <span class="text-14px text-666 ml-10px">{{ infoObj.userinfo?.join_date }}</span>
          </div>
        </div>
      </div>
      <el-divider></el-divider>

      <header class="text-333 text-18px font-bold mb-10px">
        家长信息({{ infoObj.parentinfo_userinfoList?.length }})
      </header>
      <div class="flex flex-nowrap overflow-auto custom-scrollbar">
        <div
          v-for="(item, index) in infoObj.parentinfo_userinfoList"
          :key="index"
          class="flex p-10px mr-10px flex-shrink-0"
          style="background-color: #f7f7f7; width: 300px">
          <cn6-image
            :user-id="item.parentinfo_Userinfo_Key?.parent.id"
            style="width: 46px; height: 46px"
            class="round"></cn6-image>
          <div class="ml-20px flex-1">
            <div class="mb-16px flex justify-between">
              <span>
                {{ item.parentinfo_Userinfo_Key.parent?.name }}({{
                  item.parentinfo_Userinfo_Key.parent?.family_relations
                }})
              </span>
              <svg-icon
                icon-class="edit"
                class="text-20px mr-3 text-333 cursor-pointer"
                @click="clickEditParent(item.parentinfo_Userinfo_Key.parent)"></svg-icon>
            </div>
            <div class="flex items-center">
              <i class="el-icon-phone-outline"></i>
              <span class="text-14px text-666 ml-10px">{{
                item.parentinfo_Userinfo_Key.parent?.tel
              }}</span>
            </div>
            <div class="mt-4px flex items-center">
              <i class="el-icon-message"></i>
              <span class="text-14px text-666 ml-10px">{{
                item.parentinfo_Userinfo_Key.parent?.email
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <el-divider></el-divider>

      <header class="text-333 text-18px font-bold mb-16px"
        >今日出入記錄({{ accessRecord.length }})</header
      >
      <el-timeline>
        <el-timeline-item v-for="(record, index) in accessRecord" :key="index" :type="record.type">
          <div class="flex">
            <div class="pr-40px">{{ record.timestamp }}</div>
            <div>
              <div class="flex items-center">
                <span v-if="record.late != undefined" class="mr-10px text-16px text-333">入園</span>
                <span v-else class="mr-10px text-16px text-333">离園</span>
                <span
                  v-if="record.late > 0"
                  class="h-22px text-center rounded-11px px-10px bg-danger text-white">
                  迟到
                </span>
                <span
                  v-else-if="record.leaveEarly > 0"
                  class="h-22px text-center rounded-11px px-10px bg-danger text-white">
                  早退</span
                >
              </div>
              <div v-if="record.parent" class="flex items-center text-14px text-999 mt-10px">
                <span class="mr-10px">接送家長:</span>
                <cn6-image class="w-30px h-30px round mr-10px"></cn6-image>
                <span class="">
                  {{ record.parent.name }}（{{ record.parent.family_relations }}）</span
                >
              </div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
      <el-divider></el-divider>

      <div class="flex flex-wrap">
        <div class="student-operation" v-if="false">
          <img
            :src="require('@/assets/images/student-ask-for-leave.png')"
            alt=""
            style="filter: grayscale(1)" />
          <summary class="text-center mt-10px">学生请假</summary>
        </div>
        <div class="student-operation" v-if="false">
          <svg-icon class="text-34px" icon-class="leave-record"></svg-icon>
          <summary class="text-center mt-10px">請假記錄</summary>
        </div>
        <div class="student-operation" @click="clickAttenanceSupply">
          <svg-icon class="text-34px" icon-class="attendance-supply"></svg-icon>
          <summary class="text-center mt-10px">學生考勤補錄</summary>
        </div>
        <div class="student-operation" @click="ClickEditStudent">
          <svg-icon class="text-34px" icon-class="edit"></svg-icon>
          <summary class="text-center mt-10px">編輯學生</summary>
        </div>
        <div class="student-operation">
          <svg-icon class="text-34px" icon-class="publish-info"></svg-icon>
          <summary class="text-center mt-10px">發佈資訊</summary>
        </div>
        <div class="student-operation">
          <svg-icon class="text-34px" icon-class="result"></svg-icon>
          <summary class="text-center mt-10px">成績單</summary>
        </div>
      </div>
    </section>

    <EditStudentDialog
      v-if="infoObj?.userinfo"
      :visible.sync="editStudentInfoVisible"
      :info="infoObj.userinfo"
      @update="onUpdateStatus"></EditStudentDialog>
    <EditStudentStatusDialog
      v-if="infoObj?.userinfo"
      :visible.sync="editStudentStatusVisible"
      :info="infoObj.userinfo"
      @update="onUpdateStatus"></EditStudentStatusDialog>
    <EditParentDialog :visible.sync="eidtParentVisible" :info="parentInfo"></EditParentDialog>
  </el-drawer>
</template>
<script>
  import { getStudentDetail } from '@/api/index'
  import EditStudentDialog from '../DIalog/EditStudentDialog.vue'
  import EditStudentStatusDialog from '../DIalog/EditStudentStatusDialog.vue'
  import EditParentDialog from '../DIalog/EditParentDialog.vue'
  import dayjs from 'dayjs'
  export default {
    name: '',
    components: { EditStudentDialog, EditStudentStatusDialog, EditParentDialog },
    props: {
      studentId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        infoObj: null,
        accessRecord: [{ timestamp: '2023-03-08', type: 'success' }, { timestamp: '2023-03-08' }],
        // dialog visible
        editStudentInfoVisible: false,
        editStudentStatusVisible: false,
        eidtParentVisible: false,
        // 中间变量
        parentInfo: null
      }
    },
    methods: {
      handleOpen() {
        this.getStudentDetailWrap()
      },
      getStudentDetailWrap() {
        const dataParams = new URLSearchParams()
        dataParams.append('student_id', this.studentId)
        getStudentDetail(dataParams).then(res => {
          this.infoObj = res.oneDate
          this.accessRecord = this.getAccessRecord(res.oneDate.access_logList)
        })
      },
      getAccessRecord(access_logList) {
        const res = []
        access_logList &&
          access_logList.forEach(item => {
            const dayIn = dayjs(item.in_time)
            const dayout = dayjs(item.out_time)
            item.in_time &&
              res.push({
                timestamp: dayIn.format('HH:mm'),
                parent: null,
                type: 'success',
                late: item.is_late_a > 0 || item.is_late_b > 0 ? 1 : 0
              })
            item.out_time &&
              res.push({
                timestamp: dayout.format('HH:mm'),
                parent: {
                  name: item.out_parent.name,
                  family_relations: item.out_parent.family_relations
                },
                leaveEarly: item.is_leaveEarly_a > 0 || item.is_leaveEarly_b > 0 ? 1 : 0,
                leaveReason: item.leaveReasonOne || item.leaveReasonTwo
              })
          })
        return res
      },
      onUpdateStatus() {
        this.$emit('updateData')
        this.getStudentDetailWrap()
      },
      clickAttenanceSupply() {
        this.editStudentStatusVisible = true
      },
      ClickEditStudent() {
        this.editStudentInfoVisible = true
      },
      clickEditParent(parentInfo) {
        this.parentInfo = parentInfo
        this.eidtParentVisible = true
      }
    }
  }
</script>
<style scoped></style>
