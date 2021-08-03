<template>
  <v-dialog
    max-width="400"
    max-height="100%"
    content-class="my-dialog"
    v-model="open"
    >
    <v-card class="match-detail-card">
      <div class="detail-top-bar">
        <v-btn class="px-0">
        <v-icon
          color="black"
          @click="open = false"
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
      <user-detail-card v-if="!loading" :user="user"></user-detail-card>
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
  background-color: white;
  margin:0px;
  max-height:100%;
  height:100%;
}
.my-dialog .match-detail-card.v-card{
  position: relative;
  background: rgba(0, 0, 0, 0.4);
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
