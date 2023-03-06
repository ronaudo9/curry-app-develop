<template>
<v-app-bar app color="#FFAB40">
    <v-app-bar-nav-icon @click="sideNav" dark>
        <v-icon>mdi-menu</v-icon>
    </v-app-bar-nav-icon>
        <v-toolbar-title>
            <router-link to='/'>
                <img alt="main logo" src="../../public/img/header_logo.png" height="50">
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn id="btn" retain-focus-on-click text to='/cart' class="mx-5 link">ショッピングカート</v-btn>
        <v-btn id="btn" retain-focus-on-click text to='/orderhistory' class="mx-5 link" v-if="$store.state.login_user">注文履歴</v-btn>
        <v-btn id="btn" retain-focus-on-click text @click="logout" class="mx-5 link" v-if="$store.state.login_user" outlined>ログアウト</v-btn>
        <v-btn id="btn" retain-focus-on-click text to='/login' class="mx-5 link" v-else>ログイン</v-btn>
</v-app-bar>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name:'Header',
    methods:{
        ...mapActions(['sideNav','logout']),
    }
}
</script>

<style scoped>
.link {
    text-decoration: none; 
    color: black;
}
#btn{
    color:white;
}
</style>