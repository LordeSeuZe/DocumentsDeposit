<template>
    <v-sheet class="mx-auto mt-16 px-2 py-2" width="300">
        <v-form @submit.prevent fast-fail>
            <v-text-field 
            v-model="email"
            type="email"
            placeholder="email@email.com"
            label="E-mail"
            color="primary"
            :rules="emailRegras"
            ></v-text-field>

            <v-text-field
            v-model="senha"
            label="Senha"
            :rules="senhaRegras"
            color="primary"
            ></v-text-field>

            <v-btn @click="logar" color="success">Login</v-btn>
        </v-form>
            <v-btn @click="dica" class="dica">
                Dica
            </v-btn>
    </v-sheet>

    
</template>

<script setup>
    import { onBeforeMount, ref } from 'vue'
    
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const logar = () => {
        //V1 de login, bem noob, sem BD!
        if(email.value == 'gloria@arstotzka.com' && senha.value == '08082013') {
           localStorage.email = email.value;
           localStorage.usuarioLogado = true;

           //Exemplo com SessionStorage
           //sessionStorage.email = email.value;
           //sessionStorage.usuarioLogado = true;

           //Para armazenar um Objeto no localStorage
           //const novoUsuario = { nome: 'Aderbal', idade: 10 }
           //localStorage.usuario = JSON.stringify(novoUsuario)

            router.push('/perfil')
        }else{
            alert('Email ou Senha incorreto')
        }
        
    }

    const dica = () =>{
        alert('Email: gloria@arstotzka.com \nSenha: 08082013')
    }

    onBeforeMount(() => {
        const usuarioLogado = localStorage.usuarioLogado? JSON.parse(localStorage.usuarioLogado) : false;
        if(usuarioLogado)
            router.push('/perfil')
    })

    const email = ref('')
    const emailRegras = [
    value => {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
      return 'Insira um e-mail válido.'
    },
  ]
    const senha = ref('')
    const senhaRegras = [
        value => {
            if(senha.value.length >= 5) return true
            return 'A senha deve ter pelo menos 5 caracteres.'
        },
    ]
</script>

<style scoped>

.dica {
    margin: 10px 0 0 0;
    background-color: rgb(143, 143, 0);
    color: azure;
}
</style>