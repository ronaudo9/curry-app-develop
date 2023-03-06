<template>
<v-container>
  <v-row>
    <v-col cols=12 lg=12 md=12 sm=12 align="center">
      <h1>決済が完了しました！</h1>
      <p>この度はご注文ありがとうございます。</p>
      <p>お支払い先は、お送りしたメールに記載してありますのでご確認ください。</p>
      <p>メールが届かない場合は「注文履歴」からご確認ください。</p>
      <v-btn dark rounded class="orange" :to="{name:'Home'}">トップ画面を表示する</v-btn>
    </v-col>
  </v-row>
</v-container>
</template>