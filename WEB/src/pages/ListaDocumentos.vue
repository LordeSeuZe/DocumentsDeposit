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

const abrirModal = (documento) => {
  state.produtoEdicao = documento
  state.mostrarModal = true
}

 const editarProduto = (pais) => {
   axios.patch(`${URL_API}/documetos/${pais}`)
   .then(() =>{
    
  }).finally(() =>{
    state.mostrarModal = false
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
            <v-btn @click="abrirModal(item)">EDITAR</v-btn>
            <v-btn @click="remove(item.pais)">Queimar</v-btn>
          </tr>
        </tbody>
      </v-table>
    </v-card>
<v-dialog max-width="500" v-model="state.mostrarModal">
      <template v-slot:default="{ isActive }">
        <v-card title="Editar Produto">
          <v-card-text>
            <v-sheet class="mx-2 p-2">
              <v-form @submit.prevent fast-fail>
                <v-text-field 
                v-model="state.produtoEdicao.pais" 
                type="text" 
                label="pais"  
                color="primary"></v-text-field>
                <v-text-field
                type="text" 
                label="Nome"
                v-model="state.produtoEdicao.cidade"
                ></v-text-field>

              </v-form>
            </v-sheet>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Editado!"
              @click="editarProduto"
              color="primary"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>

</template>

<style scoped>

</style>