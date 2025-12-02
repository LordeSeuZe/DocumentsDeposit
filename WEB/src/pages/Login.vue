<template>
    <v-img src="../assets/Papers-Please-logo.jpg"
    cover
    height="100vh"
  >
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
            <div class="linha-botoes">
            <v-btn @click="logar">Entrar</v-btn>
            <v-btn @click="cadastrar">Criar</v-btn>
            </div>
        </v-form>
    </v-sheet>
    </v-img>
</template>

<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios' 
    
    const router = useRouter()
    const email = ref('')
    const senha = ref('')

    const API_URL = 'http://localhost:3000/usuarios/login' 

    const logar = async () => {
 
        try {
            if (!email.value || !senha.value) {
                alert('Documentos, Por Favor!')
                return
            }
            const api_resposta = await axios.post(API_URL, {
                email: email.value,
                senha: senha.value
            })
        
            const token = api_resposta.data.token || api_resposta.data.accessToken; 
            if (token) {
                localStorage.setItem('authToken', token);
            }
            localStorage.setItem('usuarioLogado', true);
            router.push('/perfil')
            
        } catch (error) {
            console.error('Erro de Login:', error)
        }
    }

    const cadastrar = () =>{
        router.push('/cadastrarUsu')
    }
    
    onBeforeMount(() => {
        const authToken = localStorage.getItem('authToken');
        if(authToken)
            router.push('/perfil')
    })

    const emailRegras = [
    value => {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
      return 'Insira um e-mail válido.'
    },
  ]
    const senhaRegras = [
        value => {
            if(senha.value.length >= 5) return true
            return 'A senha deve ter pelo menos 5 caracteres.'
        },
    ]
</script>

<style scoped>
.v-sheet{
    background-color: rgba(88, 109, 68, 1);
    border-radius: 10px;
}

.v-btn {
    margin: 10px 0 0 0;
    background-color: rgba(187, 55, 40, 1);
    color: azure;
    border-radius: 5px;
}

.v-text-field{
    color: black;
}

.linha-botoes {
    display: flex;
    justify-content: space-between;
}
</style>