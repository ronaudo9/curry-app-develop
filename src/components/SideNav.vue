<template>
    <v-navigation-drawer v-model="$store.state.sideNav" app clipped temporary>
        <v-list>
            <v-list-item>
                <div><h4>メニュー</h4></div>
            </v-list-item>
            <v-divider></v-divider>
            <div v-if="$store.getters.uid">
            
                <v-list-item v-for="item,index in linkList" :key="index" :to="item.link">
                    <v-list-item-icon>
                        <v-icon>{{item.icon}}</v-icon>
                        </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{item.name}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>                
            
            </div>

            <div v-else>
            
            <v-list-item v-for="item,index in linkList" :key="index" :to="item.link">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{item.name}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            
            </div>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    data(){
        return{
            items:[
                {name:'ホーム',icon:'mdi-home',link:'/'},
                {name:'カート',icon:'mdi-cart',link:'/cart'},
            ],
        }
    },
    computed:{
        linkList(){
            if(this.$store.getters.uid){
                let array = [
                    {name:'ホーム',icon:'mdi-home',link:'/'},
                    {name:'カート',icon:'mdi-cart',link:'/cart'},
                    {name:'注文履歴',icon:'mdi-playlist-check',link:'/orderhistory'}, 
                ]
                return array
            }else{
                let array = [
                    {name:'ホーム',icon:'mdi-home',link:'/'},
                    {name:'カート',icon:'mdi-cart',link:'/cart'},
                ]
                return array
            }
        }
    }
}
</script>