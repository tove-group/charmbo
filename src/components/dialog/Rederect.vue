<template>
    <div>
        <v-dialog
            v-model="open"
            max-width="350"
        >
            <v-card class="rounded-lg pt-15">
                <div class="d-flex justify-center">
                    <div>
                        <v-img
                            :src="require('@/assets/img/report.png')"
                            height="190"
                            width="190"
                        />
                    </div>
                </div>
                <p class="text-center mt-7 fw-black fs-16 charmbo-text-color2">已將檢舉回報給Charmbo</p>
                <p class="text-center fs-12 charmbo-text-color3">{{countdown}}秒後將自動出現下一位對象</p>
                <div class="text-center py-10">
                    <charmbo-button @click="exit">
                        <div class="fs-16 fw-semi-bold">馬上跳轉</div>
                    </charmbo-button>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    import CharmboButton from '@/components/CharmboButton.vue';
    export default {
        components: {
            CharmboButton
        },
        props: {
            dialogOpen: {
                type: Boolean
            },
        },
        data(){
            return {
                open:false,
                countdown: 3,
            }
        },
        mounted(){
        },
        computed:{
        },
        methods:{
            exit(){
                this.countdown = 3
                this.$emit('exit')
                this.open = false
            },
            doCountdown(){
                let self = this
                let interval = window.setInterval(() => {
                    if (--self.countdown <= 0) {
                        window.clearInterval(interval);
                        if(self.open)
                            self.exit()
                    }            
                }, 1000);
            }
        },
        watch:{
            open: function(value){
                this.$emit('update:dialogOpen',value)
                if(value){
                    this.doCountdown()
                }
            },
            dialogOpen: function(value){
                this.open = value
            }
        }
    }
</script>
<style>

</style>