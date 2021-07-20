<template>
    <div class="max-width">
        <div class="po-relative text-align-center">
            <div
                class="po-absolute ml-8 mt-3"
                @click="$router.push({name: 'profile'})">
                <v-img
                    :src="require('@/assets/img/back.svg')"
                    height="56"
                    width="56"
                />
            </div>
            <div class="fw-semi-bold fs-20 py-6">設定</div>
        </div>
        <div class="charmbo-bgcolor-gray">
            <div class="charmbo-bgcolor-white fs14 pl-8 py-1 charmbo-header-shadow">已連結帳號</div>
            <div class="pl-12 py-4">
                <div class="fw-semi-bold">{{user.provider}}</div>
                <div class="fw-semi-bold charmbo-text-color3">{{user.email}}</div>
            </div>
            <div class="charmbo-bgcolor-white fs14 pl-8 py-1 charmbo-header-shadow">通知</div>
            <div class="pl-12 pr-8 py-4">
                <div class="d-flex justify-space-between align-center py-2">
                    <div class="">訊息通知</div>
                    <charmbo-switch></charmbo-switch>
                </div>
                <div class="d-flex justify-space-between align-center py-2">
                    <div class="">系統通知</div>
                    <charmbo-switch></charmbo-switch>
                </div>
            </div>
            <div class="charmbo-bgcolor-white fs14 pl-8 py-1 charmbo-header-shadow">法務</div>
            <div class="pl-12 pr-8 py-4">
                <div class="d-flex justify-space-between align-center py-2">
                    <div class="">使用者條款</div>
                    <v-icon
                        color="black"
                    >mdi-chevron-right</v-icon>
                </div>
                <div class="d-flex justify-space-between align-center py-2">
                    <div class="">隱私權政策</div>
                    <v-icon
                        color="black"
                    >mdi-chevron-right</v-icon>
                </div>
            </div>
            <div class="charmbo-bgcolor-white fs14 pl-8 py-1 charmbo-header-shadow">問題回報</div>
            <div class="pl-12 pr-8 py-4">
                <div class="d-flex justify-space-between align-center py-2">
                    <div class="">分享Charmbo</div>
                    <v-icon
                        color="black"
                    >mdi-chevron-right</v-icon>
                </div>
                <div class="d-flex justify-space-between align-center py-2">
                    <div class="">問題舉報</div>
                    <v-icon
                        color="black"
                    >mdi-chevron-right</v-icon>
                </div>
                <div class="d-flex justify-space-between align-center py-2">
                    <div class="">檢舉申訴</div>
                    <v-icon
                        color="black"
                    >mdi-chevron-right</v-icon>
                </div>
            </div>
            <div class="charmbo-bgcolor-white fs14 pl-8 py-1 charmbo-header-shadow">其他</div>
            <div class="pl-12 pr-8 py-4">
                <div class="d-flex justify-space-between align-center py-2">
                    <div class="" @click="logout">登出</div>
                    <v-icon
                        color="black"
                    >mdi-chevron-right</v-icon>
                </div>
                <div class="d-flex justify-space-between align-center py-2">
                    <div class="">刪除帳號</div>
                    <v-icon
                        color="black"
                    >mdi-chevron-right</v-icon>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CharmboSwitch from '@/components/CharmboSwitch.vue';
    export default {
        components: {
            CharmboSwitch
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
</style>