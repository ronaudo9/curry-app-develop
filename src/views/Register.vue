<template>
    <v-container>
        <h1>新規登録</h1>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card>
                    <v-card-title>登録情報を入力してください</v-card-title>
                    <v-divider></v-divider>
                    <p style="color:red;" v-if="$store.state.errorMsg">
                        <strong>{{$store.state.errorMsg}}</strong>
                    </p>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="email"
                                        prepend-inner-icon="mdi-email" 
                                        type="email" 
                                        label="メールアドレス"/>
                            <v-text-field v-model="password"
                                        prepend-inner-icon="mdi-key"
                                        type="password"
                                        label="パスワード"/>
                            <v-row justify="center">
                                <v-col align="center" cols="3">
                                    <v-btn to="/login">キャンセル</v-btn>
                                </v-col>
                                <v-col align="center" cols="3">
                                    <v-btn dark color="orange" @click="signIn">新規登録</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name:'Register',
    data(){
        return {
            email:'',
            password:'',
        }
    },
    created(){
        this.errorDelete();
    },
    methods:{
        ...mapActions(['register','errorDelete']),
        signIn(){
            this.register({email:this.email,password:this.password});
            this.email = '';
            this.password = '';
        }
    }
}
</script>