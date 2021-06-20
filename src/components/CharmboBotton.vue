<template>
    <div @click="btnClick" class="btn py-3 px-10 charmbo-text-color5" :class=[bgcolor]>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        disabled:{
            type:Boolean,
            default: false
        }
    },
    computed:{
        bgcolor(){
            return this.disabled? 'charmbo-bgcolor-disable':'charmbo-bgcolor-primary';
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

<style>
.btn{
    display: inline-block;
    box-shadow: 0px 0px 4px #F5D036;
    border-radius: 32px;
    cursor: pointer;
}
</style>