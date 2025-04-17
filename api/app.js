import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors';
import rotasUsuarios from './routes/rotasUsuarios.js';

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
app.get('/usuarios',rotasUsuarios.listarUsuarios)
app.get('/usuarios/:id_usuario',rotasUsuarios.listarUsuariosPorId)
app.patch('usuarios/:id_usuario',rotasUsuarios.atualizar)
app.delete('/usuarios/:id_usuarios',rotasUsuarios.deletar)



const porta = 3000
app.listen(porta, () =>{
    console.log(`Api rodando na porta http://localhost:${porta}`);
})

export default app; //vercel