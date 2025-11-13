<script setup>
import Menu from '@/components/Menu.vue'
import axios from 'axios';

import { onBeforeMount, reactive } from 'vue';

const state = reactive({
  documento: [],
  erro: ''
})

const URL_API = 'http://localhost:3000'


onBeforeMount(() => {
  axios.get(URL_API + '/documentos')
  .then((resposta) => {
    state.documento = resposta.data
  })
  .catch((erro) => {
    console.log('Erro no GET API/documento')
  })
})

const remove = (pais) =>{
  axios.delete(`${URL_API}/documentos/${pais}` )
  .then(() =>{
    window.location.reload();
  })
}


</script>

<template>

  <div class="d-flex">
    <Menu></Menu>
    <v-card title class="flex-1-1">
      <h1>Documentos Apreendidos</h1>
      <v-table height="580px" fixed-header striped="even">
        <thead>
          <tr>
            <th class="text-left">
              pais
            </th>
            <th class="text-left">
              Cidade
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in state.documento" :key="item.name">
            <td>{{ item.pais }}</td>
            <td>{{ item.cidade }}</td>
            <v-btn >EDITAR</v-btn>
            <v-btn @click="remove(item.pais)" >Queimar</v-btn>
          </tr>
        </tbody>
      </v-table>
    </v-card>

  </div>

</template>

<style scoped>

</style>