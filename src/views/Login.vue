<template>
  <div class="hero max-width charmbo-bgcolor-gray">
    <div class="d-flex flex-column align-center">
      <div>
        <v-img
            :src="require('@/assets/logo.png')"
            height="144"
            width="144"
        />
      </div>
      <div>
        <v-img
            :src="require('@/assets/charmbo.svg')"
            height="37"
            width="213"
        />
      </div>
      <div class="space130"></div>
      <p class="mt-5 charmbo-text-color3 fs-12">您上次使用 Google 帳號登入</p>
      <login-btn>使用 Google 登入</login-btn>
      <v-row align="center" class="mt-10 max-width">
        <v-col cols="12" sm="9">
        <v-select
            :items="items"
            label="使用測試帳號登入"
            v-model="testUserId"
            class="width"
        ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <v-btn v-if="testUserId != ''" @click="testLogin" color="primary">登入</v-btn>
          <v-btn v-else>登入</v-btn>
        </v-col>
      </v-row>
      <div class="charmbo-text-color3 fs-12 mt-4">一旦登入即代表您同意我們的使用者條款及隱私權政策</div>
    </div>
  </div>
</template>
<script>
    import LoginBtn from '../components/Login-btn.vue';
    import axios from 'axios';
    export default {
      components: {
        LoginBtn,
      },
      data(){
        return {
          testUsers:[],
          testUserId:''
        }
      },
      created(){
        if (window.socketConnect) {
          this.$socket.client.disconnect();
          window.socketConnect = false;
        }

        console.log('socket.io reconnect')
        this.$socket.client.connect();
        window.socketConnect = true;

        if(this.$route.query.token){
          //取得用戶資訊
          this.$store.dispatch('actionUserinfo',this.$route.query.token).then(() => {
            if(this.$store.state.userinfo._id){
              this.$socket.client.emit('regist_room', this.$store.state.userinfo._id);
            }
            this.$router.push({name: "index"});
          });
        }
      },
      mounted(){
        this.getUserList();
        console.log(window)
      },
      computed: {
        items(){
          return this.testUsers.map(e=> {
            let name = 'unknown';
            if(e.userName)
              name = e.userName;
            else if(e.name && e.name.nickName)
              name = e.name.nickName;
            return {
              text:name,
              value:e._id}});
        }
      },
      methods:{
        getUserList(){
            let url = window.API_HOST + '/test/userlist/?filter=test'
            let self = this;
            let options = {
                headers:{
                    'Content-Type': 'application/json',
                }
            }
            axios.get(url, options).then(response => {
                if(response.data.code == "Success"){
                    self.testUsers = response.data.data;
                }
            })
        },
        testLogin(){
          if (!window.socketConnect) {
            this.$socket.client.connect();
            window.socketConnect = true;
          }
          this.$store.dispatch('actionTestUserLogin',this.testUserId).then(() => {
            this.$socket.client.emit('regist_room', this.testUserId);
            this.$router.push({name: "index"});
          });
        }
      }
    }
</script>
<style>
  .hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .logo {
    background: #D1D1D1;
    width:80px;
    height:80px;
    margin-left: auto;
    margin-right: auto;
  }
  .space130{
    height:130px;
  }
</style>