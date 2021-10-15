<template>
    <div>
        <v-dialog
            v-model="open"
            max-width="350"
        >
            <v-card class="rounded-lg">
                <div v-if="title" class="text-color-2 reason-title">{{title}}</div>
                <div v-for="(option, index) in options" :key="option.key">
                    <div
                        v-if="type == 'center'"
                        class="option-btn"
                        :class="{'color-danger': option.danger}"
                        @click="optionClick(option)"
                    >
                        {{option.text}}
                    </div>
                    <div
                        v-else
                        class="d-flex justify-space-between"
                        :class="{'color-danger': option.danger}"
                        @click="optionClick(option)"
                    >
                        <div class="px-4 py-3 charmbo-text-color2">{{option.text}}</div>
                        <v-icon class="mx-4">
                            mdi-chevron-right
                        </v-icon>
                    </div>
                    <v-divider v-if="index != options.length -1"></v-divider>
                </div>
            </v-card>
            <v-card class="rounded-lg">
                <div class="option-btn mt-1"
                    @click="cancel"
                >取消</div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    export default {
        components: {
        },
        props: {
            title: {
                type: String
            },
            options: {
                type: Array
            },
            dialogOpen: {
                type: Boolean
            },
            type: {
                type: String
            }
        },
        data(){
            return {
                open:false,
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
                // this.optionDialog = false;
                // this.confirmDialog = false;
                // this.otherOption = false;
                // this.optionType = 0;
                // this.otherReason = "";
                this.$emit('optionCancel')
                this.open = false
            },
            optionClick(option){
                this.$emit('optionClick', option)
                this.open = false
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
        },
        watch:{
            open: function(value){
                this.$emit('update:dialogOpen',value)
            },
            dialogOpen: function(value){
                this.open = value
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
.text-color-2{
    color: #656565;
}

.other-input{
    margin-left:16px !important;
}
</style>