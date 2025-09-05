import { BD } from "../db.js";

class RotasContas {
    static async NovasContas(req, res) {
        const { nome, tipo_conta, saldo, conta_padrao} = req.body;

        try {
            const Contas = await BD.query(`INSERT INTO contas (nome, tipo_conta, saldo, ativo, conta_padrao) VALUES ($1, $2, $3, true, $4) RETURNING *`,
            [nome, tipo_conta, saldo, conta_padrao]);
            return res.status(201).json(Contas[0]);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar Contas", message: error.message });

    }
}  
    static async ListarTodas(req, res) {
        try {
            const Contas = await BD.query(`SELECT * FROM contas where ativo = true order by nome`);
            return res.status(200).json(Contas.rows); // Retorna lista de Contas
        } catch (error) {
            return res.status(500).json({ error: "Erro ao listar Contas", message: error.message });
        }
    }
    static async BuscarId(req, res) {
        const { id } = req.params;
        try {
            const Contas = await BD.query(`SELECT * FROM contas WHERE id_conta = $1`, [id]);
            // Verifica se a Contas foi encontrada
            if (Contas.rows.length === 0) {
                return res.status(404).json({ message: "Contas não encontrada" });
            }
            return res.status(200).json(Contas.rows[0]); // Retorna a Contas encontrada
            } catch (error) {
                return res.status(500).json({ error: "Erro ao listar Contas", message: error.message });
            }
            }
        static async AtualizarContas(req, res) {
            const { id } = req.params;
        const {nome, tipo_conta, saldo, ativo, conta_padrao} = req.body;
        try {
            // Inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
            const campos = []
            const valores = []
            // Verifica quais campos foram fornecidos
            if(nome !== undefined){
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome)
            }
            if(tipo_conta!== undefined){
                campos.push(`tipo_conta = $${valores.length + 1}`)
                valores.push(tipo_conta)
            }
            if(saldo!== undefined){
                campos.push(`saldo = $${valores.length + 1}`)
                valores.push(saldo)
            }
            if(ativo!== undefined){
                campos.push(`ativo = $${valores.length + 1}`)
                valores.push(ativo)
            }
            if(conta_padrao!== undefined){
                campos.push(`conta_padrao = $${valores.length + 1}`)
                valores.push(conta_padrao)
            }
            if (campos.length === 0){
                return res.status(400).json({erro: "Informe os campos a serem atualizados"})
            }
           
            // Montar a query
            const query = `UPDATE contas SET ${campos.join(',')}
            WHERE id_conta = ${id} returning *`
           
            // Executar a query
            const conta = await BD.query(query, valores)
   
            // Verifica se a conta foi atualizada
            if(conta.rows.length === 0){
                return res.status(404).json({erro: "conta não encontrada"})
            }
            return res.status(200).json(conta.rows[0])
        } catch(error){
            return res.status(500).json({error: "Erro ao atualizar dados da conta", error: error.message});
        }
    }
    static async atualizarTodosCampos(req, res) {
        const { id } = req.params;
        const { nome, tipo_conta, saldo, ativo, conta_padrao } = req.body;
        try {
            const Contas = await BD.query(`UPDATE contas SET nome = $1, tipo_conta = $2, saldo = $3, ativo = $4, conta_padrao = $5 WHERE id_conta = $6 RETURNING *`,
            [nome, tipo_conta, saldo, ativo, conta_padrao, id]);
            return res.status(200).json(Contas.rows[0]);
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar Contas", message: error.message });
        }
    }
    static async deletar(req, res) {
        const { id } = req.params;
        try {
            const Contas = await BD.query(`update contas set ativo = false WHERE id_conta = $1 RETURNING *`, [id]);
            // Verifica se a Contas foi encontrada
            if (Contas.rows.length === 0) {
                return res.status(404).json({ message: "Contas não encontrada" });
            }
            return res.status(200).json(Contas.rows[0]); // Retorna a Contas deletada
            } catch (error) {
                return res.status(500).json({ error: "Erro ao deletar Contas", message: error.message });
            }
            }
   
            static async filtrarNome(req, res){
                // O valor seá enviado por parametro na URL, deve ser enviado dessa maneira
                // ?tipo_transacao=entrada
                const { nome } = req.query;
               
                try{
                    const query = `
                    SELECT * FROM contas
                    WHERE nome LIKE $1 AND ativo = true
                    ORDER by id_conta DESC
                    `
                    const valores = [nome]
                    const resposta = await BD.query(query, valores)
                    return res.status(200).json(resposta.rows)
                } catch(error){
                    console.error('Erro ao filtrar conta', error);
                    res.status(500).json({message : "Erro ao filtrar contas", error: error.message})
                   
                }
            }
}


export default RotasContas;
