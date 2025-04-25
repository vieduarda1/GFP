import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors';
import rotasUsuarios,{autenticarToken} from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';

const app = express(); //criar instancia do express

testarConexao();
app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('API funcionando')
})

//Rotas
app.post('/usuarios',rotasUsuarios.novoUsuario)
app.post('/usuarios/login',rotasUsuarios.login)
app.get('/usuarios',autenticarToken,rotasUsuarios.listarUsuarios)
app.get('/usuarios/:id_usuario',rotasUsuarios.listarUsuariosPorId)
app.patch('/usuarios/:id_usuario',autenticarToken,rotasUsuarios.atualizar)
app.delete('/usuarios/:id_usuario',autenticarToken,rotasUsuarios.deletar)

//Rotas categorias
app.post('/categorias',autenticarToken, rotasCategorias.novaCategoria)
app.get('/categorias', rotasCategorias.listar)
app.get('/categorias/:id_categoria', rotasCategorias.consultarPorId)
app.patch('/categorias/:id_categoria', rotasCategorias.atualizar)
app.put('/categorias/:id_categoria', rotasCategorias.atualizarTodosCampos)
app.delete('/categorias/:id_categoria', rotasCategorias.desativar)



const porta = 3000
app.listen(porta, () =>{
    console.log(`Api rodando na porta http://localhost:${porta}`);
})

export default app; //vercel