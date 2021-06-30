<template>
  <div>
    <div class="wrapper-view" ref="wrapper">
      <div class="wrapper-container">
        <div v-if="!item.pinned" @click="pinClick" class="pin-area charmbo-bgcolor-primary" >
          <v-icon color="white">mdi-pin</v-icon>
          有點在意
        </div>
        <div v-else @click="pinClick" class="pin-area-unpind charmbo-bgcolor-secondary">
          <v-icon color="white">mdi-pin-off</v-icon>
          取消置頂
        </div><div class="content-area px-2 d-inline-flex justify-start" @click="$emit('clickItem',item)">
              <div class="ri-col-1 d-flex align-center justify-center">
                <div>
                  <v-avatar size="48">
                    <v-img
                        :src="getImg(item)"
                        class="rounded-circle mx-auto"
                    ></v-img>
                  </v-avatar>
                  <div v-if="item.pinned" class="rounded-circle pind-img charmbo-bgcolor-primary"><v-icon color="white" size="10">mdi-pin</v-icon></div>
                </div>
              </div>
              <div class="ri-col-2 d-flex flex-column justify-center pl-2">
                <div class="name-text fw-semi-bold" :class="hasUnread || item.message.length == 0?'charmbo-text-color1':'charmbo-text-color4'">
                  {{ item.userName }}
                  <span class="dot" v-if="item.onlineStatus"></span>
                </div>
                <div class="mt-2">
                  <!-- <div v-if="item.isTyping">
                    <div class="typingIndicatorContainer">
                      <div class="typingIndicatorBubbleDot"></div>
                      <div class="typingIndicatorBubbleDot"></div>
                      <div class="typingIndicatorBubbleDot"></div>
                    </div>
                  </div> -->
                  <div v-if="item.message.length == 0" class="new-friend-text charmbo-color-primary">
                    和新朋友開始聊天吧
                  </div>
                  <div v-else class="msg-text" :class="hasUnread?'charmbo-text-color2 fw-bold':'charmbo-text-color4'">
                    {{ getMsg(item) }}
                  </div>
                </div>
              </div>
              <div class="ri-col-3 d-flex flex-column justify-center align-end">
                <!-- <div class="time-unread-box"> -->
                  <!-- <div v-if="!item.isTyping"> -->
                    <div class="list-text-box-time" :class="hasUnread?'charmbo-text-color2 fw-medium':'charmbo-text-color3'">{{ getTime(item) }}</div>
                    <div class="list-text-box-unread" :class="hasUnread?'':'v-hidden'"><div class="unread-point rounded-circle charmbo-bgcolor-secondary"></div></div>
                  <!-- </div> -->
                <!-- </div> -->
              </div>
            </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  props:{
    item:{
      type:Object,
      default: function(){
        return {message:[],pinned:false}
      }
    }
  },
  data(){
    return {
    }
  },
  computed:{
    hasUnread(){
      if (this.item.message && this.item.message.length !== 0) {
        const lastIdx = this.item.message.length - 1;
        if (Date.parse(this.item.lastSeenMessageTimeStamp) < Date.parse(this.item.message[lastIdx].createdAt)) {
          return true;
        }
      }
      return false;
    }
  },
  mounted(){
    let self = this;
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        startX: -120,
        bounce: {
          left: false,
          right: false
        },
        click:true,
        preventDefault:false
      })
      this.scroll.on('scrollEnd', (position) => {
        if(position.x > -60)
          self.scroll.scrollTo(0,0,200);
        else
          self.scroll.scrollTo(-120,0,200);
      })
    })
  },
  methods:{
    pinClick(){
      this.item.pinned = !this.item.pinned;
      this.$emit('clickPin',this.item);
      this.scroll.scrollTo(-120,0,200);
    },
    getImg(item = {}) {
      if(item && item.pictures && item.pictures.main && item.pictures.main.url){
          return item.pictures.main.url;
      }
      let type = item._id || '1234567890abcdef'.charAt(Math.floor(Math.random() * 16));
      let sex = item.sex;
      if (typeof sex == 'undefined' || sex == null)
        sex = '01'.charAt(Math.floor(Math.random() * 2));
      let s = sex == 0 ? 'g' : 'b';
      let e = type.charAt(type.length - 1);
      item.pictures.main.url = require('../assets/img/avatars/' + s + e + '.svg');
      return item.pictures.main.url;
    },
    getMsg(item) {
      if (item.message.length == 0) return '';
      let record = item.message[item.message.length - 1];
      if (record.text) {
        return (
          (record.sender == this.$store.state.userinfo._id ? '你: ' : '') +
          record.text
        );
      } else if (record.image.file && record.image.fileName) {
        return (
          (record.sender == this.$store.state.userinfo._id ? '你: ' : '') +
          record.image.fileName
        );
      }
    },
    getTime(item) {
      if (item.message.length == 0) return '';
      let d = new Date(item.message[item.message.length - 1].createdAt);
      let now = new Date();
      if(d.toDateString() === now.toDateString())
        return (
          ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2)
        );
      let yesterday = new Date();
      yesterday.setDate(now.getDate()-1);
      if(d.toDateString() === yesterday.toDateString())
        return '昨天';
      let today = new Date();
      today.setHours(0,0,0);
      console.log(today.toString());
      if(today - d < 6*24*3600*1000){
        let day_list = ['日', '一', '二', '三', '四', '五', '六'];
        return '星期' + day_list[d.getDay()];
      }
      return (
        d.getFullYear() +
        '/' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '/' +
        ('0' + d.getDate()).slice(-2)
      );
    },
  }
};
</script>
<style>
.wrapper-view{
  height: 80px;
  overflow: hidden;
}
.wrapper-container{
  width: 520px;
  height: 80px;
  background: white;
}
.pin-area{
  display: inline-block;
  width: 120px;
  height: 80px;
  color:white;
  line-height: 80px; 
  padding:0 10px
}
.pin-area-unpind{
  display: inline-block;
  width: 120px;
  height: 80px;
  color:white;
  line-height: 80px; 
  padding:0 10px
}
.content-area{
  /* display: inline-block; */
  width: 400px;
  height: 80px;
  /* line-height: 85px;  */
}
.name-text {
  max-width: 264px;
  line-height: 17px;
}
.msg-text {
  max-width: 264px;
  overflow:hidden;
  text-overflow:ellipsis;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  white-space:nowrap;
}
.ri-col-1{
  width:60px;
  /* line-height: 85px; */
  /* vertical-align: middle; */
  position: relative;
}
.ri-col-2{
  width:240px;
  line-height: 85px;
  /* vertical-align: middle; */
}
.ri-col-3{
  width:65px;
  height:85px;
  /* line-height: 85px; */
  /* vertical-align: top; */
}
.new-friend-text{
  font-weight: 600;
  line-height: 13px;
}
.pind-img{
  position:absolute;
  width: 20px;
  height: 20px;
  left: 32px;
  top: 50px;
  line-height: 20px;
  padding-left: 4px;
}
.typingIndicatorContainer {
  display: flex;
  flex: none;
  align-items: flex-end;
  margin: 3px;
  padding: 3px;
}
.list-text-box-time {
  font-size: 12px;
  line-height: 20px;
  height:20px;
}
.list-text-box-unread{
  /* display: flex;
  justify-content: flex-end; */
  height:25;
}
.unread-point{
  margin: 5px;
  width:8px;
  height:8px;
}
.time-unread-box{
  height: 45px;
  margin: 20px auto;
}
.dot {
  height: 0.7em;
  width: 0.7em;
  background-color: rgb(0, 165, 110);
  border-radius: 50%;
  display: inline-block;
  margin-left: 3px;
}
.v-hidden{
  visibility:hidden;
}
</style>
