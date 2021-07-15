<template>
    <a :href="googleURL" class="login-btn d-flex align-center px-5 py-2">
        <div class="mx-2">
            <v-img
                :src="require('../assets/img/google.svg')"
                height="18"
                width="18"
            />
        </div>
        <div class="login-span mx-2">
            <slot>使用 google 帳號註冊</slot>
        </div>
    </a>
</template>
<script>
export default {
    computed: {
        googleURL() {
        return window.API_HOST + '/auth/google';
        },
    },
};
</script>
<style>
.login-btn {
    background: #ffffff;
    border-radius: 16px;
    text-decoration:none;
}
.login-span {
    font-family: Noto Sans;
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    color: #000000;
}
</style>
