<template>
    <div class="root-box d-flex" :class="[activeTab]">
        <div class="flex-item" @click="$router.push({name: 'profile'})"></div>
        <div class="flex-item" @click="$router.push({name: 'pair'})"></div>
        <div class="flex-item" @click="$router.push({name: 'achievement'})"></div>
        <div class="flex-item" @click="$router.push({name: 'chatList'})"></div>
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
    height:72px;
}
.profile{
    background-image: url("../assets/img/footer/member-bar.svg");
}
.pair{
    background-image: url("../assets/img/footer/pair-bar.svg");
}
.achievement{
    background-image: url("../assets/img/footer/charmbo-bar.svg");
}
.chatList{
    background-image: url("../assets/img/footer/chat-bar.svg");
}
.flex-item{
    flex:0 1 25%;
}
</style>