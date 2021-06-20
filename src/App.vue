<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
const INACTIVE_USER_TIME_THRESHOLD = 1000*60*30; //inactive after 30 mins
const USER_ACTIVITY_THROTTLER_TIME = 1000*3;
export default {
  name: 'App',

  data: () => ({
      userActivityThrottlerTimeout: null,
      userActivityTimeout: null
  }),
    methods:{
    inactiveUserAction() {
      /*
      event = event || window.event;
      const unsaved_changes_warning = "You have unsaved changes. Are you sure you wish to leave?";
      event.returnValue = unsaved_changes_warning; 
      event.preventDefault();
      return unsaved_changes_warning;
      */
      window.socketConnect = false;
      this.$socket.client.disconnect();
    },
    activateActivityTracker() {
      window.addEventListener('beforeunload', event => this.inactiveUserAction(event), {capture: true});
      window.addEventListener("mousemove", this.userActivityThrottler);
      window.addEventListener("scroll", this.userActivityThrottler);
      window.addEventListener("keydown", this.userActivityThrottler);
      window.addEventListener("resize", this.userActivityThrottler);
    },
    deactivateActivityTracker() {
      window.removeEventListener('beforeunload', event => this.inactiveUserAction(event), {capture: true});
      window.removeEventListener("mousemove", this.userActivityThrottler);
      window.removeEventListener("scroll", this.userActivityThrottler);
      window.removeEventListener("keydown", this.userActivityThrottler);
      window.removeEventListener("resize", this.userActivityThrottler);
    },
    resetUserActivityTimeout() {
      clearTimeout(this.userActivityTimeout);
      this.userActivityTimeout = setTimeout(() => {
        this.inactiveUserAction();
        this.$router.push({name: "login"});
      }, INACTIVE_USER_TIME_THRESHOLD);
    },
    userActivityThrottler() {
      if (!this.userActivityThrottlerTimeout) {
        this.userActivityThrottlerTimeout = setTimeout(() => {
          this.resetUserActivityTimeout();

          clearTimeout(this.userActivityThrottlerTimeout);
          this.userActivityThrottlerTimeout = null;
        }, USER_ACTIVITY_THROTTLER_TIME);
      }
    }
  },
  beforeMount() {
    this.activateActivityTracker();
  },
  beforeDestroy() {
    this.deactivateActivityTracker();
    clearTimeout(this.userActivityTimeout);
    clearTimeout(this.userActivityThrottlerTimeout);
  },
  created() {
    if (!window.socketConnect && this.$store.state.userinfo && this.$store.state.userinfo._id) {
      this.$socket.client.connect();
      window.socketConnect = true;
      this.$socket.client.emit('regist_room', this.$store.state.userinfo._id);
    }
  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    res: function(data) {
      console.log('接收到服务端消息', data);
    },
    receive_message: function(data) {
      console.log('receive_message :' + data);
      // let receive_msg = {
      //   name: data.senderChatID,
      //   type: true,
      //   time: data.createdAt,
      //   content: data.text,
      // };
      let saveData = {
        friendsId: data.senderChatID,
        data: {
          sender: data.senderChatID,
          text: data.text,
          image: {
            file: data.image.file,
            fileName: data.image.fileName,
          },
          imageUrl: null,
          createdAt: data.createdAt,
        },
      };
      this.$store.dispatch('actionReceiveMessage', saveData);
      //this.msgs.push(receive_msg);
    },
    user_status: function(data) {
      console.log(data);
      this.$store.dispatch('actionOnlineStatus', {
        friendsId: data.user,
        onlineStatus: data.onlineStatus
      });
    },
    typing: function(data) {
      this.$store.dispatch('actionTyping', {
        sender: data.sender,
        isTyping: data.isTyping,
      });
    },
  },
};
</script>
<style>
@import './assets/styles/global.css';
.max-width {
  max-width: 400px;
}
</style>
