<template>
  <div class="page-chat-list max-width">
    <div class="search-bar">
    <v-icon
      color="black"
      class="mt-1 mb-1"
    >mdi-account-search-outline</v-icon>
    <input class="search-input mt-1 mb-1 ml-1" placeholder="搜尋配對對象姓名" v-model="searchString">
    <v-icon
      v-show="searchString != ''"
      @click= "searchString = ''"
      color="black"
      class="mt-1 mb-1"
    >mdi-window-close</v-icon>
    </div>
    <div class="pa-0" style="overflow-x:hidden">
          <v-card
            v-if="filterChatRoom.length > 0"
            flat
            class="d-flex flex-column pt-3"
          >
          <transition-group tag="div" name="roomlist">
            <room-item key="charmbo" :item="charmboroom" @clickItem="toChatRoom" @clickPin="clickPin"></room-item>
            <room-item v-for="item in filterChatRoom" :key="item._id" :item="item" @clickItem="toChatRoom" @clickPin="clickPin"></room-item>
          </transition-group>
          </v-card>
          <div v-else-if="!loading && !searchString">
            <div class="text-center">
              <div class="no-friend-text">發揮你的魅力，<br>尋找更多對象吧！</div>
              <div @click="$router.push({name: 'profile'})" class="no-friend-btn">增添個人魅力</div><br>
              <div @click="$router.push({name: 'pair'})" class="no-friend-btn">繼續尋找對象</div>
            </div>
          </div>
          <div v-else-if="!loading && searchString"><div class="text-center mt-5 no-result-text">沒有符合的搜尋結果耶<br>你再仔細想想他的名字？</div></div>
          <div v-else class="chatListLoadingSpinner">
            <v-progress-circular
              :size="50"
              :width="7"
              indeterminate
              color="grey"
            ></v-progress-circular>
          </div>
    </div>
    <footer-bar activeTab="chatList"></footer-bar>
  </div>
</template>
<script>
import RoomItem from '../components/RoomItem.vue'
import FooterBar from '../components/Footer.vue';
export default {
  components:{
    RoomItem,
    FooterBar
  },
  data() {
    return {
      searchString: "",
      loading: true
    };
  },
  /*
  beforeRouteEnter (to, from, next) {
    next((vm)=>{if(from.name!='chatRoom') vm.$store.dispatch('actionFriendList')});
  },*/
  async created() {
    await this.$store.dispatch('actionFriendList');
    this.$store.dispatch('actionCharmboMessage');
    this.loading = false;
  },
  computed: {
    charmboroom(){
      return this.$store.state.charmboRoom;
    },
    chatRoom() {
      return this.$store.state.chatRoom;
    },
    filterChatRoom(){
      if(this.searchString) {
        return this.chatRoom.filter(chat => chat.userName.includes(this.searchString));
      } else {
        return this.chatRoom;
      }
    },
  },
  methods: {
    toIndex() {
      this.$router.push({ name: 'index' });
    },
    toChatRoom(item) {
      if (!item._id) return;
      this.$router.push({ name: 'chatRoom', query: {id:item._id}}); //id: receiver_id
    },
    clickPin(item){
      let param = {
        id:item._id,
        pinned:item.pinned
      }
      this.$store.dispatch('actionPinUser',param);
    }
  },
};
</script>
<style>
.search-bar{
  background: #D1D0D0;
  border-radius: 16px;
  padding:0px 20px;
  margin:20px 32px;
}
input:focus{
  outline: 0px;
}
.search-input{
  line-height: 24px;
  vertical-align: middle;
  width:230px;
}
.no-result-text{
  font-size: 18px;
  line-height: 140%;
  font-weight: 500;
}
.no-friend-text{
  font-weight: 600;
  font-size: 24px;
  line-height: 150%;
  color: #565555;
  margin-top: 160px;
  margin-bottom: 92px;
}
.no-friend-btn{
  vertical-align: middle;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  display:inline-block;
  height: 51px;
  background: #50555C;
  border-radius: 69px;
  color: #FFFFFF;
  padding:12px 24px;
  margin:8px 0px;
  cursor: pointer;
}
.chatListLoadingSpinner {
  display: flex;
  justify-content: center;
  margin-top: 50%;
}
.roomlist-move{
  transition: all 0.8s ease;
}
.page-chat-list{
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr auto;
}
</style>
