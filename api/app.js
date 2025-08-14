import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors';
import rotasUsuarios,{autenticarToken} from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import RotasContas from './routes/rotasContas.js'
import rotasTransacao from './routes/rotasTransacao.js';
import rotasSubCategorias from './routes/rotasSubCategorias.js';


import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger.js';


const app = express(); //criar instancia do express

testarConexao();
app.use(cors());
app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.get('/',(req,res)=>{
    res.redirect('/api-docs')
})

//Rotas
app.post('/usuarios',rotasUsuarios.novoUsuario)
app.post('/usuarios/login',rotasUsuarios.login)
app.get('/usuarios',autenticarToken,rotasUsuarios.listarUsuarios)
app.get('/usuarios/:id_usuario',rotasUsuarios.listarUsuariosPorId)
app.patch('/usuarios/:id_usuario',autenticarToken,rotasUsuarios.atualizar)
app.delete('/usuarios/:id_usuario',autenticarToken,rotasUsuarios.deletar)


//Rotas categorias
app.post('/categorias', autenticarToken, rotasCategorias.novaCategoria)
app.get('/categorias/filtrarCategoria', rotasCategorias.filtrarCategoria)
app.get('/categorias', rotasCategorias.listar)
app.get('/categorias/:id_categoria', rotasCategorias.consultarPorId)
app.patch('/categorias/:id_categoria', rotasCategorias.atualizar)
app.put('/categorias/:id_categoria', rotasCategorias.atualizarTodosCampos)
app.delete('/categorias/:id_categoria', rotasCategorias.desativar)

//Rotas subcategorias
app.post('/subcategoria', autenticarToken, rotasSubCategorias.novoSubCategoria)
app.get('/subcategorias/filtrarSubCategoria', rotasSubCategorias.filtrarSubCategoria)
app.get('/subcategorias', rotasSubCategorias.listar)
app.get('/subcategorias/:id_subcategoria', rotasSubCategorias.consultarPorId)
app.patch('/subcategorias/:id_subcategoria', rotasSubCategorias.atualizar)
app.put('/categorias/:id_categoria', rotasCategorias.atualizarTodosCampos)
app.delete('/categorias/:id_categoria', rotasCategorias.desativar)



// //Rota Contas
// app.get('/contas/filtrarConta',rotasContas.filtrarNome)
// app.post('/contas/', rotasContas.novoContas)
app.get('/contas', RotasContas.ListarTodas)
// // app.get('/contas/', rotasContas.buscarporID)

// Rotas contas
app.get('/contas/filtrarNome', RotasContas.filtrarNome)
app.post('/contas', RotasContas.NovasContas)
// app.get('/contas',autenticarToken. RotasContas.ListarTodas)
app.get('/contas/:id', RotasContas.BuscarId)
app.patch('/contas/:id', RotasContas.AtualizarContas)
app.put('/contas/:id', RotasContas.atualizarTodosCampos)
app.delete('/contas/:id', RotasContas.deletar)



//rotas transacoes
app.post('/transacao', rotasTransacao.nova)
app.get('/transacao/somarTransacoes',rotasTransacao.somarTransacaoes)
app.get('/transacao/filtrarPorData', rotasTransacao.filtrarPorData)
app.get('/transcao/transcoesVencidas/:id_usuario',rotasTransacao.transacoesVencidas)




const porta = 3000
app.listen(porta, () =>{
    console.log(`Api rodando na porta http://localhost:${porta}`);
})

export default app; //vercel