<script>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const nome = ref('');
const email = ref('');
const senha = ref('');

const URL_API = 'http://localhost:3000'


const salvar = () => {
    const contaAtt = {nome: nome.value, email: email.value, senha: senha.value}

    axios.patch(`${URL_API}/usuario/`)
} 


</script>
<template>
    <v-img src="../assets/fundo_login.png" cover height="100vh">
        <v-card >
            <h1>Editando perfil</h1>
            <v-sheet>
                <v-form @submit.prevent fast-fail>
                    <v-text-field v-model="nome" type="text" label="nome" color="primary" ></v-text-field>
                    <v-text-field v-model="email" type="text" label="email" color="primary"></v-text-field>
                    <v-text-field v-model="senha" type="text" label="senha" color="primary"></v-text-field>
                    <v-text-field v-model="senha" type="text" label="confirmar Senha" color="primary"></v-text-field>
                </v-form>               
            </v-sheet>
            <v-btn @click="salvar">Salvar</v-btn>
        </v-card>
    </v-img>
</template>
<style>
    .v-card {
        background-color: rgba(88, 109, 68, 1);
        border: 3px rgba(36, 48, 26, 1) solid ;

        h1{

            color: aliceblue;
            justify-items: center;
            }
    }
    .v-sheet {
        background-color: rgb(88, 109, 68, 1);
        margin: 5%;
        border-radius: 15px;
        
    }
    .v-text-field{
        background-color: rgba(107, 133, 83, 0.664);
        color: aliceblue;
        border-radius: 15px;
    }
    .v-btn {
        color: aliceblue;
        background-color: rgba(187, 55, 40, 1);
    }
</style>