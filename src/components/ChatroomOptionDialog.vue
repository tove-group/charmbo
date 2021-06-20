<template>
    <div>
        <v-dialog
            v-model="optionDialog"
            max-width="350"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
                <v-icon color="black"
                >mdi-dots-vertical
                </v-icon>
            </v-btn>
            </template>
            <!-- <template v-slot:default="dialog"> -->
            <v-card v-if="showOptionList" class="rounded-lg">
                <div class="option-btn color-disable"
                >更多</div>
                <v-divider></v-divider>
                <div class="option-btn color-danger"
                    @click="optionType = 1"
                >解除好友</div>
                <v-divider></v-divider>
                <div class="option-btn color-danger"
                    @click="optionType = 2"
                >檢舉</div>
            </v-card>
            <v-card v-if="showUnfriendList" class="rounded-lg">
                <div class="text-color-2 reason-title">可以告訴我們解除好友的原因嗎？
                    <div class="color-disable reason-subtitle">Charmbo不會將這些內容傳給對方</div>
                </div>
                <div v-for="(item, index) in chatRoomOptionReason" :key="index">
                    <div v-if="item.value != -1" @click.stop="setReason(item.value)" class="reason-btn text-color-1">{{item.text}}</div>
                    <div v-else @click.stop="setReason(item.value)" class="d-flex justify-space-between">
                        <div class="reason-btn text-color-1">{{item.text}}</div>
                        <v-icon @click="setOtherReason" class="mx-4">
                        mdi-chevron-right
                        </v-icon>
                    </div>
                    <v-divider></v-divider>
                </div>
            </v-card>
            <v-card v-if="showReportList" class="rounded-lg">
                <div class="text-color-2 reason-title">可以告訴我們檢舉的原因嗎？</div>
                <div v-for="(item, index) in chatRoomOptionReason2" :key="index">
                    <div v-if="item.value != -1" @click.stop="setReason(item.value)" class="reason-btn text-color-1">{{item.text}}</div>
                    <div v-else @click.stop="setReason(item.value)" class="d-flex justify-space-between">
                        <div class="reason-btn text-color-1">{{item.text}}</div>
                        <v-icon @click="setOtherReason" class="mx-4">
                        mdi-chevron-right
                        </v-icon>
                    </div>
                    <v-divider></v-divider>
                </div>
            </v-card>
            <v-card v-if="otherOption" class="rounded-lg">
                <div class="text-color-2 reason-title">可以告訴我們其他的原因嗎？</div>
                    <div class="d-flex justify-space-between pb-3">
                    <v-textarea
                    class="other-input"
                    solo
                    rows="2"
                    placeholder="可在此輸入"
                    hide-details=true
                    v-model="otherReason"
                    ></v-textarea>
                    <v-icon @click="setOtherReason" class="mx-4">
                    mdi-chevron-right
                    </v-icon>
                    </div>
                    <v-divider></v-divider>
                    <div @click.stop="setOtherReason(),otherReason = ''" class="reason-btn text-color-1">略過</div>
            </v-card>
            <v-card class="rounded-lg">
                <div class="option-btn mt-1"
                    @click="cancel"
                >取消</div>
            </v-card>
            <!-- </template> -->
        </v-dialog>
        <v-dialog
            v-model="confirmDialog"
            max-width="350"
        >
            <v-card class="rounded-lg">
                <div class="option-title"
                >{{confirmTitle}}</div>
                <div class="option-btn"
                >{{confirmMessage}}</div>
                <v-divider></v-divider>
                <div class="d-flex justify-center">
                <div class="option-btn mt-1"
                    @click="cancel"
                >取消</div>
                <v-divider vertical></v-divider>
                <div class="option-btn mt-1"
                    @click="sent"
                >確定</div>
                </div>
            </v-card>
            
            <v-card class="rounded-lg">

            </v-card>
        </v-dialog>
        <v-dialog
            v-model="alertDialog"
            max-width="350"
        >
            <v-card class="rounded-lg">
                <div class="option-title"
                >{{alertTitle}}</div>
                <div class="option-btn"
                >{{countdown}}秒後將自動跳回聊天室列表</div>
                <v-divider></v-divider>
                <div class="d-flex justify-center">
                <div class="option-btn mt-1"
                    @click="alertOK"
                >確定</div>
                </div>
            </v-card>
            
            <v-card class="rounded-lg">

            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    export default {
        components: {
        },
        data(){
            return {
                optionType:0,
                reason:0,
                chatRoomOptionReason:[
                    {value:1,text:"我對此人不感興趣"},
                    {value:2,text:"非本人照片及資料"},
                    {value:3,text:"此用戶不和我互動"},
                    {value:-1,text:"其他"}
                ],
                chatRoomOptionReason2:[
                    {value:1,text:"該用戶從事商業行為(銷售、廣告等...)"},
                    {value:2,text:"此人盜取我或他人的照片及資料"},
                    {value:3,text:"詐騙"},
                    {value:4,text:"未經許可傳送妨害風化照片"},
                    {value:5,text:"未成年使用者"},
                    {value:6,text:"散布軟體病毒或類似惡意的電腦程式語言、檔案或程式"},
                    {value:7,text:"有令人不舒服的訊息、照片、自我介紹等"},
                    {value:8,text:"散布任何受著作權、商標保護的內容或其他相關資訊"},
                    {value:9,text:"傳送勒索、暴力、威脅、犯罪及其他危險訊息"},
                    {value:-1,text:"其他"}
                ],
                otherOption:false,
                optionDialog:false,
                confirmDialog:false,
                alertDialog:false,
                otherReason:"",
                countdown: 3,
                images:[]
            }
        },
        computed:{
            showOptionList(){
                return this.optionType == 0;
            },
            showUnfriendList(){
                return this.optionType == 1 && !this.otherOption;
            },
            showReportList(){
                return this.optionType == 2 && !this.otherOption;
            },
            confirmTitle(){
                if(this.optionType==1)
                    return '確定要解除好友嗎？';
                return '確定要檢舉對方嗎？';
            },
            confirmMessage(){
                if(this.optionType==1)
                    return '解除好友後聊天室就會消失囉';
                return '檢舉對方後聊天室就會馬上消失喔';
            },
            alertTitle(){
                if(this.optionType==1)
                    return '解除好友成功！';
                return '已將檢舉回報給Charmbo';
            },
        },
        methods:{
            cancel(){
                this.optionDialog = false;
                this.confirmDialog = false;
                this.otherOption = false;
                this.optionType = 0;
                this.otherReason = "";
            },
            setReason(reason){
                this.reason = reason;
                if(reason === -1){
                    this.otherOption = true;
                    return ;
                }
                this.optionDialog = false;
                this.confirmDialog = true;
            },
            setOtherReason(){
                this.otherOption = false;
                this.optionDialog = false;
                this.confirmDialog = true;
            },
            sent(){
                let param={
                    optionType: this.optionType,
                    reason: this.reason,
                    otherReason: this.otherReason,
                    images:this.images
                }
                this.$emit('sentReport',param);
            },
            sentOK(){
                this.confirmDialog = false;
                this.alertDialog = true;
                let self = this;
                let interval = window.setInterval(() => {
                    if (--self.countdown <= 0) {
                        window.clearInterval(interval);
                        if(this.alertDialog)
                            this.$router.push({ name: 'chatList' })
                    }            
                }, 1000);
            },
            alertOK(){
                this.alertDialog = false;
                this.$router.push({ name: 'chatList' })
            }
        }
    }
</script>
<style>
.option-title{
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    padding:16px;
}
.option-btn{
    text-align: center;
    padding:12px;
    width:100%;
}
.reason-title{
    font-weight: 600;
    font-size: 18px;
    padding:16px;
}
.reason-subtitle{
    font-weight: 500;
    font-size: 14px;
}
.reason-btn{
    padding:12px 16px;
}
.color-disable{
    color: #BFBFBF;
}
.color-danger{
    color: #D3433A;
}
.text-color-1{
    color: #313131;
}
.text-color-2{
    color: #656565;
}

.other-input{
    margin-left:16px !important;
}
</style>