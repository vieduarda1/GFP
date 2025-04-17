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
                "SELECT * from usuarios WHERE email = $1",
                [email]
            )
            if(resultado.rows.length === 0 ){
                return res.status(401).json({ mensagem: "Email ou Senha incorreto"});
            }

            const usuario = resultado.rows[0]
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

            if(!senhaCorreta){
                return res.status(401).json({ mensagem: "Email ou Senha incorreto"})
            }

            
            //gerar um token 
            const token = jwt.sign(
                //payload
                {id_usuario: usuario.id_usuario, nome: usuario.nome, email: usuario.email},
                //signature
                SECRET_KEY,
                {expiresIn: '1h'}
            )

            return res.status(200).json({
                mensagem: "Login executado",
                id: usuario.id_usuario,
                email: usuario.email,
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
            const usuarios = await BD.query('SELECT * FROM usuarios');
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


    static async deletar(req, res){
        const { id } = req.params;
        try{
            const produto = await BD.query(
                'DELETE FROM usuarios WHERE id = $1', [id]
            )
            return res.status(200).json({message: "usuario deletado com sucesso"})
        }catch(error){
             return res.status(500).json({message:
                "Erro ao encontrar usuario", error: error.message
            })
        }
    }

}

export default rotasUsuarios;