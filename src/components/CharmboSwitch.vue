<template>
    <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
    </label>
</template>

<script>
export default {
    // props:{
    //     disabled:{
    //         type:Boolean,
    //         default: false
    //     },
    //     outline:{
    //         type:Boolean,
    //         default: false
    //     }
    // },
    // computed:{
    //     bgcolor(){
    //         if(this.disabled)
    //             return 'disable';
    //         if(this.outline)
    //             return 'outline';
    //         return 'default';
    //     }
    // },
    // methods:{
    //     btnClick(){
    //         if(!this.disabled)
    //             this.$emit('click');
    //     }
    // }
}
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 22px;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked + .slider {
    background-color: #F2C611;
}

input:focus + .slider {
    box-shadow: inset -5px 0px 4px rgba(0, 0, 0, 0.1);
}

input:checked + .slider::before {
    -webkit-transform: translateX(23px);
    -ms-transform: translateX(23px);
    transform: translateX(23px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 60px;
}

.slider.round::before {
    border-radius: 50%;
}
</style>