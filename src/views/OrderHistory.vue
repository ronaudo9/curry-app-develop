<template>
<v-container  class="my-50" justify-center>
    <h1>注文履歴</h1>
    <h3 v-if="changeFlag" style="font-weight:bold;">注文履歴はありません</h3>
    <div v-else>
    <v-data-table
        :headers="headers"
        :items="orderedItemsInfo"
        :items-per-page="5"
        item-key="orderedId"
        class="elevation-1"
        disable-sort
        >
            <template v-slot:[`item.price`]="{ item }">
                <td>{{item.price}}円</td>
            </template>
            <template v-slot:[`item.number`]="{ item }">
                <td>{{item.itemNum}}個</td>
            </template>
            <template v-slot:[`item.img`]="{ item }">
                <img :src="item.img" width="100px" height="100px">
            </template>
            <template v-slot:[`item.sum`]="{ item }">
                <td>{{item.sum}}円</td>
            </template>
        </v-data-table>
        </div>
  </v-container>
<!-- </v-container> -->
</template>
<script>
export default {
    data(){
        return{
            headers:[
                {text:'',value:'img',sortable:false},
                {text:'商品名',value:'name'},
                {text:'価格(税抜)',value:'price'},
                {text:'数量',value:'num'},
                {text:'小計',value:'sum'},
                {value:'delete',sortable:false},
            ],
        }
    },
    computed:{
        changeFlag(){
            if(this.$store.state.orderedItems.length === 0){
                return true
            }else {
                return false
            }
        },
        orderedItemsInfo(){
            if(this.$store.state.orderedItems){
                let itemData = this.$store.state.itemData;
                let ordereditems = this.$store.state.orderedItems;
                let array = []
                ordereditems.forEach((order)=>{
                    order.itemInfo.forEach((info)=>{
                        itemData.forEach((item)=>{
                            if(info.itemId==item.id){
                                item.num = info.itemNum
                                item.orderId = info.id
                                item.sum = item.num * item.price
                                let a = JSON.stringify(item)
                                a = JSON.parse(a)
                                array.push(a)
                            }
                        })
                    })
                })
                return array;
            }else{
                return [];
            }
        },
    }
}
</script>
