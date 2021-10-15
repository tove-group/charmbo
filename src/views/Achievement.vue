<template>
    <div class="page-achievement max-width charmbo-bgcolor-gray">
        <div class="px-5 pt-8 text-align-center">
            <div class="d-flex border-radius-24 charmbo-bgcolor-white pa-1 fw-semi-bold">
                <div class="flex-grow-1 text-align-center w-50 charmbo-bgcolor-chat border-radius-24 py-2">Match</div>
                <div class="flex-grow-1 text-align-center w-50 py-2">Star</div>
            </div>
            <div class="d-flex justify-center mt-16">
                <div>
                    <v-img
                        :src="require('@/assets/img/programming.png')"
                        height="293"
                        width="289"
                    />
                </div>
            </div>
            <div class="text-align-center fw-black fs-18 my-2">有趣的新功能還在開發中</div>
            <div class="text-align-center fw-black fs-18 my-2">敬請期待！</div>
            <charmbo-button class="mt-10" @click="$router.push({name: 'pair'})">
                <span class="mx-2">繼續尋找配對對象</span>
            </charmbo-button>
        </div>
        <footer-bar activeTab="achievement"></footer-bar>
    </div>
</template>
<script>
    import CharmboButton from '@/components/CharmboButton.vue';
    import FooterBar from '@/components/Footer.vue';
    export default {
        components: {
            CharmboButton,
            FooterBar,
        },
    }
</script>
<style>
.page-achievement{
    display: grid;
    height: 100vh;
    grid-template-rows: 1fr auto;
}
</style>