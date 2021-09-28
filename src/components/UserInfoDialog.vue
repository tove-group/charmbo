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
        <div>
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
              @click="dislike">
          <img
              :src="require('@/assets/img/x.svg')"
              height="29"
              width="34"
          />
        </div>
        <div class="d-flex align-center justify-center rounded-circle btn-shadow mx-7" 
              style="width:72px;height:72px"
              @click="like"
              >
          <img
              :src="require('@/assets/img/hart.svg')"
              height="29"
              width="34"
          />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import UserDetailCard from '@/components/UserDetailCard.vue';
export default {
  components: {
    UserDetailCard
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
    like: {
      type: Function,
    },
    dislike: {
      type: Function,
    }
  },
  data(){
    return {
      open:false,
      imgConvert:[
        'woman','man','nonsexual'
      ]
    }
  },
  methods: {
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
