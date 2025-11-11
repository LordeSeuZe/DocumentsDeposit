import { createWebHistory, createRouter } from 'vue-router'
import PerfilView from './pages/Perfil.vue'
import LoginView from './pages/Login.vue'
import ListProdutosView from './pages/ListaProdutos.vue'
import CadastrarProdutosView from './pages/CadastrarProduto.vue'

const routes = [
    { path: '/', component: LoginView },
    { path: '/perfil', component: PerfilView },
    { path: '/produtos', component: ListProdutosView },
    { path: '/cadastrar', component: CadastrarProdutosView }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router