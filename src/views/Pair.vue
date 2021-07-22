<template>
  <div class="page-pair max-width">
    <div class="d-flex justify-space-between align-center py-4 px-8">
      <div>
        <v-img
            contain
            :src="require('@/assets/charmbo.svg')"
            width="160"
        />
      </div>
      <div
          class=""
          @click="filterClick">
          <v-img
              :src="require('@/assets/img/filter.svg')"
              height="56"
              width="56"
          />
      </div>
    </div>
    <div class="po-relative text-align-center">
      <filter-card
        :filterParam="filterParam"
        v-show="showFilter" class="po-absolute filter-card"></filter-card>
      <div v-if="loading" class="pairLoadingSpinner">
        <v-progress-circular
          :size="50"
          :width="7"
          indeterminate
          color="grey"
        ></v-progress-circular>
      </div>
      <div v-else-if="focusUser && !focusUser.default">
        <div
          class="mx-6 user-card"
        >
          <div>
            <v-img
              contain
              :src="getImg(focusUser)"
            ></v-img>
          </div>
          <div class="d-flex justify-space-between pt-3 px-4">
            <div class="fs-24">{{ focusUser.userName}}</div>
            <div><v-img
              contain
              :src="sexIcon"
            ></v-img></div>
          </div>
          <div class="d-flex fs-12 px-4">
            <div class="mr-4">{{age}}</div>
            <div class="mr-4">{{horoscope}}</div>
            <div class="">{{focusUser.job}}</div>
            <div class="ml-auto">距離幾公里</div>
          </div>
          <div class="px-4 pt-1 hobby-area d-flex flex-wrap">
            <div v-for="(hobby, index) in focusUser.interestlist" class="match-hobby px-3 py-1 mr-2 mb-2" :key="index" :class="[nowColor]">{{hobby}}</div>
          </div>
          <div class="pb-5"></div>
          <user-info-dialog :user="focusUser" :dialog.sync="infoDialog"></user-info-dialog>
          <!-- <v-btn icon style="float:right;" @click.stop="infoDialog = true">
            <v-icon color="white">mdi-format-list-bulleted</v-icon>
          </v-btn> -->
          <!-- <div class="filter-div" :class="[filterColor]"></div> -->
          <!-- <div class="match-data">
            
            

            <div class="d-flex justify-space-between pt-1 pb-1">
              <div @click="setAchieve(i)" class="rounded-circle achievement-icon" :class="[getColor(i)]" v-for="i in 5" :key="i"></div>
            </div>
          </div> -->
        </div>
        <div class="d-flex justify-center my-5">
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
        <!-- <div class="d-flex likeButtonSet">
          <v-btn width="190" height="70" elevation="5" @click="dislike">
            不喜歡
            <v-icon right size="35" class="ml-4">
              mdi-close
            </v-icon>
          </v-btn>
          <v-btn width="190" height="70" elevation="5" @click="like">
            喜歡
            <v-icon right color="pink" size="35" class="ml-4">
              mdi-heart
            </v-icon>
          </v-btn>
        </div> -->
      </div>
      <div v-else>沒人可以配對了</div>
    </div>
    <footer-bar activeTab="pair"></footer-bar>
  </div>
</template>
<script>
import UserInfoDialog from '../components/UserInfoDialog.vue';
import FooterBar from '../components/Footer.vue';
import FilterCard from '../components/FilterCard.vue';
import { debounce } from "lodash";
export default {
  components:{
    UserInfoDialog,
    FooterBar,
    FilterCard
  },
  data() {
    return {
      focusUser: {
        default:true,
        name: {},
      },
      users: [],
      loading:true,
      nowAchieve:0,
      infoDialog:false,
      showFilter:false,
      filterParam:{
        ageRange:[0,100],
        distanceRange:[0,160],
        sex:-1
      },
      imgConvert:[
        'woman','man','nonsexual'
      ]
    };
  },
  created() {
    this.debounceLike = debounce(this.like, 500); //debounce 0.5sec
    this.debounceDislike = debounce(this.dislike, 500); //debounce 0.5sec
  },
  mounted() {
    this.$store.dispatch('actionPairList').then((response) => {
      this.users = response.data;
      this.users = this.users.filter(
        (user) => user._id != this.$store.state.userinfo._id
      );
      this.users.forEach(
        (user) => {
          if(!user.userName){
            user.userName = 'unknow';
            if(user.name && user.name.nickName)
              user.userName = user.name.nickName;
          }
        }
      );
      this.focusUser = this.users.shift();
      this.loading = false;
      
    });
  },
  computed:{
    horoscope(){
      let birth = new Date(this.focusUser.birthday);
      let month = birth.getMonth()+1;
      let date = birth.getDate();
      if (month == 1 && date >=20 || month == 2 && date <=18) return "水瓶座";
      if (month == 2 && date >=19 || month == 3 && date <=20) return "雙魚座";
      if (month == 3 && date >=21 || month == 4 && date <=19) return "牧羊座";
      if (month == 4 && date >=20 || month == 5 && date <=20) return "金牛座";
      if (month == 5 && date >=21 || month == 6 && date <=21) return "雙子座";
      if (month == 6 && date >=22 || month == 7 && date <=22) return "巨蟹座";
      if (month == 7 && date >=23 || month == 8 && date <=22) return "獅子座";
      if (month == 8 && date >=23 || month == 9 && date <=22) return "處女座";
      if (month == 9 && date >=23 || month == 10 && date <=22) return "天秤座";
      if (month == 10 && date >=23 || month == 11 && date <=21) return "天蠍座";
      if (month == 11 && date >=22 || month == 12 && date <=21) return "射手座";
      if (month == 12 && date >=22 || month == 1 && date <=19) return "摩羯座";
      return '水瓶座';
    },
    age(){
      if(this.focusUser.birthday){
          let now = new Date();
          let birth = new Date(this.focusUser.birthday);
          return parseInt((now - birth) / (1000*60*60*24*365));
      }
      return '秘密';
    },
    nowColor(){
      return 'color' + this.nowAchieve;
    },
    filterColor(){
      return 'filter-color' + this.nowAchieve;
    },
    sexIcon(){
      return require('@/assets/img/'+ (this.imgConvert[this.focusUser.sex] || 'nonsexual') +'.svg')
    }
  },
  methods: {
    getImg(item) {
      if(item && item.pictures && item.pictures.main && item.pictures.main.url){
          return item.pictures.main.url;
      }
      let type = item._id || "1234567890abcdef".charAt(Math.floor(Math.random()*16));
      let sex = item.sex;
      if(typeof sex == "undefined" || sex == null)
          sex = "01".charAt(Math.floor(Math.random()*2));
      let s = sex == 0 ? 'g' : 'b';
      let e = type.charAt(type.length - 1);
      item.pictures.main.url = require('../assets/img/avatars/'+s+e+'.svg');
      return item.pictures.main.url;
    },
    like() {
      this.$store
        .dispatch('actionPairLike', { likeId: this.focusUser._id })
        .then(() => {
          this.focusUser = this.users.shift();
        });
    },
    dislike() {
      this.$store
        .dispatch('actionPairDislike', { dislikeId: this.focusUser._id })
        .then(() => {
          this.focusUser = this.users.shift();
        });
    },
    setAchieve(i){
      this.nowAchieve = i;
      console.log(i)
    },
    getColor(i){
      return 'color' + i;
    },
    filterClick(){
      if(this.showFilter){
        let param={
          sex:this.filterParam.sex,
          min_age:this.filterParam.ageRange[0],
          max_age:this.filterParam.ageRange[1],
          min_dist:this.filterParam.distanceRange[0] * 1000,
          max_dist:this.filterParam.distanceRange[1] * 1000,
          lat:121,
          lng:25
        }
        if(param.sex == -1) delete param.sex;
        
        if(param.max_age == 100)
          if(param.min_age == 18) delete param.max_age;
          else param.max_age = 200;

        if(param.max_dist == 160000)
          if(param.min_dist == 0) delete param.max_dist;
          else param.max_dist = 9999999999
        
        this.$store.dispatch('actionPairList',param).then((response) => {
          this.users = response.data;
          this.users = this.users.filter(
            (user) => user._id != this.$store.state.userinfo._id
          );
          this.users.forEach(
            (user) => {
              if(!user.userName){
                user.userName = 'unknow';
                if(user.name && user.name.nickName)
                  user.userName = user.name.nickName;
              }
            }
          );
          this.focusUser = this.users.shift();
          this.loading = false;
        });
      }
      this.showFilter = !this.showFilter
    }
    
  },
};
</script>
<style>
.name-text {
  max-width: 264px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
}
.text-box-time {
  color: #979797;
  font-size: 12px;
}
.reverse {
  flex-direction: row-reverse;
}
.h-100 {
  height: 100%;
}
.match-title{
  font-size: 24px;
  line-height: 36px;
  margin:30px;
}
.match-hello{
  background: #F2F2F2;
  border-radius: 0px 24px 24px 24px;
  margin:16px;
  padding: 8px 16px;
  font-size: 12px;
}
.match-data{
  background: #4F4F4F;
  padding:16px;
  color:#FFFFFF
}
.achievement-icon{
  width: 48px;
  height: 48px;
  background: #F2F2F2;
}
.match-hobby{
  background: #E0E0E0;
  border-radius: 40px;
  color: #333333;
  word-break: keep-all;
}
.hobby-area{
  overflow: hidden;
  height: 36px;
}
.match-card{
  position: relative;
  background-color: #BDBDBD !important;
}
.filter-div{
  position:absolute;
  height:300px;
  width:326px;
  top: 0px;
}
.color1{
  background: linear-gradient(133.68deg, #FFA573 0%, #FAD860 100%);
  color:white
}
.color2{
  background: linear-gradient(133.68deg, #24C1BD 0%, #07ECC2 100%);
  color:white
}
.color3{
  background: linear-gradient(133.68deg, #8E6EE9 0%, #EE8FFD 100%);
  color:white
}
.color4{
  background: linear-gradient(133.68deg, #0488E8 0%, #29C5F7 100%);
  color:white
}
.color5{
  background: linear-gradient(135.89deg, #F9D41B 0%, #EDF05C 100.3%);
  color:white
}
.filter-color1{
  background-image:linear-gradient(133.8deg, #FFA573 -0.96%, rgba(251, 199, 102, 0.336207) 33.22%, rgba(250, 216, 96, 0) 60.04%);
}
.filter-color2{
  background-image:linear-gradient(133.8deg, #24C1BD -0.96%, rgba(251, 199, 102, 0.336207) 33.22%, rgba(250, 216, 96, 0) 60.04%);
}
.filter-color3{
  background-image:linear-gradient(133.8deg, #8E6EE9 -0.96%, rgba(251, 199, 102, 0.336207) 33.22%, rgba(250, 216, 96, 0) 60.04%);
}
.filter-color4{
  background-image:linear-gradient(133.8deg, #0488E8 -0.96%, rgba(251, 199, 102, 0.336207) 33.22%, rgba(250, 216, 96, 0) 60.04%);
}
.filter-color5{
  background-image:linear-gradient(133.8deg, #F8D620 -0.96%, rgba(239, 237, 84, 0) 49.52%);
}
.page-pair{
    display: grid;
    height: 100vh;
    grid-template-rows: auto 1fr auto;
}
.likeButtonSet {
  display: flex;
  justify-content: space-between;
  margin-top:15px;
}
.pairLoadingSpinner {
  display: flex;
  justify-content: center;
  margin-top: 50%;
}
.filter-card{
  z-index: 1;
}
.user-card{
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25), 0px 3px 15px rgba(0, 0, 0, 0.05);
  width: calc(400px - 48px);
}
.btn-shadow{
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
