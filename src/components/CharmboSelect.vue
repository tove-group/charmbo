<template>
  <div class="charmbo-select" :class="!disabled?'charmbo-select-active':''">
    <div class="d-flex align-center justify-space-between px-3" @click="clickHandle">
      <div class="py-2" :class="hasValue?'':'charmbo-text-color6'">{{selectString}}</div>
      <div>
          <v-img
              :src="require('../assets/img/down.svg')"
              height="7"
              width="13" />
      </div>
    </div>
    <div v-if="isShowList" class="charmbo-list charmbo-scroll charmbo-bgcolor-white mt-1">
      <div v-for="item in items" :key="item.value" @click="selectItem(item)" class="px-3 py-2" style="border-bottom: 1px solid #D6D5D1;">{{item.text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props:{
    items:{
      type:Array,
      default:function(){
        return [];
      }
    },
    label:{
      type:String,
      default:''
    },
    disabled:{
      type:Boolean,
      default:false
    },
    value: [String, Number]
  },
  data(){
    return {
      isShowList:false,
    }
  },
  computed: {
    selectString(){
      return this.items.find(item => item.value == this.value)?.text || this.label;
    },
    hasValue(){
      return !!this.items.find(item => item.value == this.value);
    }
  },
  methods:{
    selectItem(item){
      // this.value = item;
      this.$emit('change', item.value)
      this.isShowList = false;
    },
    clickHandle(){
      if(!this.disabled)
        this.isShowList = !this.isShowList;
    }
  },
  watch: {
    disabled: function(){
      if(this.disabled)
        this.isShowList = false;
    }
  }
};
</script>
<style>
.charmbo-select{
  position: relative;
  border: 1px solid #D6D5D1;
  box-sizing: border-box;
  border-radius: 15px;
}
.charmbo-select-active{
  background-color: #FFFFFF;
}
.charmbo-list{
  width:100%;
  max-height:160px;
  position: absolute;
  border: 1px solid #D6D5D1;
  box-sizing: border-box;
  border-radius: 15px 15px 15px 15px;
  z-index: 8;
}
</style>
