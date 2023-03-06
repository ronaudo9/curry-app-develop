<template>
<v-container>
    <h1 v-if="show" id="cart">ショッピングカート</h1>
    <h1 v-else>注文内容確認</h1>
    <div v-if="cartLength">
        <v-row>
            <v-col>
                <v-data-table
                :headers="headers"
                :items="cartItems"
                :items-per-page="5"
                item-key="cartId"
                class="elevation-1"
                disable-sort
                >
                    <template v-slot:[`item.price`]="{ item }">
                        <td>{{item.price.toLocaleString('ja-JP')}}円</td>
                    </template>
                    <template v-slot:[`item.number`]="{ item }">
                        <td>{{item.itemNum}}個</td>
                    </template>
                    <template v-slot:[`item.img`]="{ item }">
                        <img :src="item.img" width="100px" height="100px">
                    </template>
                    <template v-slot:[`item.sum`]="{ item }">
                        <td>{{(item.price*item.itemNum).toLocaleString('ja-JP')}}円</td>
                    </template>
                    <template v-slot:[`item.delete`]="{ item }">
                        <v-btn v-if="show" @click="deleteConfirm(item.cartId)" color="error" rounded><strong>削除</strong></v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-row class="ma-2">
            <v-col align="center">
                <h2>消費税：{{(priceSum*tax).toLocaleString('ja-JP')}}円</h2>
                <h2>ご注文金額合計：{{(Math.floor(priceSum+(priceSum*tax)).toLocaleString('ja-JP'))}}円(税込)</h2>
                <v-btn v-if="show" color="orange" dark @click="loginCheck()" rounded href="#orderForm">注文に進む</v-btn>
                <v-btn v-if="!show" @click="show=!show" rounded>カートに戻る</v-btn>
            </v-col>
        </v-row>
        <div id="orderForm">
        <Order v-show="!show"/>
        </div>
    </div>
    <div v-else>
        <h3>商品はありません</h3>
    </div>
</v-container>
</template>
<script>
import Order from '@/components/Order.vue'
import {mapActions} from 'vuex'
export default {
    components:{
        Order
    },
    data(){
        return {
            headers:[
                {text:'',value:'img',sortable:false},
                {text:'商品名',value:'name'},
                {text:'価格(税抜)',value:'price'},
                {text:'数量',value:'number'},
                {text:'小計',value:'sum'},
                {value:'delete',sortable:false},
            ],
            tax:0.1,
            show:true
        }
    },
    computed:{
        cartItems(){
            if(this.$store.state.cartItems){
                let itemData = this.$store.state.itemData;
                let cartItems = this.$store.state.cartItems;
                let itemInfo = cartItems.itemInfo;
                let array = [];
                itemInfo.forEach((itemIn)=>{
                    itemData.forEach((itemD)=>{
                        if(itemIn.itemId==itemD.id){
                            itemD.itemNum = itemIn.itemNum
                            itemD.cartId = itemIn.id
                            let a = JSON.stringify(itemD)
                            a = JSON.parse(a)
                            array.push(a)
                        }
                    })
                })
                return array
            }else {
                return null
            }
        },
        cartLength(){
            if(this.$store.state.cartItems){
                let cartItems = this.$store.state.cartItems
                if(cartItems.itemInfo.length===0){
                    return false
                }else{
                    return true
                }
            }else{
                return false
            }
        },
        priceSum(){
            let sum=0;
            this.cartItems.forEach((item)=>{
                sum += item.price*item.itemNum;
            })
            return sum
        }
    },
    methods:{
        loginCheck(){
            if(this.$store.getters.uid){
                this.show = !this.show
            }else{
                this.$router.push('/login')
            }
        },
        ...mapActions(['deleteItemFromCart']),
        deleteConfirm(cartId){
            if(confirm('削除してもよろしいですか？'))
            this.deleteItemFromCart({cartId:cartId})
        },
    }
}
</script>