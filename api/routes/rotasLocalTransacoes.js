import { BD } from "../db";

class localTransacao{
    static async novolocalTransacao(req, res){
        const{nome, tipo_local, saldo}= req.body;

        try{
            const local = await BD.query(`
                INSERT INTO local_transacao(nome, tipo_local, saldo)
                VALUES($1, $2, $3)`,
            [nome, tipo_local, saldo])

            res.status(201).json("local de transação Cadastrado com sucesso✔")
        }catch(error){
            console.error('Erro ao criar local de transação', error);
            res.status(500).json({message: 'Erro ao criar', error: error.message})
        }
    }

    static async listar(req, res){
        try{
            const local = await BD.query('SELECT * FROM local_transacao');
            res.status(200).json(local.rows);
        }catch(error){
            res.status(500).json({message:
                'Erro ao listar as local_transacao', error: error.message})
        }
    }

    static async consultarPorId(req, res){
        const {id_local_transacao} = req.params;
        try{
            const local_transacao = await BD.query(
                'SELECT * FROM local_transacao WHERE id_local_transacao = $1', [id_local_transacao])
            res.status(200).json(local_transacao.rows[0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao consultar as local_transacao', error: error.message})
        }
    }

    static async atualizar(req, res){
        const {id_local_transacao} = req.params;
        const {nome, tipo_local, saldo} = req.body;

        try{
             const campos = [];
             const valores = [];

            //verificar quais campos foram fornecidos
            if(nome !== undefined){
                campos.push(`nome = $${valores.length + 1}`) //
                valores.push(nome);
            }
            if(tipo_local !== undefined){
                campos.push(`tipo_local = $${valores.length + 1}`)
                valores.push(tipo_local);
            }
            if(saldo !== undefined){
                campos.push(`saldo = $${valores.length + 1}`)
                valores.push(saldo);
            }
            if(campos.length === 0){
                return res.status(400).json({message: 'Nenhum campo fornecido para atualizar'})
            }

            //Adicionar o id ao final de valores
            valores.push(id_local_transacao)

            //Montamos a query dinamicamente
            const query =
            `UPDATE local_transacao SET ${campos.join(', ')}
            WHERE id_local_transacao = ${id_local_transacao} RETURNING *`

            //Executando nossa query
            const local_transacao = await BD.query(query,valores)
            //Verifica se foi atualizando
            if(local_transacao.rows.length === 0){
                return res.status(404).json({message: 'local_transacao não encontrado'})
            }

            return res.status(200).json(local_transacao.rows[0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao atualizar as sub local_transacao', error: error.message})
        }
    }

}
