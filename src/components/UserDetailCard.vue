<template>
    <div class="detail-data border-radius-20 charmbo-bgcolor-white">
        <div>
            <v-img 
                :src="user.pictures.main.url"
            ></v-img>
        </div>
        <div class="pa-4">
            <div class="d-flex justify-space-between align-center">
            <div class="fs-24 fw-black">{{ user.userName}}</div>
            <div><v-img
                contain
                :src="sexIcon"
            ></v-img></div>
            </div>
            <div class="d-flex fs-12 my-1">
                <div class="mr-4">{{age}}</div>
                <div class="mr-4">{{horoscope}}</div>
                <div class="">{{user.job}}</div>
                <div class="ml-auto">距離幾公里</div>
            </div>
            <div class="pt-1 hobby-area d-flex flex-wrap">
                <div v-for="(hobby, index) in user.interestlist" class="match-hobby px-3 py-1 mr-2 mb-2" :key="index" :class="[nowColor]">{{hobby}}</div>
            </div>
            <hr class="my-4">
            <p class="charmbo-text-color8 ml-3 my-2">自我介紹</p>
            <p
                class="border-radius-8 my-2 pa-2 charmbo-bgcolor-gray"
            >{{user.summary}}</p>
            <p class="charmbo-text-color8 ml-3 my-2">生活照</p>
            <div class="d-flex flex-wrap justify-center">
                <div 
                    class="photo-editor-photo cursor-pointer ma-2 po-relative"
                    :class="{'charmbo-bgcolor-chat':img.publicId}"
                    v-for="(img) in getOthersImgs" 
                    :key="img._id" 
                >
                    <img 
                        class="photo-style po-absolute"
                        style="left:0px"
                        v-if="img.url"
                        :src="img.url"
                    >
                </div>    
            </div>
            <hr class="my-2">
            <div class="d-flex align-center justify-center mb-10 mt-7">
                <div class="d-flex align-center justify-center mr-1"
                        style="width:16px;height:16px"
                    >
                    <img
                        :src="require('@/assets/img/location.svg')"
                        height="15"
                        width="12"
                    />
                </div>
                <div class="charmbo-text-color8">{{user.location}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type:Object,
        },
    },
    data(){
        return {
            imgConvert:[
            'woman','man','nonsexual'
            ]
        }
    },
    computed: {
        horoscope(){
            let birth = new Date(this.user.birthday);
            let month = birth.getMonth()+1;
            let date = birth.getDate();
            if (month == 1 && date >=20 || month == 2 && date <=18) return "水瓶座";
            if (month == 2 && date >=19 || month == 3 && date <=20) return "雙魚座";
            if (month == 3 && date >=21 || month == 4 && date <=19) return "牧羊座";
            if (month == 4 && date >=20 || month == 5 && date <=20) return "金牛座";
            if (month == 5 && date >=21 || month == 6 && date <=21) return "雙子座";
            if (month == 6 && date >=22 || month == 7 && date <=22) return "巨蟹座";
            if (month == 7 && date >=23 || month == 8 && date <=22) return "獅子座";
            if (month == 8 && date >=23 || month == 9 && date <=22) return "處女座";
            if (month == 9 && date >=23 || month == 10 && date <=22) return "天秤座";
            if (month == 10 && date >=23 || month == 11 && date <=21) return "天蠍座";
            if (month == 11 && date >=22 || month == 12 && date <=21) return "射手座";
            if (month == 12 && date >=22 || month == 1 && date <=19) return "摩羯座";
            return '水瓶座';
            },
        age() {
            if (this.user.birthday) {
                let now = new Date();
                let birth = new Date(this.user.birthday);
                return parseInt((now - birth) / (1000 * 60 * 60 * 24 * 365));
            }
            return '秘密';
        },
        sexIcon(){
            return require('@/assets/img/'+ (this.imgConvert[this.user.sex] || 'nonsexual') +'.svg')
        },
        interestlist(){
            if(this.user.interestlist.length === 0)
                return ["hobby"];
            return this.user.interestlist;
        },
        nowColor(){
            return 'color' + this.nowAchieve;
        },
        getOthersImgs() {
            if(this.user && this.user.pictures && this.user.pictures.others){
                return this.user.pictures.others.filter(pic => pic.publicId);
            }
            return [];
        }
    },
    methods:{

    }
}
</script>

<style scoped>
.match-hobby{
    background: #E0E0E0;
    border-radius: 40px;
    color: #333333;
    word-break: keep-all;
}
hr{
    border: 1px solid #F2F2F2;
}
.photo-editor-photo{
    display: inline-block;
    height: 189px;
    width: 141px;
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
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    /* border-radius: 20px; */
}
</style>