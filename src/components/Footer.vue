<template>
    <div class="root-box d-flex">
        <div class="flex-item d-flex align-center justify-center" @click="$router.push({name: 'profile'})">
            <img v-if="activeTab === 'profile'" :src="require('@/assets/img/footer/member-active.svg')">
            <img v-else :src="require('@/assets/img/footer/member.svg')">
        </div>
        <div class="flex-item d-flex align-center justify-center" @click="$router.push({name: 'pair'})">
            <img v-if="activeTab === 'pair'" :src="require('@/assets/img/footer/pair-active.svg')">
            <img v-else :src="require('@/assets/img/footer/pair.svg')">
        </div>
        <div class="flex-item d-flex align-center justify-center" @click="$router.push({name: 'achievement'})">
            <img v-if="activeTab === 'achievement'" :src="require('@/assets/img/footer/charmbo-active.svg')">
            <img v-else :src="require('@/assets/img/footer/charmbo.svg')">
        </div>
        <div class="flex-item d-flex align-center justify-center" @click="$router.push({name: 'chatList'})">
            <img v-if="activeTab === 'chatList'" :src="require('@/assets/img/footer/chat-active.svg')">
            <img v-else :src="require('@/assets/img/footer/chat.svg')">
        </div>
    </div>
</template>
<script>

    export default {
        props: {
            activeTab:{
                type: String,
                require: true
            }
        },
        data(){
            return {
            }
        },
        components: {

        },
    }
</script>
<style>
.root-box{
    height:56px;
    /* background-size: 100%; */
    border: 1px solid #D6D5D1;
    background-color: white;
}
.profile{
    /* background-image: url("../assets/img/footer/member-bar.svg"); */
}
.pair{
    /* background-image: url("../assets/img/footer/pair-bar.svg"); */
}
.achievement{
    /* background-image: url("../assets/img/footer/charmbo-bar.svg"); */
}
.chatList{
    /* background-image: url("../assets/img/footer/chat-bar.svg"); */
}
.flex-item{
    flex:0 1 25%;
}
</style>