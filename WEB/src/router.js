import { createWebHistory, createRouter } from 'vue-router'
import PerfilView from './pages/Perfil.vue'
import LoginView from './pages/Login.vue'
import ListDocumentosView from './pages/ListaDocumentos.vue'
import CadastrarDocumentoView from './pages/CadastrarDocumento.vue'
import CadastrarUsuarioView from './pages/CadastrarUsuario.vue'
import EditarPerfil from './pages/EditarPerfil.vue'

const routes = [
    { path: '/', component: LoginView },
    { path: '/perfil', component: PerfilView },
    { path: '/documentos', component: ListDocumentosView },
    { path: '/cadastrar', component: CadastrarDocumentoView },
    { path: '/cadastrarUsu', component: CadastrarUsuarioView},
    { path: '/editarPerf', component: EditarPerfil}
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router