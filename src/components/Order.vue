<template>
  <v-app>
    <v-container text-xs-center>
      <v-layout row wrap justify-center>
        <v-flex xs6 mt-6>
          <v-form ref="form" v-model="valid" lazy-validation>
            <p class="font-weight-bold"><big>お届け先情報</big></p>
            <div>
              お名前<v-text-field v-model="orderInfo.name" :rules="nameRules"></v-text-field>
            </div>
            <div>
              メールアドレス<v-text-field v-model="orderInfo.email" :rules="emailRules"></v-text-field>
            </div>
            <div>
              郵便番号
              <v-text-field v-model="orderInfo.zip" :rules="zipRules">
                <template v-slot:append-outer>
                  <v-btn icon @click="addressAutoComplete()"><v-icon>mdi-magnify</v-icon></v-btn>
                </template>
              </v-text-field>
            </div>
            <div>
              住所<v-text-field v-model="orderInfo.address" :rules="addressRules">{{addressComp}}</v-text-field>
            </div>
            <div>
              電話番号<v-text-field v-model="orderInfo.phone" :rules="phoneRules"></v-text-field>
            </div>
            配達日時
            <div>
              <small>日付</small>
              <v-menu
              ref="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="orderInfo.date"
                    readonly
                    v-on="on"
                    :rules="dateRules"
                  >
                  </v-text-field>
                </template>
                <v-date-picker v-model="orderInfo.date" :allowed-dates="allowedDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="orange" @click="$refs.menu.save()">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <small>時間</small>
              <v-select v-model="orderInfo.time" :items="times" :rules="timeRules"></v-select>
            </div>
            <div>お支払い方法</div>
            <v-radio-group
              row
              v-model="orderInfo.status"
              :rules="payRules"
            >
              <v-radio label="代金引換" :value="1" color="warning"></v-radio>
              <v-radio label="クレジットカード" :value="2" color="warning"></v-radio>
            </v-radio-group>
            <v-row justify="center">
              <v-col cols="4" align="center">
                <v-btn rounded @click="orderInfo={address:'',status:1}">リセット</v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn @click="submit" rounded class="orange" dark>注文する</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import axios from 'axios'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      orderInfo: {
        address:'',
        status:1
      },
      valid: true,
      nameRules: [(v) => !!v || "名前を入力してください"],
      emailRules: [
        (v) => !!v || "メールアドレスを入力してください",
        (v) =>
          /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(
            v
          ) || "メールアドレスの形式が不正です",
      ],
      zipRules: [
        (v) => !!v || "郵便番号を入力してください",
        (v) =>
          /^\d{3}-\d{4}$/.test(v) ||
          "郵便番号はXXX-XXXXの形式で入力してください",
      ],
      addressRules: [v => !!v || "住所を入力してください"],
      phoneRules: [
        (v) => !!v || "電話番号を入力してください",
        (v) => 
          /^\d{2,5}-\d{1,4}-\d{4}$/.test(v) ||
          "電話番号はXXXX-XXXX-XXXXの形式で入力してください",
      ],
      dateRules:[v => !!v || '配達日を入力してください',],
      timeRules: [
        (v) => !!v || "配達日時を選択してください",
        v => this.timeCheck(v) || "この時間には配達できません"
      ],
      payRules: [(v) => !!v || "お支払い方法を選択してください"],
      pay: {},
      times: [
        {text:'10時',value:10},
        {text:'11時',value:11},
        {text:'12時',value:12},
        {text:'13時',value:13},
        {text:'14時',value:14},
        {text:'15時',value:15},
        {text:'16時',value:16},
        {text:'17時',value:17},
        {text:'18時',value:18},
      ],
    };
  },
  computed:{
    addressComp(){
      return this.orderInfo.address
    },
    paymentMethod(){
      if(this.orderInfo.status===1){
        return '代金引換'
      }else{
        return 'クレジットカード'
      }
    }
  },
  methods: {
    ...mapActions(['orderConfirm']),
    submit() {
      const inquiry = `この内容で注文します
      【お名前】${this.orderInfo.name} 様
      【メールアドレス】${this.orderInfo.email}
      【郵便番号】${this.orderInfo.zip}
      【住所】${this.orderInfo.address}
      【電話番号】${this.orderInfo.phone}
      【配達日】${this.orderInfo.date}
      【配達時刻】${this.orderInfo.time} 時
      【お支払い方法】${this.paymentMethod}
      `;
      if(confirm(inquiry)){
        if(this.$refs.form.validate()){
          this.success = true;
          if(this.$store.getters.uid){
            const date = new Date()
            this.orderInfo.orderDate = date.getTime()
            let obj = JSON.stringify(this.$store.state.cartItems)
            obj = JSON.parse(obj)
            obj.name = this.orderInfo.name
            obj.email = this.orderInfo.email
            obj.zip = this.orderInfo.zip
            obj.address = this.orderInfo.address
            obj.phone = this.orderInfo.phone
            obj.date = this.orderInfo.date
            obj.time = this.orderInfo.time
            obj.status = this.orderInfo.status
            obj.orderDate = this.orderInfo.orderDate
            this.orderConfirm({order:obj}).then(()=>{
              this.$router.push('/ordercomp')
            })
          }else{
            this.$router.push('/login')
          }
        }else{
          this.success = false;
        }
      }
    },
    allowedDate: function (val) {
      // 今日を選べるようにする
      //日付の初期化
      let today = new Date() 
      today = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )
      //いつまで選択できるかの設定
      let maxAllowedDay = new Date()
      maxAllowedDay.setDate(
        today.getDate() +1000
      )
      maxAllowedDay = new Date(
        maxAllowedDay.getFullYear(),
        maxAllowedDay.getMonth(),
        maxAllowedDay.getDate()
      )
      return today <= new Date(val) && new Date(val) <= maxAllowedDay
     },
     timeCheck(selectedTime){
       let date = new Date()
       let year = date.getFullYear()
       let month = date.getMonth()+1
       let day = date.getDate()
       let nowHour = date.getHours()
       let today = `${year}-0${month}-${day}`
       let selectedDay = this.orderInfo.date
       let nowMinute = date.getMinutes()
       if(30<nowMinute){
         nowHour++
       }
       let a = Math.abs(selectedTime-nowHour)
       //入力値が今日の
       if(selectedDay === today){
         //現在時刻前だった場合
         if(selectedTime <= nowHour){
           return false
          //
         }else if( 3 <= a ){
           console.log(a)
           return true
         }
       }else{
         return true
       }
     },
    addressAutoComplete(){
      if(this.orderInfo.zip){
        axios.get(`https://api.zipaddress.net/?zipcode=${this.orderInfo.zip}`)
        .then(res=>{
          this.orderInfo.address = res.data.data.fullAddress
        }).catch(()=>{
          this.orderInfo.zip = ''
        })
      }else{
        this.orderInfo.zip = ''
      }
    },
  }
};
</script>
