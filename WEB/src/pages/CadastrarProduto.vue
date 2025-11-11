<script setup>
import Menu from '@/components/Menu.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const nome = ref('')
const preco = ref(0.0)
const URL_API = 'http://localhost:3000'
const router = useRouter()

const cadastrarProduto = () => {
  const novoProduto = { nome: nome.value, preco: preco.value }
  
  axios.post(URL_API + '/produtos', novoProduto)
  .then((resposta) => {
    if(resposta.data) router.push('/produtos')
  })
  .catch((erro) => {
    console.log(erro)
  })
}

const nomeRegras = [
  value => {
    if (nome.value.length > 0) return true
    return 'O nome deve ter pelo menos 1 caractere.'
  }
]

</script>

<template>
  <div class="d-flex ga-0">
    <Menu></Menu>
    <v-card title>
      <h1>Página de cadastro de produtos</h1>
      <v-sheet class="mx-auto mt-16 px-2 py-3" width="1000px">
        <v-form @submit.prevent fast-fail>
          <v-text-field v-model="nome" type="text" label="Nome do produto" color="primary" :rules="nomeRegras"></v-text-field>

          <v-number-input v-model="preco" label="Preço do produto" color="primary" :precision="2" :min="0"></v-number-input>

          <v-btn @click="cadastrarProduto" color="success">Cadastrar</v-btn>

        </v-form>
      </v-sheet>
    </v-card>
  </div>
</template>