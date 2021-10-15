<template>
  <v-dialog
    max-width="400"
    max-height="100%"
    content-class="my-dialog"
    v-model="open"
    >
    <v-card class="match-detail-card px-6">
      <div class="d-flex justify-space-between align-center py-5">
        <div @click="open = false">
            <v-img
                :src="require('@/assets/img/back.svg')"
                height="56"
                width="56"
            />
        </div>
        <div @click="option = true">
          <v-img
              :src="require('@/assets/img/dotlist.svg')"
              height="24"
              width="24"
          />
        </div>
      </div>
      <div v-if="loading" class="userInfoLoadingSpinner">
        <v-progress-circular
                :size="50"
                :width="7"
                indeterminate
                color="grey"
        ></v-progress-circular>
      </div>
      <user-detail-card v-if="!loading" :user="user"></user-detail-card>
      <div class="d-flex justify-center py-5">
        <div class="d-flex align-center justify-center  rounded-circle btn-shadow mx-7"
              style="width:72px;height:72px"
              @click="$emit('dislike')">
          <img
              :src="require('@/assets/img/x.svg')"
              height="29"
              width="34"
          />
        </div>
        <div class="d-flex align-center justify-center rounded-circle btn-shadow mx-7" 
              style="width:72px;height:72px"
              @click="$emit('like')"
              >
          <img
              :src="require('@/assets/img/hart.svg')"
              height="29"
              width="34"
          />
        </div>
      </div>
    </v-card>
    <report-dialog :dialogOpen.sync="report" @sent="handleReportSent"></report-dialog>
    <option-dialog :dialogOpen.sync="option" type='center' :options="options" @optionCancel="optionCancel" @optionClick="optionClick" ></option-dialog>
    <option-dialog :dialogOpen.sync="option2" title='可以告訴我們檢舉此用戶的原因嗎？' :options="options2" @optionCancel="optionCancel" @optionClick="optionClick2" ></option-dialog>
    <rederect-dialog :dialogOpen.sync="rederect" @exit="handleExit"/>
  </v-dialog>
</template>
<script>
import UserDetailCard from '@/components/UserDetailCard.vue';
import ReportDialog from '@/components/dialog/Report'
import OptionDialog from '@/components/dialog/Option'
import RederectDialog from '@/components/dialog/Rederect'
export default {
  components: {
    UserDetailCard,
    ReportDialog,
    OptionDialog,
    RederectDialog,
  },
  props: {
    user: {
      type: Object,
    },
    dialog: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default:false
    },
  },
  data(){
    return {
      open:false,
      imgConvert:[
        'woman','man','nonsexual'
      ],
      report: false,
      option: false,
      options: [
        { key: 1, text: '檢舉', danger: true, },
      ],
      option2: false,
      options2: [
        { key: 11, text: '盜用他人照片及個人資訊'},
        { key: 12, text: '散佈不實或惡意資訊'},
        { key: 13, text: '散佈不雅照片'},
      ],
      option2select: null,
      rederect: false,
    }
  },
  methods: {
    optionCancel(){
      console.log('cancel')
    },
    optionClick(option){
      console.log(option)
      this.option2 = true
    },
    optionClick2(option){
      console.log(option)
      this.option2select = option.key
      this.report = true
    },
    handleReportSent(reportData){
      this.report = false
      const param = {
        files: reportData.files,
        accused: this.user._id,
        reason: this.option2select,
        detail: reportData.text
      }
      this.$store.dispatch('actionReportUser', param)
        .then(() => {
            this.rederect = true
        }).catch(error => {
            console.log(error);
        })
    },
    handleExit(){
      this.$emit('dislike')
    },
  },
  computed: {
  },
  watch:{
    open: function(value){
      this.$emit('update:dialog',value)
    },
    dialog: function(value){
      this.open = value
    }
  }
};
</script>
<style>
#app .my-dialog{
  background: #FAF9F7;
  margin:0px;
  max-height:100%;
  height:100%;
}
.my-dialog .match-detail-card.v-card{
  background: #FAF9F7;
}
.userInfoLoadingSpinner {
  position:absolute;
  width:100%;
  display: flex;
  justify-content: center;
  top:100px;
}
</style>
