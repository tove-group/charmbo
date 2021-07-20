<template>
    <div class="page-chatroom max-width message-container charmbo-bgcolor-gray">
        <div v-if="showScrollBtn" class="scroll-btn">
            <v-icon
                size="40"
                @click="scrollToEnd"
                >mdi-arrow-down-bold-circle
            </v-icon>
        </div>
        <div class="charmbo-header-shadow d-flex justify-space-between charmbo-bgcolor-white px-8 py-4">
            <div @click="$router.push({ name: 'chatList' })">
                <v-img
                    :src="require('../assets/img/back.svg')"
                    height="56"
                    width="56"
                />
            </div>
            <div class="d-flex flex-column align-center">
                <div class="my-2">
                    <v-avatar size="56">
                        <v-img
                            :src="getImg()"
                            class="rounded-circle"
                            @click="callNativeApp('uid : test0001'),openInfoDialog()"
                        ></v-img>
                    </v-avatar>
                </div>
                <div class="fw-semi-bold">{{ storeReceiver.userName }}</div>
            </div>
            <div class="pt-2 text-align-center" style="width:56px;"><option-dialog v-if="!isCharmboRoom" @sentReport="sentReport" ref="optionDialog"></option-dialog></div>
        </div>
        <div style="overflow-y: scroll;" id="messageContainer">
            <v-card color="#FAF9F7" flat class="d-flex flex-column pt-3">
                <v-btn v-if="storeReceiver.message && storeReceiver.message.length==0 && !isCharmboRoom" text color="#7E7E7E" class="mb-5">
                    向對方打聲招呼~
                </v-btn>
                <infinite-loading
                    v-if="storeReceiver.message && storeReceiver.message.length"
                    spinner="spiral"
                    direction="top"
                    @infinite="loadHistoryMsg"
                >
                    <div slot="no-more"></div>
                    <div slot="no-results"></div>
                </infinite-loading>
                <template
                    v-for="(item,index) in storeReceiver.message">
                    <div
                    :key="item.id"
                    class="my-3 d-flex justify-center"
                    v-if="
                        index == 0 ||
                        datesAreNotSameDay(
                            storeReceiver.message[index - 1].createdAt,
                            item.createdAt
                        )">
                    <div class="date text-align-center">
                        {{ dayFormate(item.createdAt) }}
                    </div>
                    </div>
                    <CharmboMessage
                    :key="item.id"
                    :item="item"
                    :isReceive="isReceiver(item.receiver)"
                    :type="getMessageType(index)"
                    @click="charmboMessageClick">
                    </CharmboMessage>
                </template>
                <v-dialog
                    v-if="selectedImg"
                    v-model="imgDialog"
                    content-class="img-dialog"
                    overlay-color="#000000"
                    overlay-opacity="0.6"
                >
                    <v-card>
                    <v-img
                        :src="selectedImg.file"
                        v-bind:alt="selectedImg.fileName"
                    >
                    </v-img>
                    </v-card>
                    <div @click="imgDialog = false" class="text-align-center mt-8">
                        <charmbo-botton outline>繼續聊天</charmbo-botton>
                    </div>
                </v-dialog>
                <v-dialog
                    v-model="showGifDialog"
                    content-class="gif-dialog"
                    overlay-color="#000000"
                    overlay-opacity="0.6"
                    transition="dialog-bottom-transition"
                >
                    <v-card
                        class="pa-2 gif-card"
                        >
                        <div></div>
                        <div class="search-bar d-flex align-center mt-2 mb-1">
                            <div class="mr-3">
                            <v-img
                                :src="require('../assets/img/search.svg')"
                                height="16"
                                width="16"
                            />
                            </div>
                            <input class="gif-input my-2 flex-grow-1" placeholder="搜尋GIF" v-model="searchKey">
                            <v-icon
                            v-show="searchKey != ''"
                            @click= "searchKey = ''"
                            color="black"
                            >mdi-window-close</v-icon>    
                        </div>
                        <div class="d-flex flex-wrap charmbo-scroll">
                            <div v-for="(gif, index) in gifs" :key="index" class="pa-1" style="width:50%">
                                <v-img class="gifImg" :src="gif" @click="sendImages(gif),showGifDialog = false">
                                <template v-slot:placeholder>
                                    <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                                    >
                                    <v-progress-circular
                                        indeterminate
                                        color="grey"
                                    ></v-progress-circular>
                                    </v-row>
                                </template>
                                </v-img>
                            </div>
                        </div>
                    </v-card>
                </v-dialog>
                <!-- <div v-for="(item) in storeReceiver.message" :key="item.id">
                    <div v-if="getUnreadStatus(item.createdAt)" class="mb-5 unreadBar">
                    <v-icon left small class="unreadBar-icon">
                        mdi-more
                    </v-icon>
                    Unread messages below
                    </div>
                </div> -->
                <!-- <div v-if="storeReceiver.isTyping" class="mb-5">
                    <div class="typingIndicatorContainer">
                    <div class="typingIndicatorBubble">
                        <div class="typingIndicatorBubbleDot"></div>
                        <div class="typingIndicatorBubbleDot"></div>
                        <div class="typingIndicatorBubbleDot"></div>
                    </div>
                    </div>
                </div> -->
                <div v-if="storeReceiver.isLeft" class="chatroom-leave-message text-align-center">喔歐， {{ storeReceiver.userName }} 已離開聊天室<br>
                    聊天室將於一天後關閉喔
                </div>
            </v-card>

        </div>
    <div v-if="!isCharmboRoom" class="tool-bar d-flex align-center pa-2">
        <div v-if="!isTyping" class="pa-1 ml-2">
            <v-img
                :src="require('../assets/img/chatroom/image.svg')"
                height="24"
                width="24"
                @click="imgClickHandle"/>
            <input
                v-show="false"
                ref="finput"
                type="file"
                accept="image/png, image/jpeg, image/bmp"
                @change="sendImages(null,$event)"/>
        </div>
        <div v-if="!isTyping" class="tool-emoji pa-1 mx-1">
            <v-img
            @click="showGifDialog = !showGifDialog"
            :src="require('../assets/img/chatroom/emoji.svg')"
            height="24"
            width="24"
            />
        </div>
        <div class="tool-text py-2 flex-grow-1 ml-1">
            <input
                id="input"
                v-model="msg.content"
                placeholder="輸入訊息..."
                type="text"
                class="textbox charmbo-bgcolor-white"
                autocomplete="off"
                @focus="startTyping"
                @blur="stopTyping"
                @keydown="scrollToEnd"
                @click="scrollToEnd"
                @keydown.stop.prevent.enter="send"/>
        </div>
        <div class="tool-sent py-1 px-2">
            <v-img
            @click="send"
            :src="require('../assets/img/chatroom/send.svg')"
            height="40"
            width="40"
            />
        </div>

    </div>
    <user-info-dialog :user="friendDetailData" :dialog.sync="infoDialog" :loading="loadingFriendInfo"></user-info-dialog>
    </div>
</template>
<script>
import imageCompression from 'browser-image-compression';
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';
import { debounce } from "lodash";
import OptionDialog from '@/components/ChatroomOptionDialog.vue';
import UserInfoDialog from '@/components/UserInfoDialog.vue';
import CharmboMessage from '@/components/CharmboMessage.vue';
import CharmboBotton from '@/components/CharmboBotton.vue';
export default {
    components: {
        InfiniteLoading,
        OptionDialog,
        UserInfoDialog,
        CharmboMessage,
        CharmboBotton
    },
    data() {
        return {
            msg: {
                name: 'Angus',
                type: true,
                time: Date.now(),
                content: '',
            },
            images: null,
            imgDialog: false,
            selectedImg: null,
            showGifDialog: false,
            searchKey: '',
            gifs:[],
            gif:'',
            showScrollBtn:false,
            infoDialog:false,
            friendDetailData:{
                pictures:{
                main:{},
                others:{}
                },
                interestlist:[]
            },
            loadingFriendInfo:false,
            prevLastSeenMessageTimeStamp: null,
            isTyping: false,
        }
    },
    computed: {
        storeReceiver(){
        if(this.$route.query.id === "charmbo"){
            return this.$store.state.charmboRoom;
        }
        return this.$store.state.chatRoom.find(
            (e) => e._id === this.$route.query.id
        ) || {message:[],isTyping:false};
        },
        isCharmboRoom(){
        return this.$route.query.id === "charmbo";
        }
    },
    created() {
        this.debounceGifSearch = debounce(this.getGif, 500); //debounce 0.5sec

        //Initialize `prevLastSeenMessageTimeStamp`:  prevent shoiwing unread message notification
        const lastIdx = this.storeReceiver.message.length-1;
        this.prevLastSeenMessageTimeStamp = (lastIdx >= 0)? this.storeReceiver.message[lastIdx].createdAt : null;

        //Detect page close or page change
        window.addEventListener('beforeunload', event => this.saveLastSeenMessageTimestamp(event), {capture: true});
    },
    beforeDestroy() {
        window.removeEventListener('beforeunload', event => this.saveLastSeenMessageTimestamp(event), {capture: true});
    },
    mounted() {
        let self = this;
        this.debounceGifSearch();
        const container = document.getElementById('messageContainer');
        container.onscroll = () => {
        if(container.scrollTop < container.scrollHeight - container.clientHeight){
            self.showScrollBtn = true;
        }
        else
            self.showScrollBtn = false;
        };
        this.$nextTick(() => this.scrollToEnd());
    },
    watch: {
        searchKey() {
        this.debounceGifSearch();
        }
    },
    methods: {
        async send() {
        const vm = this;
        const receiver = this.storeReceiver;
        // avoid sending space
        if (vm.msg.content.length > 0) {
            let sendMessage = {
            chatRoomID: receiver.chatRoomID,
            receiverChatID: receiver._id,
            senderChatID: vm.$store.state.userinfo._id,
            text: vm.msg.content,
            image: {
                file: null,
                fileName: null,
            },
            createdAt: new Date(Date.now()),
            };
            console.log(sendMessage);
            this.$socket.client.emit('send_message', sendMessage);
            let saveData = {
            friendsId: receiver._id,
            data: {
                sender: vm.$store.state.userinfo._id,
                text: vm.msg.content,
                image: {
                file: null,
                fileName: null,
                },
                createdAt: new Date(Date.now()),
            },
            };
            vm.msg.content = '';
            await this.$store.dispatch('actionReceiveMessage', saveData);
            this.scrollToEnd();
        }
        },
        async sendImages(url=undefined, e=null) {
        //submit images
        //images : this.images
        console.log('send images');
        //const imageFile = this.images;
        let imageFile = null;
        if(e)
            imageFile = e.target.files[0] || e.dataTransfer.files[0];
        console.log(e,imageFile)
        const options = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 600,
            useWebWorker: true,
        };
        const readThenSendFile = (data) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
            const vm = this;
            const receiver = this.storeReceiver;
            await sendfile(event.target.result, data.name, vm, receiver);
            };
            reader.readAsDataURL(data);
            reader.onerror = () => {
            alert('Could not read the file: large file size');
            };
        };
        async function sendfile(file, fileName, vm, receiver) {
            let sendMessage = {
            chatRoomID: receiver.chatRoomID,
            receiverChatID: receiver._id,
            senderChatID: vm.$store.state.userinfo._id,
            text: null,
            image: {
                file: file,
                fileName: fileName,
            },
            createdAt: new Date(Date.now()),
            };
            console.log(sendMessage);
            vm.$socket.client.emit('send_message', sendMessage);
            let saveData = {
            friendsId: receiver._id,
            data: {
                sender: vm.$store.state.userinfo._id,
                text: null,
                image: {
                file: file,
                fileName: fileName,
                },
                createdAt: new Date(Date.now()),
            },
            };
            await vm.$store.dispatch('actionReceiveMessage', saveData);
            vm.scrollToEnd();
        }

        try {
            if (url) {
            const vm = this;
            const receiver = this.storeReceiver;
            const randomName = Math.random().toString(36).substring(7)+'.gif';
            await sendfile(url, randomName, vm, receiver);
            } else {
            const compressedFile = await imageCompression(imageFile, options);
            console.log(
                'compressedFile instanceof Blob',
                compressedFile instanceof Blob
            ); // true
            console.log(
                `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
            ); // smaller than maxSizeMB
            await readThenSendFile(compressedFile);
            } 
        } catch (error) {
            console.log(error);
        }
        },
        isReceiver(id) {
        return this.$store.state.userinfo._id === id;
        },
        callNativeApp(data) {
        try {
            window.webkit.messageHandlers.callbackHandler.postMessage(data);
        } catch (err) {
            console.log('The native context doesnt exist yet!');
        }
        },
        stopTyping() {
            this.isTyping = false;
            console.log('stopTyping');
            const vm = this;
            const receiver = this.storeReceiver;
            this.$socket.client.emit('typing', {
                receiverChatId: receiver._id,
                senderChatId: vm.$store.state.userinfo._id,
                isTyping: false,
            });
        },
        startTyping() {
            this.isTyping = true;
            console.log('startTyping');
            const vm = this;
            const receiver = this.storeReceiver;
            this.$socket.client.emit('typing', {
                receiverChatId: receiver._id,
                senderChatId: vm.$store.state.userinfo._id,
                isTyping: true,
            });
        },
        scrollToEnd() {
        const container = document.getElementById('messageContainer');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
        },
        loadHistoryMsg($state) {
        const receiver = this.storeReceiver;
        const data = {
            friendsId: receiver._id,
            chatRoomID: receiver.chatRoomID,
            lastMessageId: receiver.message[0]._id,
        };
        this.$store
            .dispatch('actionLoadHistoryMessage', data)
            .then((res) => {
            if (res > 0) {
                $state.loaded();
            } else {
                $state.complete();
            }
            })
            .catch(() => {
            $state.error();
            });
        },
        timeFormat(time) {
        let d = new Date(time);
        return (
            ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2)
        );
        },
        datesAreNotSameDay(first, second) {
        let day1 = new Date(first);
        let day2 = new Date(second);
        return !(
            day1.getFullYear() === day2.getFullYear() &&
            day1.getMonth() === day2.getMonth() &&
            day1.getDate() === day2.getDate()
        );
        },
        dayFormate(day) {
        var d = new Date(day);
        var day_list = ['日', '一', '二', '三', '四', '五', '六'];
        return (
            d.getFullYear() +
            '/' +
            ('0' + (d.getMonth() + 1)).slice(-2) +
            '/' +
            ('0' + d.getDate()).slice(-2) +
            ' 星期' +
            day_list[d.getDay()]
        );
        },
        selectEmoji(emoji) {
        console.log(emoji);
        let input = document.getElementById('input');
        let startPos = input.selectionStart;
        let endPos = input.selectionEnd;
        let resultText =
            input.value.substring(0, startPos) +
            emoji.data +
            input.value.substring(endPos);
        input.value = resultText;
        input.focus();
        input.selectionStart = startPos + emoji.data.length;
        input.selectionEnd = startPos + emoji.data.length;
        this.msg.content = resultText;
        },
        getImg() {
            let item = this.storeReceiver;
            if (!item.pictures) {
                return '';
            }
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
        getGif() {
            let search_url = '';
            if (this.searchKey) {
                search_url = 'https://api.tenor.com/v1/search?q=' + this.searchKey + '&key=Y760PDCLGW8P' + '&limit=' + 10;
            } else {
                // default trending gifs
                search_url = 'https://api.tenor.com/v1/trending?key=Y760PDCLGW8P' + '&limit=' + 10;
            }
            console.log(search_url);
            axios.get(`${search_url}`).then((response) => {
                console.log(response.data);
                this.gifs = response.data.results.map(result => result.media[0].tinygif.url);
            });
        },
        zoomImg(img) {
            this.imgDialog = true;
            this.selectedImg = img;
        },
        sentReport(param){
            Object.assign(param,{deleteId: this.storeReceiver._id})
            console.log(param);
            //call api
            this.$store.dispatch('actionUnfriend', param).then(() => {
            });
            this.$refs.optionDialog.sentOK();
        },
        openInfoDialog(){
            let vm = this;
            this.loadingFriendInfo = true;
            this.infoDialog = true;
            this.$store.dispatch('actionFriendinfo', this.storeReceiver._id).then((response) => {
                vm.friendDetailData = response;
                vm.loadingFriendInfo = false;
            });
        },
        getUnreadStatus(messageTimeStamp) {
            if (messageTimeStamp) {
                const lastIdx = this.storeReceiver.message.length - 1;
                if (
                lastIdx >= 0 &&
                this.storeReceiver.message[lastIdx].createdAt !== messageTimeStamp && //not last message
                this.storeReceiver.lastSeenMessageTimeStamp === messageTimeStamp && // match lastSeenMessageTimeStamp in vuex and DB
                this.prevLastSeenMessageTimeStamp > messageTimeStamp // the timeStamp should be smaller than the last one when first enter chatRoom
                ) {
                return true;
                }
            }
            return false;
        },
        saveLastSeenMessageTimestamp() {
            console.log('onbeforeUnload')
            if (this.storeReceiver.message) {
                const lastIdx = this.storeReceiver.message.length - 1;
                if (lastIdx >= 0 && !this.isCharmboRoom) {
                    this.$store.dispatch('actionSaveLastSeenMessageTimeStamp', {
                    lastSeenMessageTimeStamp: this.storeReceiver.message[lastIdx].createdAt,
                    id: this.storeReceiver._id,
                    });
                }
            }
        },
        getMessageType(index){
            let preMessageFrom = index === 0 ? '' : this.storeReceiver.message[index-1].receiver;
            let thisMessageFrom = this.storeReceiver.message[index].receiver;
            let nextMessageFrom = index === this.storeReceiver.message.length -1 ? '' : this.storeReceiver.message[index+1].receiver
            let isReceive = this.isReceiver(this.storeReceiver.message[index].receiver)
            if(isReceive){
                if(nextMessageFrom !== thisMessageFrom || this.datesAreNotSameDay(this.storeReceiver.message[index].createdAt,this.storeReceiver.message[index+1].createdAt))
                    return 'message-bottem';
                if(preMessageFrom !== thisMessageFrom)
                    return 'message-top';
                return 'message-body';
            }
            if(preMessageFrom != thisMessageFrom || this.datesAreNotSameDay(this.storeReceiver.message[index].createdAt,this.storeReceiver.message[index-1].createdAt))
                return 'message-top';
            if(nextMessageFrom !== thisMessageFrom)
                return 'message-bottem';
            return 'message-body';
        },
        charmboMessageClick(item){
            if(item.image.file !== null)
                this.zoomImg(item.image);
        },
        imgClickHandle(){
            console.log(this.$refs.finput)
            this.$refs.finput.click();
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            !vm.$route.query.id && vm.$router.push({ name: 'chatList' });
            if (from.path !== '/chatlist') {
                vm.$store.dispatch('actionFriendList');
            }
        })
    },
    beforeRouteLeave (to, from, next) {
        if (this.storeReceiver.message) {
            const lastIdx = this.storeReceiver.message.length - 1;
            if (
                lastIdx >= 0 &&
                !this.isCharmboRoom &&
                this.storeReceiver.lastSeenMessageTimeStamp !== this.storeReceiver.message[lastIdx].createdAt
            ) {
                this.$store.dispatch('actionSaveLastSeenMessageTimeStamp', {
                    lastSeenMessageTimeStamp: this.storeReceiver.message[lastIdx].createdAt,
                    id: this.storeReceiver._id,
                })
            }
        }
        next();
    },
};
</script>
<style scoped>
.v-dialog__content {
    align-items: center;
    justify-content: flex-start;
}
.v-overlay__scrim {
    width: 400px;
}
.typingIndicatorContainer {
    display: flex;
    flex: none;
    align-items: flex-end;
    margin: $spacing4 0;
}
.typingIndicatorBubble {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 40px;
    margin: 0px 8px;
    background-color: #d5d5d5;
    border-radius: 4px 24px 24px 24px;
}

.typingIndicatorBubbleDot {
    width: 4px;
    height: 4px;
    margin-right: 4px;
    background-color: #57585a;
    border-radius: 50%;
    animation-name: bounce;
    animation-duration: 1.3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}
.typingIndicatorBubbleDot:first-of-type {
    margin: 0px 4px;
}
.typingIndicatorBubbleDot:nth-of-type(2) {
    animation-delay: 0.15s;
}
.typingIndicatorBubbleDot:nth-of-type(3) {
    animation-delay: 0.3s;
}
.date {
    color: #747070;
    font-size: 11px;
    line-height: 13px;
    padding: 8px 12px;
    border: 1px solid #D6D5D1;
    box-sizing: border-box;
    border-radius: 25px;
}
.btn-on {
    display: inline-block;
    width: 144px;
    height: 26px;
    line-height: 26px;
    background: #7b7b7b;
    border-radius: 32px;
    color: #ffffff;
    margin: 10px;
    cursor: pointer;
}
.btn-off {
    display: inline-block;
    width: 144px;
    height: 26px;
    line-height: 26px;
    background: #c4c4c4;
    border-radius: 32px;
    color: #ffffff;
    margin: 10px;
    cursor: pointer;
}
.gifImg:hover {
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    opacity: .5;
}
.page-chatroom{
    display: grid;
    height: 100vh;
    grid-template-rows: auto 1fr auto;
    gap: 16px;
}
.tool-bar{
    /* display: grid;
    grid-template-rows: 72px auto;
    grid-template-columns: auto auto 1fr auto; */
}
.tool-emoji{
    vertical-align: middle;
    line-height: 32px;
}
.tool-sent{
    vertical-align: middle;
    line-height: 32px;
}
.chatroom-leave-message{
    font-size: 12px;
    color: #7E7E7E;
}
.message-container{
    position: relative;
}
.unreadBar {
    text-align: center;
    font-size: 0.8rem; 
    color: black; 
    background-color: rgba(128, 128, 128, 0.1);
}
.unreadBar .unreadBar-icon {
    margin: auto 5px;
    float: left;
    display: flex;
    align-items: center;
    color: grey;
}
.scroll-btn{
    position:absolute;
    z-index: 1;
    top: calc(100vh - 150px);
    left: calc(100%/2 - 18px);
}
.textbox{
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #D6D5D1;
    height: 46px;
    border-radius: 20px;
    padding: 12px;
}
.textbox::placeholder{
    color: #D6D5D1;
    font-weight: 900;
}
input:focus{
    outline: 0px;
}
.search-bar{
    background: #FFFFFF;
    border-radius: 16px;
    border: 1px solid #D6D5D1;
    padding:0px 12px;
}
.gif-input{
    line-height: 16px;
    font-size: 12px;
    vertical-align: middle;
}
.gif-card{
    display: grid;
    height: 100%;
    grid-template-rows: auto auto 1fr;
}
@keyframes bounce {
    0%,
    60%,
    100% {
        transform: translateY(0);
    }
    30% {
        transform: translateY(-4px);
    }
}
</style>
