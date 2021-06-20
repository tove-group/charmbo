<template>
    <div class="max-width ">
        <div class="photo-editor-bg">
            <div style="text-align:left;">
                <v-icon
                    large
                    class="photo-editor-icon-back"
                    color="black"
                    @click="$router.push({name: 'profile'})"
                >mdi-chevron-left</v-icon>
            </div>
            <div class="rel">
                <v-avatar size="130">
                    <v-img 
                        :src="getAvatarImg.url"
                        alt="avatar"
                        class="rounded-circle mx-auto img-avatar cursor-pointer"
                        @click="onMainPictureClick"
                        style="border: 5px solid white;"
                    ></v-img>
                    <input
                        ref="mainUploader"
                        class="d-none"
                        type="file"
                        accept="image/png, image/jpeg, image/bmp"
                        @change="uploadMainPicture"
                    >
                </v-avatar>
            </div>
            <v-text-field
                class="profile-name"
                solo
                dense
                readonly
                v-model="user.userName"></v-text-field>
        </div>
        <p class="fe-text">生活照</p>
        <div class="photo-aeras">
            <div 
                class="photo-editor-photo cursor-pointer" 
                v-for="(img, index) in getOthersImgs" 
                :key="img._id" 
                @click="onOthersPictureClick(index)"
            >
                <v-img 
                    style="width: 145px; height: 195px;"
                    v-if="img.url"
					:src="img.url"
                ></v-img>
                <v-icon
                    v-else
                    class="rounded-circle photo-editor-plus"
                    size="40"
                    color="#F2F2F2"
                >mdi-plus-circle</v-icon>
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
                
			},
			onMainPictureClick() {
				this.$refs.mainUploader.click();
			},
            onOthersPictureClick(i) {
                this.selectPictureIdx = i
                this.$refs.othersUploader[this.selectPictureIdx].click();
            },
        }
    }
</script>
<style>
.photo-editor-bg{
    /* position: fixed; */
    height: 287px;
    left: 0px;
    right: 0px;
    top: 44px;

    background: #F2F2F2;
    border-radius: 2px;
    text-align: center;

}
.profile-name{
    /* display: flex; */
    /* flex-direction: row; */
    justify-content: center;
    text-align: center;
    /* align-items: center; */
    display: inline-block;
    padding: 4px 24px;
    margin: 10px auto;
    /* position: absolute; */
    min-width: 117px;
    height: 30px;
    /* left: calc(50% - 117px/2); */

    background: #FFFFFF;
}
.rel{
    position: relative;
    width: 130px;
    height: 130px;
    margin: 0px auto;
}
.img-avatar{
    position:absolute;
}
.fe-text{
    margin: -40px auto 0 auto;
    text-align: center;
}
.photo-aeras{
    width: 311px;
    margin: 10px auto 0 auto;
}
.cursor-pointer{
    cursor: pointer;
}
.photo-editor-icon-back{
    margin:30px 30px 0px 30px
}
.photo-editor-photo{
    display: inline-block;
    width: 145px;
    height: 195px;
    background: #E0E0E0;
    border: 1px solid #BDBDBD;
    box-sizing: border-box;
    border-radius: 8px;
    vertical-align: middle;
    line-height: 195px;
    text-align: center;
    margin:5px
}
.photo-editor-plus{
    /* border: 1px solid #BDBDBD; */
}
</style>