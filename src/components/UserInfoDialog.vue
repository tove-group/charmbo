<template>
  <v-dialog
    max-width="400"
    max-height="100%"
    content-class="my-dialog"
    v-model="dialog"
    >
    <v-card class="match-detail-card">
      <div class="detail-top-bar">
        <v-btn class="px-0">
        <v-icon
          color="black"
          @click="$emit('update:dialog',false)"
          >mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn><v-icon
          color="black"
          >mdi-dots-vertical</v-icon>
          </v-btn>
      </div>
      <div v-if="loading" class="userInfoLoadingSpinner">
        <v-progress-circular
                :size="50"
                :width="7"
                indeterminate
                color="grey"
        ></v-progress-circular>
      </div>
      <div v-if="!loading">
        <v-img 
            :src="user.pictures.main.url"
            class="profile-main-img"
        ></v-img>
      </div>
      <div v-if="!loading" class="mt-n5 detail-data mx-4">
        <div class="d-flex">
          <div class="mr-2">
            {{ user.userName }}
          </div>
          <v-icon color="#f2f2f2" class="mr-2">{{ sexicon }}</v-icon>
          <div class="fs12 mt-1 mr-2">{{ age }}</div>
          <div class="fs12 mt-1">job</div>
          <v-spacer></v-spacer>
          <div class="fs12 mt-1">距離幾公里</div>
        </div>
        <div class="mt-2 mb-2 hobby-area">
          <div
            v-for="(hobby, index) in interestlist"
            :key="index"
            class="match-hobby"
          >
            {{ hobby }}
          </div>
        </div>
        <div class="d-flex justify-space-between pt-1 pb-5">
          <div class="rounded-circle achievement-icon" v-for="i in 5" :key="i"></div>
        </div>
        <div class="mb-5">
          <v-icon color="#F2F2F2">mdi-map-marker</v-icon>
          縣市名
        </div>
        <div>自我介紹</div>
        <div
          class="rounded mb-5"
          style="width:100%;background-color:#E0E0E0;height:50px;color:black;"
        >{{user.summary}}</div>
        <div>生活照</div>
        <v-row dense>
          <v-col cols="6" v-for="img in user.pictures.others" :key="img._id">
            <v-img 
              style="width: 145px; height: 195px;"
              v-if="img.url"
              :src="img.url"
            ></v-img>
            <div
              v-else
              class="rounded"
              style="background-color:#E0E0E0;height:150px"
            ></div>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    user: {
      type:Object,
    },
    dialog:{
      type:Boolean
    },
    loading:{
      type:Boolean,
      default:false
    },
  },
  methods: {
  },
  computed: {
    age() {
      if (this.user.birthday) {
        let now = new Date();
        let birth = new Date(this.user.birthday);
        return parseInt((now - birth) / (1000 * 60 * 60 * 24 * 365));
      }
      return '秘密';
    },
    sexicon() {
      if (this.user.sex != undefined) {
        switch(this.user.sex){
          case 0:
            return 'mdi-gender-female';
          case 1:
            return 'mdi-gender-male';
          default:
            break;
        }
      }
      return 'mdi-gender-female';
    },
    interestlist(){
      if(this.user.interestlist.length === 0)
        return ["hobby"];
      return this.user.interestlist;
    }
  },
};
</script>
<style>
.profile-main-img{
  background-color: slategrey;
}
#app .my-dialog{
  background-color: white;
  margin:0px;
  max-height:100%;
  height:100%;
}
.my-dialog .match-detail-card{
  position: relative;
}
.detail-data{
  background: #4F4F4F;
  padding:16px;
  color:#FFFFFF;
  position:absolute;
  border-radius: 8px;
  width: calc(100% - 32px);
}
.detail-top-bar{
  padding:16px;
  position:absolute;
  width:100%;
  z-index: 2;
  display: flex;
  justify-content: space-between;
}
.userInfoLoadingSpinner {
  position:absolute;
  width:100%;
  display: flex;
  justify-content: center;
  top:100px;
}
</style>
