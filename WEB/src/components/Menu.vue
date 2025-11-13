<template>
 <v-img src="../assets/fundoPapersPlease.png " cover height="100vh">
  <v-layout>
    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item prepend-avatar="../assets/avatar.png" title="Agente de Fronteira"
          subtitle="gloria@arstotzka.com"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Meu perfil"
          value="perfil"
          to="/perfil"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-list-box-outline"
          title="Listar Documentos"
          value="listaDocumentos"
          to="/documentos"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-plus"
          title="Cadastrar Documento"
          value="cadastrarDocumentos"
          to="/cadastrar"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-logout"
          title="Sair"
          value="sair"
          @click="deslogar"
        ></v-list-item>
      </v-list>

    </v-navigation-drawer>
  </v-layout>
 </v-img> 
</template>
<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const deslogar = () => {
    localStorage.usuarioLogado = false;
    localStorage.email = '';
    router.push('/')
  } 
</script>
<style scoped>

.v-navigation-drawer{
  background-image: url("../assets/cabinePaperPlease.png");
  background-position: center;
  background-size: cover;
  height: 100vh;
}
  .v-list-item{
    margin: 5px 0 0 0;
    background-color: rgba(87, 72, 72, 0.8);
    color: rgba(228, 230, 189);
  }
</style>