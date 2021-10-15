<template>
    <div class="max-width charmbo-bgcolor-gray">
        <div class="pt-12 mb-6 text-center fw-semi-bold">註冊會員</div>
        <div class="onboarding charmbo-bgcolor-white" style="height:100%">
            <div v-if="page === 1" class="page1">
            <p class="mb-12">您的姓名或暱稱</p>
            <v-text-field
                placeholder="輸入姓名或暱稱"
                class="field1"
                v-model="name"
                @keydown="name = name.substr(0,15)"
                @blur="name = name.substr(0,15)"
            ></v-text-field>
            <charmbo-button :disabled="name ===''" @click="page = 2">
                <span class="mx-2">下一步</span>
                <v-icon
                color="white"
                >mdi-arrow-right</v-icon>
            </charmbo-button>
            </div>
            <div v-if="page === 2" class="page3">
            <div style="text-align:left;margin-bottom: 54px;">
                <v-icon
                    large
                    class="icon-back"
                    color="black"
                    @click="page = 1"
                >mdi-chevron-left</v-icon>
            </div>
            <p class="mb-12">您的性別</p>
            <div :class="getSexClass(1)" @click="sex=1">男性</div>
            <div :class="getSexClass(0)" @click="sex=0">女性</div>
            <div :class="getSexClass(2)" @click="sex=2">其他</div>
            <div style="margin:228px"></div>
            <charmbo-button :disabled="sex === -1" @click="page = 3">
                <span class="mx-2">下一步</span>
                <v-icon
                color="white"
                >mdi-arrow-right</v-icon>
            </charmbo-button>
            </div>
            <div v-if="page === 3" class="page2">
            <div style="text-align:left;margin-bottom: 154px;">
            <v-icon
                large
                class="icon-back"
                color="black"
                @click="page = 2"
            >mdi-chevron-left</v-icon>
            </div>
            <p>您的生日</p>
            <div class="onboarding-message ma-4">請填寫真實生日，您的年紀將顯示於Charmbo上</div>
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on">
                        <span class="birth-input">{{showdate[0]}}</span>
                        <span class="birth-input">{{showdate[1]}}</span>
                        <span class="birth-input">{{showdate[2]}}</span>
                        <span class="birth-input">{{showdate[3]}}</span>
                        <span class="birth-input">{{showdate[5]}}</span>
                        <span class="birth-input">{{showdate[6]}}</span>
                        <span class="birth-input">{{showdate[8]}}</span>
                        <span class="birth-input">{{showdate[9]}}</span>
                    </div>
                </template>
                <v-date-picker
                    v-model="date"
                    :max="age18"
                    @input="menu = false,hasDate=true"
                ></v-date-picker>
            </v-menu>
            <div style="margin:194px"></div>
            <charmbo-button :disabled="!hasDate" @click="page = 4">
                <span class="mx-2">下一步</span>
                <v-icon
                color="white"
                >mdi-arrow-right</v-icon>
            </charmbo-button>
            </div>
            <div v-if="page === 4" class="page4">
            <div style="text-align:left;margin-bottom: 203px;">
                <v-icon
                    large
                    class="icon-back"
                    color="black"
                    @click="page = 3"
                >mdi-chevron-left</v-icon>
                <!-- <span class="page4-skip" @click="update">略過</span> -->
            </div>
            <p class="mb-12">您常出現在...</p>
            <v-select
                :items="locationItems"
                placeholder="我常出現在"
                class="page4-select"
                v-model="location"
            ></v-select>
            <div style="margin:167px"></div>
            <charmbo-button :disabled="location == ''" @click="page = 5">
                <span class="mx-2">下一步</span>
                <v-icon
                color="white"
                >mdi-arrow-right</v-icon>
            </charmbo-button>
            </div>
            <div v-if="page === 5" class="page3">
            <div style="text-align:left;margin-bottom: 4px;height:96px;">
                <v-icon
                    large
                    class="icon-back"
                    color="black"
                    @click="page = 4"
                >mdi-chevron-left</v-icon>
                <div class="page5-title px-4">上傳您的頭貼</div>
            </div>
            
            <div class="onboarding-photo cursor-pointer">
                <v-icon
                    class="rounded-circle photo-editor-plus"
                    size="80"
                    color="#F2F2F2"
                >mdi-plus-circle</v-icon>
            </div>
            <div class="onboarding-message mt-5">上傳明亮且清晰的個人正面照，<br>更容易散發你的魅力吸引別人喔</div>
            <div style="margin:94px"></div>
            <!-- <v-btn v-if="true" class="btn" @click="update">下一步</v-btn>
            <v-btn v-else class="btn" disabled>下一步</v-btn> -->
            <charmbo-button :disabled="false" @click="update">
                <span class="mx-2">下一步</span>
                <v-icon
                color="white"
                >mdi-arrow-right</v-icon>
            </charmbo-button>
            </div>
        </div>
    </div>
</template>
<script>
import CharmboButton from '@/components/CharmboButton.vue';
    export default {
        components: {
            CharmboButton
        },
        data(){
            return {
                page:1,
                name:'',
                menu:false,
                locationItems:['台北市','新北市','桃園市','台中市','台南市','高雄市','基隆市','新竹市','嘉義市','新竹縣','苗栗縣','彰化縣','南投縣','雲林縣','嘉義縣','屏東縣','宜蘭縣','花蓮縣','台東縣','澎湖縣','金門縣','連江縣'],
                //picker:new Date().toISOString().substr(0, 10),
                date:new Date(1990,0,2,0,0,0).toISOString().substr(0, 10),
                hasDate:false,
                sex:-1,
                location:'',
            }
        },
        computed: {
            showdate(){
                if(!this.hasDate)
                    return "YYYY-MM-DD";
                else
                    return this.date;
            },
            age18(){
                let d = new Date();
                d.setFullYear(d.getFullYear() - 18);
                return d.toISOString().substr(0, 10);
            }
        },
        methods:{
            getSexClass(sex){
                return this.sex == sex ? 'page3-item-active' : 'page3-item';
            },
            update(){
                let param = {
                    userData:{
                        userName:this.name,
                        birthday:new Date(this.date),
                        sex:this.sex,
                        location:this.location
                    }
                }
                this.$store.dispatch('actionUserUpdate', param)
                    .then(() => {
                        this.$router.push({name: 'index'})
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
.onboarding p{
    font-family: SF Pro Display;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 34px;

    /* margin: 0px auto 50px auto; */
    text-align: center;
}
.page5-title{
    display:inline-block;
    font-family: SF Pro Display;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 36px;
    margin-top:30px;
}
.page1{
    padding-top: 224px;
    text-align: center;
}
.page2{
    /* padding-top: 300px; */
    text-align: center;
}
.page3{
    text-align: center;
}
.page4{
    text-align: center;
}
.field1{
    width:240px;
    margin: 0px auto 200px auto;
}
.birth-input{
    width: 15px;
    height: 34px;
    /* margin: 0px auto 20px auto; */
    margin: 0 5px 0px 5px ;
    display: inline-block;
    color: #A4A4A4;
    border-bottom:1px #696969 solid;
}
.page3-item{
    width: 240px;
    height: 56px;
    border-radius: 16px;
    color: #A5A5A5;;
    font-family: SF Pro Display;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 34px;
    padding:11px 33px;
    text-align: left;
    margin:10px auto 0px auto;
    cursor: pointer;
}
.page3-item-active{
    width: 240px;
    height: 56px;
    background: #F5D036;
    border-radius: 16px;
    color: #454545;
    font-family: SF Pro Display;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 34px;
    padding:11px 33px;
    text-align: left;
    margin:10px auto 0px auto;
    cursor: pointer;
}
.page4-select{
    width: 240px;
    margin:0px auto;
}
.icon-back{
    margin: 30px ;
    text-align: left;
}
.page4-skip{
    margin: 30px ;
    float: right;
    line-height: 36px;
    color: #898989;
    cursor: pointer;
}
.onboarding-message{
    color: #A4A4A4;
    font-weight: 500;
    font-size: 10px;
    line-height: 18px
}
.onboarding-photo{
    display: inline-block;
    width: calc(100% - 50px);
    height: 400px;
    background: #E0E0E0;
    border: 1px solid #BDBDBD;
    box-sizing: border-box;
    border-radius: 8px;
    vertical-align: middle;
    line-height: 400px;
    text-align: center;
    margin-left:25px;
    margin-right:25px;
}
.onboarding{
    border-radius: 54px 54px 0px 0px;
    border: 2px solid #D6D5D1;
}
</style>