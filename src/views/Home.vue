<template>
<v-app>
  <SearchForm></SearchForm>
  <v-container v-if="$store.state.flag" class="my-50" justify-center>
    <v-row>
      <v-col cols="4" v-for="(item,index) in itemData" :key="index" align="center">
        <v-card id="item" elevation="5">
            <div>
              <router-link :to="{name:'ItemDetail',params:{item_id:item.id}}">
                  <v-img :src="item.img" id="img" class="gray lighten-2"></v-img>
              </router-link>
            </div>
            <div>
              <v-card-title>
                <router-link :to="{name:'ItemDetail',params:{item_id:item.id}}" id="itemName">{{item.name}}</router-link>
              </v-card-title>
            </div>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="9">
                <div>普通 : <span id="price">{{item.price.toLocaleString('ja-JP')}}</span>円(税抜)</div>
              </v-col>
            </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-app>
</template>

<script>
import {mapState} from 'vuex'
import SearchForm from '../components/Search.vue';

export default {
  name: "Home",
  components: {
    SearchForm //使用するためにコンポーネントに追加
  },
  created(){
    this.$store.state.flag = true
  },
  computed: mapState({
    itemData: state => state.itemData
  }),
}
</script>
<style>
#img{
 height:200px;
 width:300px;
 border-bottom: solid 0.5px gray;
 border-radius:10px 10px 0 0;
 background-color: white;
}
#item{
  height:325px;
  width:300px;
  border-radius: 10px;
  border: solid 0.5px gray;
  background-color: antiquewhite;
}
#price{
  font-size: 25px;
}
#itemName{
  color:black;
  text-decoration: none;
  font-size: 18px;
  font-weight:bold;
}
#itemName:hover{
  color:orange;
}
</style>
	