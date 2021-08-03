<template>
    <div class="member-container max-width">
        <div class="charmbo-scroll">
            <div class="profile-bg pt-7 pb-3 charmbo-header-shadow">
                <div class="rel" @click="$router.push({name: 'photoEditor'})">
                    <v-img 
                        width="120"
                        height="120"
                        :src="getImg"
                        class="rounded-circle mx-auto img-avatar cursor-pointer"
                        :class="{isAvatarHovering: isAvatarHovering}"
                        style="border:2px solid #F2C611;"
                        @mouseover="isAvatarHovering= true"
                        @mouseout="isAvatarHovering=false"
                    ></v-img>
                    <!-- <div class="rounded-circle img-zodiac" :class="[horoscope]"></div> -->
                    <v-icon
                        class="rounded-circle plus-icon"
                        size="30"
                        color="#F2C611"
                    >mdi-plus-circle</v-icon>
                </div>
                <div class="d-flex justify-center align-center py-3">
                    <div class="mx-1 profile-name d-inline-flex align-center">
                        <div class="flex-grow-1 my-2 ml-3">
                            <input
                                class="fs-14"
                                v-model="userName"
                                :size="userName.length * 2"
                                @blur="update('userName')"
                                @change="hasChange = true"
                                style="text-align: center;"
                                />
                        </div>
                        <div class="flex-grow-0 ma-3">
                            <v-img
                                :src="require('../assets/img/pen.svg')"
                                height="14"
                                width="14" />
                        </div>
                    </div>
                    <div class="fs-14 mx-1 py-3">{{age}}</div>
                </div>
                <div class="d-flex justify-center py-3">
                    <div class="mx-2">
                        <charmbo-botton outline @click="$router.push({name: 'setting'})">
                            <div class="fs-16 fw-semi-bold">設定</div>
                        </charmbo-botton>
                    </div>
                    <div class="mx-2">
                        <charmbo-botton @click="infoDialog = true">
                            <div class="fs-16 fw-semi-bold">檔案預覽</div>
                        </charmbo-botton>
                    </div>
                </div>
            </div>
            <div class="charmbo-bgcolor-gray pa-8 fs-14">
                <div class="fw-medium mb-1">自我介紹</div>
                <textarea
                    class="inputClass input-border charmbo-input py-2 px-3"
                    v-model="user.summary"
                    placeholder="寫下你的自我介紹，平時喜歡做什麼？想認識什麼樣的朋友？可以讓人更快速地認識你喔！"
                    :disabled="!isEdit"
                />
                <div class="fw-medium mt-6 mb-1 d-flex align-center">
                    <div class="mr-1">興趣愛好</div>
                    <div>
                        <v-img
                            :src="countImg"
                            height="16"
                            width="16" />
                    </div>
                </div>
                <div
                    class="input-border d-flex flex-wrap pa-2"
                    :class="isEdit?'charmbo-bgcolor-white':''"
                    @click="isEdit && $router.push({name: 'interestSetting'})">
                    <div class="ma-1 charmbo-text-color6" v-if="user.interestlist.length === 0">點擊選擇你的愛好！</div>
                    <div
                        v-for="(interest, index) in user.interestlist"
                        :key="index"
                        
                        class="my-1 mx-1 px-3 py-1 charmbo-bgcolor-chat interest-border"
                        >
                        {{interest}}
                    </div>
                </div>
                <div class="d-flex">
                    <div class="flex-basis-1 mr-3">
                        <div class="fw-medium mt-6 mb-1">我常出現在</div>
                        <charmbo-select
                            label="縣市"
                            v-model="user.location"
                            :items="locationItems"
                            :disabled="!isEdit"
                            >
                        </charmbo-select>
                    </div>
                    <div class="flex-basis-1 ml-3">
                        <div class="fw-medium mt-6 mb-1">職業</div>
                        <input
                            class="input-border charmbo-input py-2 px-3"
                            v-model="user.job"
                            placeholder="工作"
                            :disabled="!isEdit"
                        />
                    </div>
                </div>
                <div class="d-flex">
                    <div class="flex-basis-1 mr-3">
                        <div class="fw-medium mt-6 mb-1">戀愛取向</div>
                        <charmbo-select
                            label="性別"
                            v-model="user.expectationSex"
                            :items="sexItems"
                            :disabled="!isEdit"
                            >
                        </charmbo-select>
                    </div>
                    <div class="flex-basis-1 ml-3"></div>
                </div>
                <div class="d-flex">
                    <div class="flex-basis-1 mr-3">
                        <div class="fw-medium mt-6 mb-1">感情狀態</div>
                        <charmbo-select
                            label="狀態"
                            v-model="user.status"
                            :items="relationItems"
                            :disabled="!isEdit"
                            >
                        </charmbo-select>
                    </div>
                    <div class="flex-basis-1 ml-3">
                        <div class="fw-medium mt-6 mb-1">我想尋找</div>
                        <charmbo-select
                            label="關係"
                            v-model="user.lookingFor"
                            :items="findItems"
                            :disabled="!isEdit"
                            >
                        </charmbo-select>
                    </div>
                </div>
                <div class="text-center mt-8">
                    <charmbo-botton v-if="!isEdit" @click="isEdit = true">
                        <div class="fs-16 fw-semi-bold">更改</div>
                    </charmbo-botton>
                    <span v-if="isEdit && showClearAll" class="fs-16 fw-semi-bold mr-5 charmbo-color-primary" @click="clearAll">全部清除</span>
                    <charmbo-botton v-if="isEdit" @click="isEdit = false">
                        <div class="fs-16 fw-semi-bold" @click="updateAll">確認</div>
                    </charmbo-botton>
                </div>
            </div>
            <v-dialog
                v-model="infoDialog"
                content-class="user-dialog"
                overlay-color="#000000"
                overlay-opacity="0.6"
            >
                <user-detail-card :user="user"></user-detail-card>
                <div class="d-flex align-center justify-center rounded-circle charmbo-bgcolor-white mx-auto my-8"
                        style="width:48px;height:48px"
                        @click="infoDialog = false">
                    <img
                        :src="require('@/assets/img/charmbo-x.svg')"
                        height="16"
                        width="16"
                    />
                </div>
            </v-dialog>
        </div>
        <footer-bar activeTab="profile"></footer-bar>
    </div>
</template>
<script>
    import FooterBar from '../components/Footer.vue';
    import CharmboBotton from '@/components/CharmboBotton.vue';
    import CharmboSelect from '@/components/CharmboSelect.vue';
    import UserDetailCard from '@/components/UserDetailCard.vue';
    export default {
        components: {
            FooterBar,
            CharmboBotton,
            CharmboSelect,
            UserDetailCard
        },
        data(){
            return {
                userName:'',
                sexItems:[
                    {value:0,text:'異性戀'},
                    {value:1,text:'同性戀'},
                    {value:2,text:'雙性戀'}],
                relationItems:[
                    {value:0,text:'戀愛中'},
                    {value:1,text:'單身中'},
                    {value:2,text:'開放式關係中'}],
                findItems:[
                    {value:'男女朋友', text:'男女朋友'},
                    {value:'朋友', text:'朋友'},
                    {value:'不拘', text:'不拘'},
                    {value:'炮友', text:'炮友'}],
                locationItems:[
                    {value:'台北市', text:'台北市'},
                    {value:'新北市', text:'新北市'},
                    {value:'桃園市', text:'桃園市'},
                    {value:'台中市', text:'台中市'},
                    {value:'台南市', text:'台南市'},
                    {value:'高雄市', text:'高雄市'},
                    {value:'基隆市', text:'基隆市'},
                    {value:'新竹市', text:'新竹市'},
                    {value:'嘉義市', text:'嘉義市'},
                    {value:'新竹縣', text:'新竹縣'},
                    {value:'苗栗縣', text:'苗栗縣'},
                    {value:'彰化縣', text:'彰化縣'},
                    {value:'南投縣', text:'南投縣'},
                    {value:'雲林縣', text:'雲林縣'},
                    {value:'嘉義縣', text:'嘉義縣'},
                    {value:'屏東縣', text:'屏東縣'},
                    {value:'宜蘭縣', text:'宜蘭縣'},
                    {value:'花蓮縣', text:'花蓮縣'},
                    {value:'台東縣', text:'台東縣'},
                    {value:'澎湖縣', text:'澎湖縣'},
                    {value:'金門縣', text:'金門縣'},
                    {value:'連江縣', text:'連江縣'}],
                hasChange:false,
                interestString:"",
                isAvatarHovering: false,
                infoDialog:false,
                isEdit:false,
            }
        },
        created(){
            let self = this;
            this.$store.dispatch('actionUserinfo').then(data =>{
                self.interestString = data.interestlist.toString();
                self.userName = data.userName;
            });
        },
        computed: {
            user(){
                // if(!this.$store.state.userinfo.interestlist)
                //     this.$store.state.userinfo.interestlist = [];
                return this.$store.state.userinfo;
            },
            getImg(){
                let item = this.$store.state.userinfo;
                if(item && item.pictures && item.pictures.main && item.pictures.main.url){
                    return item.pictures.main.url;
                }
                let type = item._id || "1234567890abcdef".charAt(Math.floor(Math.random()*16));
                let sex = item.sex;
                if(typeof sex == "undefined" || sex == null)
                    sex = "01".charAt(Math.floor(Math.random()*2));
                let s = sex == 0 ? 'g' : 'b';
                let e = type.charAt(type.length - 1);
                item.pictures.main.url = require('../assets/img/avatars/'+s+e+'.svg');
                return item.pictures.main.url;
            },
            age(){
                if(this.user.birthday){
                    let now = new Date();
                    let birth = new Date(this.user.birthday);
                    return parseInt((now - birth) / (1000*60*60*24*365));
                }
                return '秘密';
            },
            horoscope(){
                let birth = new Date(this.user.birthday);
                let month = birth.getMonth()+1;
                let date = birth.getDate();
                let value = 'aquarius';
                if (month == 1 && date >=20 || month == 2 && date <=18) {value = "aquarius";}
                if (month == 2 && date >=19 || month == 3 && date <=20) {value = "pisces";}
                if (month == 3 && date >=21 || month == 4 && date <=19) {value = "aries";}
                if (month == 4 && date >=20 || month == 5 && date <=20) {value = "taurus";}
                if (month == 5 && date >=21 || month == 6 && date <=21) {value = "gemini";}
                if (month == 6 && date >=22 || month == 7 && date <=22) {value = "cancer";}
                if (month == 7 && date >=23 || month == 8 && date <=22) {value = "leo";}
                if (month == 8 && date >=23 || month == 9 && date <=22) {value = "virgo";}
                if (month == 9 && date >=23 || month == 10 && date <=22) {value = "libra";}
                if (month == 10 && date >=23 || month == 11 && date <=21) {value = "scorpio";}
                if (month == 11 && date >=22 || month == 12 && date <=21) {value = "sagittarius";}
                if (month == 12 && date >=22 || month == 1 && date <=19) {value = "capricorn";}
                return value;
            },
            countImg(){
                let imgName = ('0' + this.user.interestlist.length).slice(-2);
                return require('../assets/img/' + imgName + '.svg');
            },
            showClearAll(){
                return (
                    this.user.summary != "" ||
                    this.user.interestlist.length != 0 ||
                    this.user.location != "" ||
                    this.user.job != "" ||
                    this.user.expectationSex != null ||
                    this.user.status != null ||
                    this.user.lookingFor != "")
            }
        },
        methods:{
            update(type){
                if(!this.hasChange) return ;
                let param = {
                    userData:{}
                }
                switch (type){
                    case 'userName':
                        if(this.userName == ""){
                            this.userName = this.user.userName;
                            return ;
                        }
                        this.userName = this.userName.substr(0,15);
                        this.user.userName = this.userName;
                        param.userData[type] = this.user[type];
                        break;
                    case 'summary':
                        param.userData[type] = this.user[type];
                        break;
                    case 'job':
                        param.userData[type] = this.user[type];
                        break;
                    case 'location':
                        param.userData[type] = this.user[type];
                        break;
                    case 'expectationSex':
                        param.userData[type] = this.user[type];
                        break;
                    case 'status':
                        param.userData[type] = this.user[type];
                        break;
                    case 'lookingFor':
                        param.userData[type] = this.user[type];
                        break;
                    case 'interest':
                        param.userData.interestlist = this.interestString.split(',');
                    break;
                }
                this.$store.dispatch('actionUserUpdate', param)
                    .then((response) => {
                        console.log('ok',response)
                        this.hasChange = false;
                });
            },
            clearAll(){
                this.user.summary = "";
                this.user.interestlist = [];
                this.user.location = "";
                this.user.job = "";
                this.user.expectationSex = null;
                this.user.status = null;
                this.user.lookingFor = "";
            },
            updateAll(){
                let param = {
                    userData:{
                        summary:this.user.summary,
                        location:this.user.location,
                        job:this.user.job,
                        expectationSex:this.user.expectationSex,
                        status:this.user.status,
                        lookingFor:this.user.lookingFor
                    }
                }
                this.$store.dispatch('actionUserUpdate', param)
                    .then(() => {
                        this.$store.dispatch('actionUserinfo');
                    });
            }
        }
    }
</script>
<style>
.profile-bg{
    margin-bottom: 1px;
}
.profile-name{
    min-width: 112px;
    background: #FFFFFF;
    border: 1px solid #D6D5D1;
    box-sizing: border-box;
    border-radius: 10px;
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
.plus-icon{
    position:absolute;
    width: 30px;
    height: 30px;
    left: 83px;
    top: 89px;
    border: 4px solid #F2C611;
    background: white;
}
.img-zodiac{
    position:absolute;
    width: 40px;
    height: 40px;
    left: 85px;
    top: 95px;
    border: 4px solid #FFFFFF;
    background-image: url("https://i.imgur.com/8AB2ux4.png");
    background-size: 185px, 185px;
}
.aquarius{
    background-position: -98px -132px;
}
.pisces{
    background-position: -141px -132px;
}
.aries{
    background-position: -13px -22px;
}
.taurus{
    background-position: -56px -22px;
}
.gemini{
    background-position: -98px -22px;
}
.cancer{
    background-position: -141px -22px;
}
.leo{
    background-position: -13px -77px;
}
.virgo{
    background-position: -56px -77px;
}
.libra{
    background-position: -98px -77px;
}
.scorpio{
    background-position: -141px -77px;
}
.sagittarius{
    background-position: -13px -132px;
}
.capricorn{
    background-position: -56px -132px;
}
.member-container{
    display: grid;
    height: 100vh;
    grid-template-rows: 1fr auto;
}
.isAvatarHovering {
    filter:grey;
    -webkit-filter: grayscale(50%);
}
.inputClass{
    height: 96px;
}
.input-border{
    width:100%;
    border: 1px solid #D6D5D1;
    box-sizing: border-box;
    border-radius: 15px;
}
.charmbo-input{
    background-color: #FFFFFF;
}
.charmbo-input::placeholder{
    color: #D6D5D1;
}
.charmbo-input:disabled{
    background-color: #FAF9F7;
}
.charmbo-input:focus-visible{
    border: 2px solid #F2C611;
    outline: 0px;
}
.interest-border{
    border: 1px solid #F2C611;
    box-sizing: border-box;
    border-radius: 8px;
}
.flex-basis-1{
    flex-basis: 100%;
}
</style>