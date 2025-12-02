<script setup>
import Menu from '@/components/Menu.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const nome = ref('')
const email = ref('')
const senha = ref('')
const cpf = ref('')

const URL_API = 'http://localhost:3000'
const router = useRouter()

const cadastrarUsuario = () => {
    const novoUsuario = { nome: nome.value, email: email.value, senha: senha.value, cpf: cpf.value }

    axios.post(URL_API + '/usuarios/', novoUsuario)
        .then((resposta) => {
            if (resposta.data) alert(`O usuario ${novoUsuario.nome}, foi cadastrado`)
            router.push('/')
        })
        .catch((erro) => {
            alert(erro)
        })
}

</script>

<template>
    <v-img src="../assets/fundo_login.png" cover height="100vh"> 
    <div class="divzinha">
        <v-card title>
            <h1>Cadastrar usuario</h1>
            <v-sheet class="mx-auto mt-16 px-2 py-3">
                <v-form @submit.prevent fast-fail>

                    <v-text-field v-model="nome" type="text" label="nome" color="primary" ></v-text-field>

                    <v-text-field v-model="email" type="text" label="email" color="primary"></v-text-field>

                    <v-text-field v-model="senha" type="text" label="senha" color="primary"></v-text-field>

                    <v-text-field v-model="cpf" type="text" label="cpf" color="primary"></v-text-field>

                    <v-btn @click="cadastrarUsuario" class="bomdebola" >Cadastrar</v-btn>
                </v-form>
            </v-sheet>
        </v-card>
    </div>
    </v-img>
</template>

<style scoped>
.divzinha {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.v-card {
    width: 400px;
    padding: 30px;
    background-color: rgba(88, 109, 68, 1);
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}
.v-card h1 {
    text-align: center;
    width: 100%;
    background-color:  rgba(59, 79, 41, 0.382);
    border-radius: 10px;
}

.v-btn {
    background-color: rgba(187, 55, 40, 1);
    color: aliceblue;
    display: block;
    margin: 20px auto 0 auto; 
}
.v-text-field,.v-form,.v-sheet {
    background-color: rgba(88, 109, 68, 1);
    border-radius: 10px;
}
</style>