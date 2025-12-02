<script>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const pais = ref('')
const cidade = ref('')
const URL_API = 'http://localhost:3000'
const router = useRouter()

const cadastrarDocumento = () => {
  const novoDocumento = { pais: pais.value, cidade: cidade.value }
  
  axios.post(URL_API + '/documentos/', novoDocumento)
  .then((resposta) => {
    if(resposta.data) router.push('/documentos')
  })
  .catch((erro) => {
    console.log(erro)
  })
}
</script>

<template>

<v-card title>
        <h1>Relatório de Documento Apreendido</h1>
        
        <v-sheet class="mx-auto mt-16 px-2 py-3" width="1000px">
          <v-form @submit.prevent fast-fail>

            <v-text-field v-model="pais" type="text" label="Pais" color="primary"></v-text-field>

            <v-text-field v-model="cidade" type="text" label="Cidade" color="primary"></v-text-field>

            <v-btn @click="cadastrarDocumento" color="success">Cadastrar</v-btn>
          </v-form>
        </v-sheet>
      </v-card>

</template>

<style scoped>

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


.fill-height {
    height: 100vh;
}

</style>