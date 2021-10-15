<template>
    <div class="max-width page-photo-editor">
        <div class="text-align-center py-10 charmbo-header-shadow">
            <div class="po-relative">
                <div
                    class="po-absolute ml-8"
                    @click="$router.push({name: 'profile'})">
                    <v-img
                        :src="require('@/assets/img/back.svg')"
                        height="56"
                        width="56"
                    />
                </div>
                <v-avatar size="130">
                    <v-img 
                        :src="getAvatarImg.url"
                        alt="avatar"
                        class="rounded-circle mx-auto cursor-pointer"
                        @click="onMainPictureClick"
                        style="border: 2px solid #F2C611;"
                    ></v-img>
                    <input
                        ref="mainUploader"
                        class="d-none"
                        type="file"
                        accept="image/png, image/jpeg, image/bmp"
                        @change="uploadMainPicture"
                    >
                </v-avatar>
                <div class="d-flex justify-center align-center edit-icon rounded-circle charmbo-bgcolor-primary">
                    <div class="">
                        <v-img
                            :src="require('@/assets/img/pen-white.svg')"
                            class=""
                            height="14"
                            width="14" />
                    </div>
                </div>
            </div>
        </div>
        <div class="charmbo-bgcolor-gray">
            <p class="text-align-center my-6 fs-12 fw-medium charmbo-text-color4">上傳近期的生活照，盡情展現興趣和特質！</p>
            <div class="d-flex flex-wrap justify-center" @click="selectPictureIdx = -1">
                <div 
                    class="photo-editor-photo cursor-pointer ma-2 po-relative"
                    :class="{'charmbo-bgcolor-chat':img.publicId}"
                    v-for="(img, index) in getOthersImgs" 
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


        </div>
    </div>
</template>
<script>

    export default {
        components: {

        },
        data(){
            return {
				selectPictureIdx: -1,
            }
        },
        created(){

        },
        computed: {
            user(){
                return this.$store.state.userinfo;
            },
            getAvatarImg(){
                let item = this.$store.state.userinfo;
                console.log(item.pictures.main)
                if(item && item.pictures && item.pictures.main.url){
                    return item.pictures.main;
                }
                let type = item._id || "1234567890abcdef".charAt(Math.floor(Math.random()*16));
                let sex = item.sex;
                if(typeof sex == "undefined" || sex == null)
                    sex = "01".charAt(Math.floor(Math.random()*2));
                let s = sex == 0 ? 'g' : 'b';
                let e = type.charAt(type.length - 1);
                item.pictures.main.url = require('../assets/img/avatars/'+s+e+'.svg');
                return item.pictures.main;
            },
            getOthersImgs() {
                let item = this.$store.state.userinfo;
                if(item && item.pictures && item.pictures.others){
                    return item.pictures.others;
                }
                return [];
            }
        },
        methods:{
			async uploadMainPicture(e) {
                if (!e.target.files && !e.target.files[0]) {
                    return null;
                }
                //Remove previous picture
                if(this.getAvatarImg && this.getAvatarImg.publicId && this.getAvatarImg.url) {
                    const data = {
                        type: "MAIN",
                        publicId: this.getAvatarImg.publicId,
                    }
                    await this.$store.dispatch('actionRemovePicture', data);
                }
                //Updload new picture
				const uploadPicture = e.target.files[0];
                const data = {
                    uploadPicture: uploadPicture,
                }
				await this.$store.dispatch('actionUploadMainPicture', data);
                
			},
            async uploadOthersPicture(e) {
                if (!e.target.files && !e.target.files[0]) {
                    return null;
                }
                //Remove previous picture
                if(this.getOthersImgs && 0 <= this.selectPictureIdx && this.selectPictureIdx < 4 && this.getOthersImgs[this.selectPictureIdx].publicId) {
                    const data = {
                        type: "OTHERS",
                        publicId: this.getOthersImgs[this.selectPictureIdx].publicId,
                    }
                    await this.$store.dispatch('actionRemovePicture', data);
                }
                //Updload new picture
				const uploadPicture = e.target.files[0];
                const data = {
                    uploadPicture: uploadPicture,
                    index: this.selectPictureIdx,
                }
                await this.$store.dispatch('actionUploadOthersPicture', data);
                this.selectPictureIdx = -1
                
			},
            removePicture(index){
                console.log('remove index:',index)
                if(this.getOthersImgs && 0 <= index && index < 4 && this.getOthersImgs[index].publicId) {
                    const data = {
                        type: "OTHERS",
                        publicId: this.getOthersImgs[index].publicId,
                    }
                    this.$store.dispatch('actionRemovePicture', data).then(()=>{
                        this.selectPictureIdx = -1;
                        Object.assign(this.getOthersImgs[index],{publicId: null, url: null})
                    })
                }
            },
			onMainPictureClick() {
				this.$refs.mainUploader.click();
			},
            onOthersPictureClick(i) {
                if(!this.getOthersImgs[i].url){
                    this.selectPictureIdx = i
                    this.$refs.othersUploader[i].click();
                    return ;
                }
                if(this.selectPictureIdx == i)
                    this.removePicture(i)
                else
                    this.selectPictureIdx = i
            },
        }
    }
</script>
<style>
.photo-editor-photo{
    display: inline-block;
    height: 212px;
    width: 148px;
    border: 1px solid #D6D5D1;
    box-sizing: border-box;
    vertical-align: middle;
    line-height: 212px;
    text-align: center;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    border-radius: 20px;
}
.photo-style{
    width: 148px;
    top: 50%;
    transform: translateY(-50%);
    /* border-radius: 20px; */
}
.edit-icon{
    position:absolute;
    width: 30px;
    height: 30px;
    left: calc(50% + 30px);
    top: 100px;
}
.page-photo-editor{
    display: grid;
    height: 100vh;
    grid-template-rows: auto 1fr;
    gap:1px;
}
.filter-20{
    filter: grayscale(80%);
}
</style>