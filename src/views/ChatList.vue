<template>
    <div class="page-chat-list max-width">
    <div class="charmbo-header-shadow">
        <div class="mt-16 d-flex justify-center"><div class="fw-semi-bold fs-20">對話</div></div>
        <div class="search-bar d-flex align-center mt-2 mb-1 mx-10">
            <div class="mr-3">
            <v-img
                :src="require('../assets/img/search.svg')"
                height="16"
                width="16"
            />
            </div>
            <input class="search-input my-2" placeholder="搜尋已配對對象" v-model="searchString">
            <v-icon
            v-show="searchString != ''"
            @click= "searchString = ''"
            color="black"
            class="mt-1 mb-1"
            >mdi-window-close</v-icon>    
        </div>
        <div class="d-flex fw-medium fs-12">
            <div class="flex-grow-1 d-flex align-center justify-center py-2 active">
                <div>配對對話</div>
            </div>
            <div class="flex-grow-1 d-flex align-center justify-center py-2">
                <div>邀請對話</div>
                <div class="pb-2">
                    <v-img
                        :src="require('../assets/img/star.svg')"
                        height="10"
                        width="10"
                    />
                </div>
            </div>
        </div>
    </div>
        <div class="pa-0 charmbo-bgcolor-gray" style="overflow-x:hidden">
            <room-item key="charmbo" :item="charmboroom" @clickItem="toChatRoom" @clickPin="clickPin"></room-item>
            <v-card
                v-if="filterChatRoom.length > 0"
                flat
                class="d-flex flex-column"
            >
            <transition-group tag="div" name="roomlist">
                <room-item v-for="item in filterChatRoom" :key="item._id" :item="item" @clickItem="toChatRoom" @clickPin="clickPin"></room-item>
            </transition-group>
            </v-card>
            <div v-else-if="!loading && !searchString">
                <div class="text-center">
                    <div class="my-15 fs-20 font-weight fw-semi-bold">發揮你的魅力，<br>尋找更多對象吧！</div>
                    <div>
                        <charmbo-botton @click="$router.push({name: 'profile'})">
                            <div class="fs-16 fw-semi-bold">增添個人魅力</div>
                        </charmbo-botton>
                    </div>
                    <div class="mt-6">
                        <charmbo-botton outline @click="$router.push({name: 'pair'})">
                            <div class="fs-16 fw-semi-bold">繼續尋找對象</div>
                        </charmbo-botton>
                    </div>
                </div>
            </div>
            <div v-else-if="!loading && searchString"><div class="text-center mt-5 no-result-text">沒有符合的搜尋結果耶<br>你再仔細想想他的名字？</div></div>
            <div v-else class="chatListLoadingSpinner d-flex justify-center align-center">
                <lottie-animation
                    :animationData="require('@/assets/loading.json')"
                    :loop="true"/>
            </div>
        </div>
        <footer-bar activeTab="chatList"></footer-bar>
    </div>
</template>
<script>
import RoomItem from '@/components/RoomItem.vue'
import FooterBar from '@/components/Footer.vue';
import CharmboBotton from '@/components/CharmboBotton.vue';
import LottieAnimation from 'lottie-web-vue';
export default {
    components:{
        RoomItem,
        FooterBar,
        CharmboBotton,
        LottieAnimation
    },
    data() {
        return {
            searchString: "",
            loading: true
        };
    },
    /*
    beforeRouteEnter (to, from, next) {
        next((vm)=>{if(from.name!='chatRoom') vm.$store.dispatch('actionFriendList')});
    },*/
    async created() {
        await this.$store.dispatch('actionFriendList');
        this.$store.dispatch('actionCharmboMessage');
        this.loading = false;
    },
    computed: {
        charmboroom(){
            return this.$store.state.charmboRoom;
        },
        chatRoom() {
            return this.$store.state.chatRoom;
        },
        filterChatRoom(){
            if(this.searchString) {
                return this.chatRoom.filter(chat => chat.userName.includes(this.searchString));
            } else {
                return this.chatRoom;
            }
        },
    },
    methods: {
        toIndex() {
            this.$router.push({ name: 'index' });
        },
        toChatRoom(item) {
            if (!item._id) return;
            this.$router.push({ name: 'chatRoom', query: {id:item._id}}); //id: receiver_id
        },
        clickPin(item){
            let param = {
                id:item._id,
                pinned:item.pinned
            }
            this.$store.dispatch('actionPinUser',param);
        }
    },
};
</script>
<style>
.search-bar{
    background: #FFFFFF;
    border-radius: 16px;
    border: 1px solid #D6D5D1;
    padding:0px 12px;
    }
input:focus{
    outline: 0px;
    }
.search-input{
    line-height: 16px;
    font-size: 12px;
    vertical-align: middle;
    width:230px;
    }
.no-result-text{
    font-size: 18px;
    line-height: 140%;
    font-weight: 500;
    }
.no-friend-btn{
    vertical-align: middle;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    display:inline-block;
    height: 51px;
    background: #50555C;
    border-radius: 69px;
    color: #FFFFFF;
    padding:12px 24px;
    margin:8px 0px;
    cursor: pointer;
}
.chatListLoadingSpinner {
    height:calc(100% - 80px);
}
.roomlist-move{
    transition: all 0.8s ease;
}
.page-chat-list{
    display: grid;
    height: 100vh;
    grid-template-rows: auto 1fr auto;
    gap:1px;
}
.active{
    border-bottom: 4px solid #F2C611;
}
</style>
