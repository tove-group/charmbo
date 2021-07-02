<template>
    <div class="d-flex align-center" :class="[flexRowClass, isReceiveClass]" @click="click">
        <div class="charmbo-message px-4 py-2 mx-4" :class="[type, backgroundClass]">
            <div v-if="item.text !== null">{{item.text}}</div>
            <div v-else>
                <v-img
                    :src="item.image.file"
                ></v-img>
            </div>
        </div>
        <div class="text-box-time">
            {{ timeFormat(item.createdAt) }}
        </div>
    </div>
</template>
<script>
export default {
    props:{
        item:{
            type:Object,
            default: function(){
                return {text:""}
            }
        },
        isReceive:{
            type:Boolean
        },
        type:{
            type:String
        }
    },
    data(){
        return {
        }
    },
    computed:{
        flexRowClass(){
            return this.isReceive ? 'flex-row' : 'flex-row-reverse';
        },
        backgroundClass(){
            return this.isReceive ? 'charmbo-bgcolor-white' : 'charmbo-bgcolor-chat';
        },
        isReceiveClass(){
            return this.isReceive ? 'receive' : '';
        },
    },
    mounted(){

    },
    methods:{
        click(){
            this.$emit('click',this.item);
        },
        timeFormat(time) {
            let d = new Date(time);
            return (
                ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2)
            );
        },
    }
};
</script>
<style>
.charmbo-message{
    max-width: 80%;
    margin-bottom: 6px;
}
.charmbo-message.message-bottem{
    margin-bottom: 12px;
}
.receive > .message-top{
    border-radius: 20px 20px 20px 4px;
}
.receive > .message-body{
    border-radius: 4px 20px 20px 4px;
}
.receive > .message-bottem{
    border-radius: 4px 20px 20px 20px;
}
.receive > .charmbo-message{
    box-shadow: 0px 1px 2px #E1DFD4;
}
.message-top{
    border-radius: 20px 20px 4px 20px;
}
.message-body{
    border-radius: 20px 4px 4px 20px;
}
.message-bottem{
    border-radius: 20px 4px 20px 20px;
}
.charmbo-message{
    box-shadow: 0px 1px 2px #E3D1B5;
}
div:hover > .text-box-time {
    display: inline-block;
}
.text-box-time {
    color: #979797;
    font-size: 12px;
    display: none;
}
</style>
