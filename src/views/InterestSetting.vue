<template>
    <div class="page-grid max-width">
        <div class="po-relative text-align-center charmbo-header-shadow py-2 mt-4">
            <div
                class="po-absolute ml-8 mt-3"
                @click="update">
                <v-img
                    :src="require('@/assets/img/back.svg')"
                    height="56"
                    width="56"
                />
            </div>
            <div class="fw-semi-bold fs-20 py-1">選擇興趣愛好</div>
            <div class="d-flex justify-center py-1">
                <div>
                    <v-img
                        :src="countImg"
                        height="24"
                        width="24" />
                </div>
            </div>
            <div class="fs-12 py-1 charmbo-text-color3">10個以內</div>
        </div>
        <div class="charmbo-bgcolor-gray pa-7 pt-3 charmbo-scroll">
            <div v-for="interestCategory in interestList" :key="interestCategory.category">
                <div class="ma-2">{{interestCategory.category}}</div>
                <div class="d-flex flex-wrap">
                    <div
                        class="py-2 px-4 mx-1 my-1 charmbo-bgcolor-white interest-btn"
                        :class="[btnClass(item)]"
                        v-for="item in interestCategory.items"
                        :key="item"
                        @click="clickItem(item)">
                        {{item}}
                    </div>
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
                selectedList:[],
                interestList:[
                    {
                        category:'運動',
                        items:['室內攀岩', '游泳', '格鬥', '健身', '騎腳踏車', '爬山', '籃球', '羽球', '桌球', '排球', '慢跑', '衝浪', '高爾夫球', '足球']
                    },
                    {
                        category:'聽音樂',
                        items:['獨立樂團', 'JPOP', 'KPOP', 'CPOP', '西洋', 'EDM', '爵士', '古典', '饒舌']
                    },
                    {
                        category:'玩音樂',
                        items:['吉他', '烏克麗麗', '鋼琴', '小提琴', '唱歌', '鼓', '合成器']
                    },
                    {
                        category:'影劇',
                        items:['Netflix', '追劇', '動畫', '電影', 'Podcast', 'Youtube', '卡通']
                    },
                    {
                        category:'閱讀',
                        items:['小說', '漫畫', '散文', '詩集']
                    },
                    {
                        category:'遊戲',
                        items:['電動', '手遊', '桌遊', '棋藝', 'PS5', '密室逃脫', 'SWITCH']
                    },
                    {
                        category:'藝文活動',
                        items:['展覽', '露營', '攝影', '旅遊', '繪畫', '品酒', '購物', '花藝', '聊天', '裁縫', '編織']
                    },
                    {
                        category:'寵物',
                        items:['貓奴', '狗奴', '鼠奴', '兔奴', '爬蟲奴', '鳥奴', '植物']
                    },
                    {
                        category:'聊天哈啦',
                        items:['社會議題', '時事新聞', '哲學思考', '資深鄉民']
                    },
                    {
                        category:'社交/聚會',
                        items:['派對', '夜店', '唱歌', '美食', '野餐']
                    },
                ]
            }
        },
        created(){
            
        },
        mounted(){
            this.selectedList = [...this.user.interestlist];
        },
        computed: {
            user(){
                return this.$store.state.userinfo;
            },
            countImg(){
                let imgName = ('0' + this.selectedList.length).slice(-2);
                return require('../assets/img/' + imgName + '.svg');
            }
        },
        methods:{
            clickItem(item){
                if(this.selectedList.indexOf(item) == -1){
                    if(this.selectedList.length >= 10)
                        return ;
                    this.selectedList.push(item);
                }
                else
                    this.selectedList = this.selectedList.filter(i => i != item);
            },
            btnClass(item){
                if(this.selectedList.indexOf(item) != -1)
                    return 'btn-active';
                if(this.selectedList.length === 10)
                    return 'btn-disable';
            },
            update(){
                let param = {
                    userData:{
                        interestlist: [...this.selectedList]
                    }
                }
                this.$store.dispatch('actionUserUpdate', param)
                    .finally(() => {
                        this.$router.push({ name: 'profile' })
                });
            }
        }
    }
</script>
<style>
.interest-btn{
    border: 1px solid #D6D5D5;
    box-sizing: border-box;
    border-radius: 8px;
}
.btn-active{
    background: #F8DE71;
    border: 1px solid #F2C611;
}
.btn-disable{
    background: #FAF9F7;
    border: 1px solid #BDBDBD;
}
.page-grid{
    display: grid;
    height: 100vh;
    grid-template-rows: auto 1fr;
    gap:1px;
}

</style>