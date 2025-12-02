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
              Pais
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
                label="Pais"  
                color="primary"></v-text-field>
                <v-text-field
                type="text" 
                label="Cidade"
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
.v-sheet{
    background-color: rgba(88, 109, 68, 1);
}
th {
   background-color:rgba(59, 79, 41, 0.382) !important;
   
}
td{
  border: 0.5px black solid;
}
.v-table{
    background-color:rgba(59, 79, 41, 0.382);
    margin-top: 10px !important;
}

.v-card  {
    width: 400px; 
    padding: 30px;
    background-color: rgba(88, 109, 68, 1);
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}
 .v-text-field {
    width: 47vh; 
    padding: 10px;
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
    
}

</style>