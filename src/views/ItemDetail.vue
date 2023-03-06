<template>
<v-container>
<h1>商品詳細</h1>
<v-layout row rap justify-center>
    <v-row justify="center" class="ma-1">
        <v-col justify="center" align="center">
            <v-card flat>
                <img :src="item.img" alt="画像" width="400" height="280" justify-center>
            </v-card>
        </v-col>
        <v-col align="left" valign="middle">
            <h2 class="ma-2">{{item.name}}</h2><br/>
            <p>{{item.text}}</p>
        </v-col>
    </v-row>
    <v-row class="ma-1">
        <v-spacer></v-spacer> 
        <v-col cols="6">
            <h4 style="font-weight : bold">サイズ</h4>  
            <label class="radio-inline">
                <input type="radio" name="responsibleCompany" checked="checked">
                <span> 普通 {{item.price.toLocaleString('ja-JP')}}円（税抜）</span><br>
            </label><br>
            <div>
                <span style="font-weight : bold">数量：</span>
                <span style="color:red; font-weight: bold" v-show="!number">数量を選択してください</span>
                <v-text-field
                width="10"
                v-model="number"
                type="number"
                style="width:100px;"
                max="100"
                min="1"
                >
                </v-text-field>
            </div>
            <div align="right">
                <h2>ご注文金額合計：{{(item.price*number).toLocaleString('ja-JP')}}円(税抜)</h2>
                <v-btn @click="addCart()" color="orange" dark><strong>カートに入れる</strong></v-btn>
            </div>
        </v-col>
    </v-row>
</v-layout>
</v-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            item:'',
            items:this.$store.state.itemData,
            id:'',
            number:1
        }
    },
    created(){
        let paramId = this.$route.params.item_id;
        this.items.forEach(item => {
            if(item.id===paramId){
                this.item = item
            }
        })
    },
    methods:{
        ...mapActions(['addItemToCart']),
        addCart(){
            if(confirm(`${this.item.name}を${this.number}個追加しますがよろしいですか？`)){
                this.addItemToCart({itemId:this.item.id,number:this.number}).then(()=>{
                    this.$router.push('/cart')
                })
            }
        }
    }
}
</script>

<style>
.number{
  width: 400px;
}
</style>