<template>
    <div class="max-width">
        <div class="title-area">
            <div class="setting-title">設定</div>
            <div style="text-align:left;">
                <v-icon
                    large
                    class="icon-back"
                    color="black"
                    @click="$router.push({name: 'profile'})"
                >mdi-chevron-left</v-icon>
            </div>
        </div>
        
        <div class="setting-item fs12">已連結帳號</div>
        <div class="setting-box-content">
            <div>{{user.provider}}</div>
            <div class="fs12">{{user.email}}</div>
        </div>
        <div class="setting-item fs12">通知</div>
        <div class="setting-box-content">
            <div class="d-flex justify-space-between">
            <div class="mt-1">訊息通知</div>
            <v-switch class="setting-switch"></v-switch>
            </div>
            <div class="d-flex justify-space-between">
            <div class="mt-1">系統通知</div>
            <v-switch class="setting-switch"></v-switch>
            </div>
        </div>
        <div class="setting-item fs12">法務</div>
        <div class="setting-box-content">
            <div class="d-flex justify-space-between">
                <div class="mt-2">使用者條款</div>
                <v-icon
                    color="black"
                >mdi-chevron-right</v-icon>
            </div>
            <div class="d-flex justify-space-between">
                <div class="mt-2">隱私權政策</div>
                <v-icon
                    color="black"
                >mdi-chevron-right</v-icon>
            </div>
        </div>
        <div class="setting-item">問題舉報</div>
        <div class="setting-item">分享Charmbo</div>
        <div class="setting-item">刪除帳號</div>
        <div @click="logout" class="setting-item">登出</div>
    </div>
</template>
<script>

    export default {
        components: {

        },
        data(){
            return {
            }
        },
        created(){
        },
        computed: {
            user(){
                return this.$store.state.userinfo;
            },
        },
        methods:{
            logout(){
                window.socketConnect = false;
                this.$socket.client.disconnect();
                this.$store.dispatch('actionLogout').then(() => {
                this.$router.push({name: "login"});
            });
        },
        }
    }
</script>
<style>
.title-area{
    text-align: center;
    position: relative;
}
.setting-title{
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 36px;
    letter-spacing: 1.5px;

    width:100%;
    position: absolute;
    margin:30px auto;
}
.setting-item{
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding:16px 0 4px 32px;
}
.setting-box-content{
    padding:16px 0 4px 48px;
}
.fs12{
    font-size: 12px;
}
.setting-switch{
    margin: 0 0;
}

</style>