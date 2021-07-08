<template>
    <div class="member-container max-width">
        <div style="overflow-y: scroll;">
            <div class="profile-bg pt-7 pb-3" style="box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);">
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
                        <!-- <v-text-field
                            class="profile-name"
                            solo
                            dense
                            v-model="userName"
                            @blur="update('userName')"
                            @change="hasChange = true"></v-text-field> -->
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
                    @blur="update('summary')"
                    @change="hasChange = true"
                />
                <div class="fw-medium mt-6 mb-1 d-flex align-center">
                    <div>興趣愛好</div>
                    <div class="ml-1 charmbo-bgcolor-primary charmbo-text-color5 rounded-circle text-center" style="width:16px;height:16px;line-height:16px">{{user.interestlist.length}}</div>
                </div>
                <div
                    class="input-border d-flex flex-wrap pa-2"
                    :class="isEdit?'charmbo-bgcolor-white':''"
                    @click="isEdit && $router.push({name: 'interestSetting'})">
                    <div
                        v-for="(interest, index) in user.interestlist"
                        :key="index"
                        
                        class="my-1 mx-1 px-3 py-1 charmbo-bgcolor-chat interest-border"
                        >
                        {{interest}}
                    </div>
                </div>
                <!-- <input
                    class="input-border charmbo-input py-2 px-3"
                    v-model="interestString"
                    placeholder="興趣"
                    :disabled="!isEdit"
                    @blur="update('interest')"
                    @change="hasChange = true"
                /> -->
                <div class="d-flex">
                    <div class="mr-3">
                        <div class="fw-medium mt-6 mb-1">我常出現在</div>
                        <input
                            class="input-border charmbo-input py-2 px-3"
                            v-model="user.location"
                            placeholder="台北市"
                            :disabled="!isEdit"
                            @blur="update('location')"
                            @change="hasChange = true"
                        />
                        <!-- <v-select
                        :items="locationItems"
                        label="我常出現在"
                        v-model="user.location"
                        @blur="update('location')"
                        @change="hasChange = true"
                        multiple
                    ></v-select> -->
                    </div>
                    <div class="ml-3">
                        <div class="fw-medium mt-6 mb-1">職業</div>
                        <input
                            class="input-border charmbo-input py-2 px-3"
                            v-model="user.job"
                            placeholder="工作"
                            :disabled="!isEdit"
                            @blur="update('job')"
                            @change="hasChange = true"
                        />
                        <!-- <v-text-field
                            label="職業"
                            placeholder="工作"
                            v-model="user.job"
                            @blur="update('job')"
                            @change="hasChange = true"
                        ></v-text-field> -->
                    </div>
                </div>
                <div class="d-flex">
                    <div>
                        <select>
                            <option>-- 請選擇 --</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        <div class="fw-medium mt-6 mb-1">戀愛取向</div>
                        <v-select
                            :items="sexItems"
                            label="戀愛取向"
                            v-model="user.expectationSex"
                            @blur="update('expectationSex')"
                            @change="hasChange = true"
                        ></v-select>
                    </div>
                    <div></div>
                </div>
                <div class="d-flex">
                    <div>
                        <div class="fw-medium mt-6 mb-1">感情狀態</div>
                        <v-select
                            :items="relationItems"
                            label="感情狀態"
                            v-model="user.status"
                            @blur="update('status')"
                            @change="hasChange = true"
                        ></v-select>
                    </div>
                    <div>
                        <div class="fw-medium mt-6 mb-1">我想尋找</div>
                        <v-select
                            :items="findItems"
                            label="我想尋找"
                            v-model="user.lookingFor"
                            @blur="update('lookingFor')"
                            @change="hasChange = true"
                        ></v-select>
                    </div>
                </div>
                <div class="text-center">
                    <charmbo-botton v-if="!isEdit" @click="isEdit = true">
                        <div class="fs-16 fw-semi-bold">更改</div>
                    </charmbo-botton>
                    <span v-if="isEdit" class="fs-16 fw-semi-bold mr-5 charmbo-color-primary">全部清除</span>
                    <charmbo-botton v-if="isEdit" @click="isEdit = false">
                        <div class="fs-16 fw-semi-bold">確認</div>
                    </charmbo-botton>
                </div>
            </div>
            <user-info-dialog :user="user" :dialog.sync="infoDialog"></user-info-dialog>
        </div>
        <footer-bar activeTab="profile"></footer-bar>
    </div>
</template>
<script>
    import FooterBar from '../components/Footer.vue';
    import UserInfoDialog from '../components/UserInfoDialog.vue';
    import CharmboBotton from '@/components/CharmboBotton.vue';
    export default {
        components: {
            FooterBar,
            UserInfoDialog,
            CharmboBotton
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
                findItems:['男女朋友','朋友','不拘','炮友'],
                locationItems:['台北市','新北市','桃園市','台中市','台南市','高雄市','基隆市','新竹市','嘉義市','新竹縣','苗栗縣','彰化縣','南投縣','雲林縣','嘉義縣','屏東縣','宜蘭縣','花蓮縣','台東縣','澎湖縣','金門縣','連江縣'],
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
.profile-achievement{
    width: 327px;
    height: 80px;
    background: #E0E0E0;
    border-radius: 14px;
    margin: -40px auto 0 auto;
    text-align: center;
    line-height: 80px;
}
.cursor-pointer{
    cursor: pointer;
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
</style>