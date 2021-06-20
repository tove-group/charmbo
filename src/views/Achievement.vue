<template>
    <div class="page-achievement max-width">
        <div>
            謎樣的成就系統切版還沒出<br>
            <img src="https://media.tenor.com/images/2cd1859d8e5b6cfae05e9e33c1be2b80/tenor.gif">
        </div>
        <footer-bar activeTab="achievement"></footer-bar>
    </div>
</template>
<script>
    import FooterBar from '../components/Footer.vue';
    export default {
        components: {
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