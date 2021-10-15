<template>
    <v-dialog
        max-width="400"
        max-height="100%"
        content-class="report-dialog"
        v-model="open"
        overlay-color="#000000"
        overlay-opacity="0.6"
        >
        <v-card class="report-card border-radius-24">
        <p class="pt-6 fs-16 fw-black text-align-center">檢舉用戶</p>
        <hr class="charmbo-hr">
        <div class="px-7 fs-14">
            <p class="mt-2 charmbo-text-color3">上傳多張截圖或照片說明</p>
            <div class="d-flex charmbo-scroll-x">
                <div 
                    class="report-photo cursor-pointer ma-1 po-relative flex-shrink-0"
                    :class="img.url ? 'charmbo-bgcolor-chat' : 'charmbo-bgcolor-gray'"
                    v-for="(img, index) in images"
                    :key="img._id"
                    @click.stop="onOthersPictureClick(index)"
                >
                    <img 
                        class="photo-style po-absolute"
                        :class="{'filter-20':index == selectPictureIdx}"
                        style="left:0px"
                        v-if="img.url"
                        :src="img.url"
                    >
                    <v-icon
                        v-else
                        class="rounded-circle"
                        size="54"
                        color="#F2C611"
                    >mdi-plus-circle</v-icon>
                    {{img.url}}
                    <v-icon
                        v-if="selectPictureIdx == index && img.publicId"
                        size="54"
                        color="#FFFFFF"
                    >mdi-close-circle</v-icon>
                    <input
                        ref="othersUploader"
                        class="d-none"
                        type="file"
                        accept="image/png, image/jpeg, image/bmp"
                        @change="uploadOthersPicture"
                    >
                </div>
            </div>
            <p class="mt-8 charmbo-text-color3">檢舉內容詳述（限35字）</p>
            <textarea
                v-model="text"
                class="charmbo-input py-2 px-3 border-radius-20 charmbo-border1 w-full"
                placeholder="輸入您遇到的問題"
                maxlength="35"
                rows="5"></textarea>
        </div>
        <div class="text-center py-10">
            <charmbo-button :disabled="checkSent" @click="sent">
                <div class="fs-16 fw-semi-bold">送出</div>
            </charmbo-button>
        </div>
        </v-card>
        <div
            class="d-flex align-center justify-center rounded-circle charmbo-bgcolor-white mx-auto my-8"
            style="width:48px;height:48px"
            @click="open = false">
                <img
                    :src="require('@/assets/img/charmbo-x.svg')"
                    height="16"
                    width="16"
                />
        </div>
    </v-dialog>
</template>
<script>
    import CharmboButton from '@/components/CharmboButton.vue';
    export default {
        components: {
            CharmboButton
        },
        props: {
            dialogOpen: {
            type: Boolean
            },
        },
        data(){
            return {
            open:false,
            selectPictureIdx: null,
            text:'',
            images:[{url:''},{url:''},{url:''},{url:''},{url:''}],
            files:[]
            }
        },
        methods: {
            uploadOthersPicture(e){
                if (!e.target.files && !e.target.files[0]) {
                    return null;
                }
                this.images[this.selectPictureIdx].url = URL.createObjectURL(e.target.files[0])
                this.files.push(e.target.files[0])
            },
            onOthersPictureClick(i) {
                if(!this.images[i].url){
                    this.selectPictureIdx = i
                    this.$refs.othersUploader[i].click();
                    return ;
                }
                // if(this.selectPictureIdx == i)
                //     this.removePicture(i)
                // else
                //     this.selectPictureIdx = i
            },
            sent(){
                let param = {
                    files: this.files,
                    text: this.text,
                }
                this.$emit('sent', param)
            },
        },
        computed: {
            checkSent(){
                if(this.text == '' && this.files.length === 0)
                    return true
                return false
            }
        },
        watch:{
            open: function(value){
                this.$emit('update:dialogOpen',value)
            },
            dialogOpen: function(value){
                this.open = value
            }
        }
};
</script>
<style>
#app .report-dialog{
    box-shadow: none;
}
#app .report-dialog .v-card{
    background: #FFFFFF;
    border-radius: 24px;
}
.report-photo{
    display: inline-block;
    height: 135px;
    width: 95px;
    border: 1px solid #D6D5D1;
    box-sizing: border-box;
    vertical-align: middle;
    line-height: 135px;
    text-align: center;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    border-radius: 20px;
    /* background: #FAF9F7; */
}
.photo-style{
    width: 95px;
    top: 50%;
    transform: translateY(-50%);
    /* border-radius: 20px; */
}
</style>
