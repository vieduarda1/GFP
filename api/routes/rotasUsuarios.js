import { BD } from "../db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SECRET_KEY = "chave_secreta"

class rotasUsuarios{
    static async novoUsuario(req, res){
        const {nome, email, senha, tipo_acesso} = req.body;
        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        try{
            const sql = `INSERT INTO usuarios(nome, email, senha, tipo_acesso) VALUES($1,$2,$3,$4)`
            const valores = [nome,email,senhaCriptografada, tipo_acesso]
            const usuario =await BD.query(sql,valores)
            res.status(201).json('Usuario Cadastrado')
        }
        catch(error){
            console.log('Erro ao criar usuario', error);
            res.status(500).json({message: 'Erro ao criar', error: error.message})
            
        }
    }
    static async login(req, res){
        const {email, senha} = req.body;    
        try{
            const resultado =  await BD.query(
                `SELECT * from usuarios WHERE email = $1 and ativo = true`,
                [email]
            )
            if(resultado.rows.length === 0 ){
                return res.status(401).json({ mensagem: "Email ou Senha incorreto"});
            }

            const usuario = resultado.rows[0]
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

            if(!senhaCorreta){
                return res.status(401).json({ mensagem: " Senha incorreto"})
            }
            //gerar um token 
            const token = jwt.sign(
                //payload
                {id: usuario.id_usuario, nome: usuario.nome, email: usuario.email},
                //signature
                SECRET_KEY,
                // {expiresIn: '1h'}
            )
            return res.status(200).json({
                id: usuario.id_usuario,
                email: usuario.email,
                nome: usuario.nome,
                tipo_acesso: usuario.tipo_acesso,
                token
            })

        }
        catch(error){
            console.error("Erro ao fazer login:", error);
            res.status(500).json({ error: "Erro ao fazer login" })
        }
    }
    static async listarUsuarios(req, res){
        try{
            const resultado = await BD.query(`SELECT * FROM usuarios WHERE ativo = true`);
            return res.status(200).json({usuarios: resultado.rows})
        }catch(error){
            console.log("Erro ao encontrar usuario", error);
             return res.status(500).json({message:
                'Erro ao fazer login', error: error.message})
        }
    }
    static async listarUsuariosPorId(req, res){
        const { id } = req.params;
        try{
            const usuario = await BD.query('SELECT *  FROM usuarios WHERE id = $1', [id])
            return res.status(200).json(usuario.rows[0]);
        }catch(error){
             return res.status(500).json({message:
                "Erro ao consultar id", error: error.message})
        }
    }
    static async atualizar(req, res){
        const { id_usuario } = req.params;
        const { nome, email, senha, tipo_acesso } =req.body
        try{
            //inicializar arrays (vetores) os campos e valores a serem atualizados
            const campos = [];
            const valores = [];

            //verificar quais campos foram fornecidos
            if(nome !== undefined){
                campos.push(`nome = $${valores.length + 1}`) //Usa o tamanho de array para determinar o campo 
                valores.push(nome);
            }

            if(email !== undefined){
                campos.push(`email = $${valores.length + 1}`)
                valores.push(email)
            }
            if(senha !== undefined){
                campos.push(`senha = $${valores.length + 1}`)
                const saltRounds = 10;
                const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
                valores.push(senhaCriptografada)
            }
            if(tipo_acesso !== undefined){
                campos.push(`tipo_acesso = $${valores.length + 1}`)
                valores.push(tipo_acesso)
            }
            if(campos.length ===0 ){
               return res.status(400).json({message: 'Nenhum campo fornecidos para atualizações'})
            }

            //adicionar o id ao final dos valores
            // valores.push(id)

            //montamos a querry dinamicamente
            const query =`UPDATE usuarios
                SET ${campos.join(',')} WHERE id_usuario = ${id_usuario} RETURNING *`;
                //executando nossa query
                const usuario = await BD.query(query,valores)

                //verifica se o usuario foi atualizado
                if(usuario.rows.length ===0 ){
                    return res.status(404).json({message: 'usuario não encontrado'})
                 }
                 return res.status(200).json(usuario.rows[0])
                    
        }catch(error){
            res.status(500).json({mensagem: "Erro ao atualizar o usuario", error: error.mensagem})
        }
    }
    static async deletar(req, res){
        const { id_usuario } = req.params;
        try{
            const usuario = await BD.query(
                'UPDATE usuarios SET ativo = false WHERE id_usuario = $1', [id_usuario]
            )
            return res.status(200).json({message: "usuario desativado com sucesso✅"})
        }catch(error){
             return res.status(500).json({message:
                "Erro ao desativar usuario", error: error.message
            })
        }
    }
}
    export function autenticarToken(req, res, next){
        //extrair do token o cabeçalho da requisição 
        const token = req.headers['authorization'];//Bearer<token>
    
        //verificar se o tokem foi fornecido na requisição 
        if(!token) return res.status(403).json({mensagem:'token não fornecido'})
    
            //verificar a validade do token 
            //jwt.verify que valida se o token é legitimo 
            jwt.verify(token.split(' ')[1], SECRET_KEY, (err, usuario) => {
                if(err) return res.status(403).json({mensagem: 'Token invalio'})
    
                //se o token for valido, adiciona os dados do usuario(decodificando no token)
                //tornando e essas informações disponiveis nas rotas que precisam da autenticação
    
                req.usuario = usuario;
                next();
            })
        }
export default rotasUsuarios;