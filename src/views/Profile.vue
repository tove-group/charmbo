<template>
    <div class="member-container max-width">
        <div style="overflow-y: scroll;">
        <div class="profile-bg">
            <div class="rel" @click="$router.push({name: 'photoEditor'})">
                <v-img 
                    width="130"
                    height="130"
                    :src="getImg"
                    class="rounded-circle mx-auto img-avatar cursor-pointer"
                    :class="{isAvatarHovering: isAvatarHovering}"
                    style="border: 5px solid white;"
                    @mouseover="isAvatarHovering= true"
                    @mouseout="isAvatarHovering=false"
                ></v-img>
                <!-- <div class="rounded-circle img-zodiac" :class="[horoscope]"></div> -->
                <v-icon
                    class="rounded-circle plus-icon"
                    size="40"
                    color="#BDBDBD"
                >mdi-plus-circle</v-icon>
            </div>
            <v-text-field
                class="profile-name"
                solo
                dense
                v-model="userName"
                @blur="update('userName')"
                @change="hasChange = true"></v-text-field>
            <p class="profile-age">{{age}}</p>
        </div>
        <p class="profile-achievement">個人成就</p>
        <div style="overflow-y:hidden;min-width:360px">
        <span class="profile-view" @click="infoDialog = true">檔案預覽</span><span class="profile-set cursor-pointer" @click="$router.push({name: 'setting'})">設定</span>
        </div>
        <div class="input-aeras">
            <v-text-field
                label="自我介紹"
                placeholder="我喜歡..."
                v-model="user.summary"
                @blur="update('summary')"
                @change="hasChange = true"
            ></v-text-field>
            <v-text-field
                label="職業"
                placeholder="工作"
                v-model="user.job"
                @blur="update('job')"
                @change="hasChange = true"
            ></v-text-field>
            <v-text-field
                label="興趣愛好"
                placeholder="興趣"
                v-model="interestString"
                @blur="update('interest')"
                @change="hasChange = true"
            ></v-text-field>
            <v-select
                :items="locationItems"
                label="我常出現在"
                v-model="user.location"
                @blur="update('location')"
                @change="hasChange = true"
                multiple
            ></v-select>
            <v-select
                :items="sexItems"
                label="戀愛取向"
                v-model="user.expectationSex"
                @blur="update('expectationSex')"
                @change="hasChange = true"
            ></v-select>
            <v-select
                :items="relationItems"
                label="感情狀態"
                v-model="user.status"
                @blur="update('status')"
                @change="hasChange = true"
            ></v-select>
            <v-select
                :items="findItems"
                label="我想尋找"
                v-model="user.lookingFor"
                @blur="update('lookingFor')"
                @change="hasChange = true"
            ></v-select>
        </div>
        <user-info-dialog :user="user" :dialog.sync="infoDialog"></user-info-dialog>
        </div>
        <footer-bar activeTab="profile"></footer-bar>
    </div>
</template>
<script>
    import FooterBar from '../components/Footer.vue';
    import UserInfoDialog from '../components/UserInfoDialog.vue';
    export default {
        components: {
            FooterBar,
            UserInfoDialog
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
                infoDialog:false
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
    /* position: fixed; */
    height: 287px;
    left: 0px;
    right: 0px;
    top: 44px;

    background: #F2F2F2;
    border-radius: 2px;
    text-align: center;

    padding-top: 48px;
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
.plus-icon{
    position:absolute;
    width: 40px;
    height: 40px;
    left: 50px;
    top: 95px;
    border: 4px solid #FFFFFF;
    background: #F2F2F2;
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
.profile-age{
    margin-top: 15px;
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
.profile-view{
    display: inline-block;
    width: 229px;
    height: 36px;
    background: #BDBDBD;
    border-radius: 50px;
    margin: 0px 16px 0 30px;
    text-align: center;
    line-height: 36px;
}
.profile-set{
    display: inline-block;
    width: 66px;
    height: 36px;
    background: #BDBDBD;
    border-radius: 50px;
    margin-left:16px;
    text-align: center;
    line-height: 36px;
}
.input-aeras{
    width: 311px;
    margin: 10px auto 0 auto;
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
</style>