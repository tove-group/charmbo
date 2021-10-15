<template>
    <div @click="btnClick" class="btn py-3 px-10" :class=[bgcolor]>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        disabled:{
            type:Boolean,
            default: false
        },
        outline:{
            type:Boolean,
            default: false
        }
    },
    computed:{
        bgcolor(){
            if(this.disabled)
                return 'disable';
            if(this.outline)
                return 'outline';
            return 'default';
        }
    },
    methods:{
        btnClick(){
            if(!this.disabled)
                this.$emit('click');
        }
    }
}
</script>

<style scoped>
.btn{
    display: inline-block;
    border-radius: 32px;
    cursor: pointer;
}
.default{
    color:#FFFFFF;
    background:#F2C611;
    box-shadow: 0px 0px 4px #F5D036;
}
.outline{
    color:#F2C611;
    background:#FFFFFF;
    border: 2px solid #D6D5D1;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
}
.disable{
    color: #A9A8A5;
    background: #FAF9F7;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    border-radius: 32px;
}
</style>