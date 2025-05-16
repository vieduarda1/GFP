// import { BD } from "../db.js";

//  const SECRET_KEY = "chave_api_gfp"
// class rotasTransacao {
//     static async novaTransacao(req, res) {
//         const { valor,descricao, data_transacao,data_vencimento,data_pagamento,tipo_transacao,id_conta, id_categoria,id_subcategoria, id_usuario, num_parcelas,parcelas_atual} = req.body;
//         try {
//             const sql = `INSERT  INTO transacoes(valor,descricao, data_transacao,data_vencimento,data_pagamento,tipo_transacao,id_conta, id_categoria,id_subcategoria, id_usuario, num_parcelas,parcelas_atual)
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
//             const valores = [valor,descricao, data_transacao,data_vencimento,data_pagamento,tipo_transacao,id_conta, id_categoria,id_subcategoria, id_usuario, num_parcelas,parcelas_atual]
//             const localtransacao = await BD.query(sql, valores)
//             res.status(201).json('Local Cadastrada')
//         } catch (error) {
//             console.error("Erro ao criar transação:", error);
//             res.status(500).json({ message: "Erro ao criar transação", error: error.message });
//         }
//     }
//     static async listar(req, res) {
//         try {
//             const resultado = await BD.query(`SELECT * From transacao`);
//             res.json({ transacoes: resultado.rows });
//         } catch (error) {
//             res.status(500).json({ mensagem: 'Erro ao buscar transação', erro: error.message });
//         }
//     }
//     static async listarPorId (req, res) {
//         const { id } = req.params
//         try{
//             const local_transacao = await BD.query(`SELECT * FROM transacao WHERE id_transacao = $1`, [id]);
//         res.status(200).json(transacao.rows[0]);
//         }catch(error){
//             res.status(500).json({message:  "Erro ao consultar nova transação",  error: error.message})
//         }
//     }

//     // Função atualizar
//     static async atualizarTodos(req, res) {
//         const { id_transacao } = req.params
//         const {  valor,descricao, data_transacao,data_vencimento,data_pagamento,tipo_transacao,id_conta, id_categoria,id_subcategoria, id_usuario, num_parcelas,parcelas_atual } = req.body;

//         try {
//             const transacao = await BD.query('UPDATE transacoes SET nome = $1, tipo_local = $2, saldo = $3, ativo = $4 where id_local_transacao = $5',
//                 [ valor,descricao, data_transacao,data_vencimento,data_pagamento,tipo_transacao,id_conta, id_categoria,id_subcategoria, id_usuario, num_parcelas,parcelas_atual]// comando SQL para atualizar o usuario
//             )
//             res.status(200).json(transacao.rows[0])
//         } catch (error) {
//             res.status(500).json({ message: "Erro ao consultar local transação", error: error.message })
//         }
//     }

//     static async atualizar(req, res) {
//         const {id_local_transacao} = req.params
//         const { nome, tipo_local, saldo, ativo } = req.body;

//         try {
//             const campos = [];
//             const valores = [];

//             if (nome !== undefined) {
//                 campos.push(`nome = $${valores.length + 1}`)
//                 valores.push(nome);
//             }

//             if (tipo_local !== undefined) {
//                 campos.push(`tipo_local = $${valores.length + 1}`)
//                 valores.push(tipo_local);
//             }

//             if (saldo !== undefined) {
//                 campos.push(`saldo = $${valores.length + 1}`)
//                 valores.push(saldo);
//             }

//             if (ativo !== undefined) {
//                 campos.push(`ativo = $${valores.length + 1}`)
//                 valores.push(ativo);
//             }

//             if (campos.length === 0) {
//                 return res.status(400).json({ message: 'Nenhum campo fornecido para atualizar' })
//             }

//             const query = `UPDATE transacoes SET ${campos.join(',')} WHERE id_transacao = ${id_transacao} RETURNING *`
//             const transacao = await BD.query(query, valores)

//             if (transacao.rows.length === 0) {
//                 return res.status(404).json({ message: 'Local transação não encontrada' })
//             }
//             return res.status(200).json(transacao.rows[0]);
//         }
//         catch (error) {
//             res.status(500).json({ message: "Erro ao atualizar o local transação", error: error.message })
//         }
//     }

//     //criar uma rota que permite filtrar transacções por data de vencimento ou data de pagamento
//     //dentro de um intervalo especifico
//     static async filtrarPorData(req,res){
//     const { data_inicio, data_fim,tipo_data } = req.query

//     let columData;
//     if(tipo_data == 'vencimento'){
//         columData == 'data_vencimento'
//     }
//     else if (tipo_data == 'pagamento'){
//         columData = 'data_pagamento'
//     }
//     else{
//         return res.status(480).json({
//             message: "tipo_data inválido, use vencimento ou pagamento"
//         })
//     }
//     try{
//         const query = `SELECT t.*, u.nome AS nome_usuario, ct.nome
//                         FROM transacoees AS t LEFT JOIN usuarios AS u ON t.id_usaurio = u.id_usuario
//                         JOIN contas ct ON t.id_conta = ct.id_conta WHERE ${columData} BETWEEN $1 AND $2
//                         ORDER BY ${columData} ASC`

//         const transacoees = await BD.query(query, [data_inicio,data_fim])

//         res.status(200).json(transacoees.rows)

//     }catch(error){
//          console.error("Erro ao filtrar transação:", error);
//             res.status(500).json({ message: "Erro ao filtrar transação", error: error.message });
//     }

// }
//     static async deletar(req, res) {
//         const { id_local_transacao } = req.params

//         try {
//             const localtransacao = await BD.query('UPDATE categorias SET ativo = false where id_categoria = $1',
//                 [id_local_transacao]// comando SQL para atualizar o usuario
//             )
//             res.status(200).json(localtransacao.rows[0])
//         } catch (error) {
//             res.status(500).json({ message: "Erro ao consultar local transação", error: error.message })
//         }
//     }
// }

// export function autenticarToken(req, res, next) {
//     const token = req.headers['authorization'];

//     if (!token) return res.status(403).json({message: 'Token não fornecido'})

//     jwt.verify(token.split(" ")[1], SECRET_KEY, (err, usuario) => {
//         if(err) return res.status(403).json({message: 'Token inválido'})

//         req.usuario = usuario;
//         next();
//     })
// }

// export default rotasTransacao;


import { BD } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class rotasTransacoes {
    static async nova(req, res) {
        const { valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual } = req.body;

        try {
            const transacao = await BD.query('INSERT INTO transacoes (valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *', [valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual]);
            res.status(201).json(transacao.rows[0]);
        } catch(error) {
            console.error('Erro ao criar transação', error);
            res.status(500).json({ message: 'Erro ao criar transação', error: error.message });
        }
    }
    static async atualizar(req, res) {
        const { id_transacao } = req.params;
        const { valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual } = req.body;

        try {
            const transacao = await BD.query('UPDATE transacoes SET valor = $1, descricao = $2, data_transacao = $3, data_vencimento = $4, data_pagamento = $5, tipo_transacao = $6, id_conta = $7, id_categoria = $8, id_subcategoria = $9, id_usuario = $10, num_parcelas = $11, parcela_atual = $12 WHERE id_transacao = $13 RETURNING *', [valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual, id_transacao]);
            res.status(200).json(transacao.rows[0]);
        } catch(error) {
            console.error('Erro ao atualizar transação', error);
            res.status(500).json({ message: 'Erro ao atualizar transação', error: error.message });
        }
    }
    static async listar(req, res) {
        try {
            const transacoes = await BD.query('SELECT * FROM transacoes');
            res.status(200).json(transacoes.rows);
        } catch(error) {
            console.error('Erro ao listar transações', error);
            res.status(500).json({ message: 'Erro ao listar transações', error: error.message });
        }
    }
    static async deletar(req, res) {
        const { id_transacao } = req.params;

        try {
            const transacao = await BD.query('DELETE FROM transacoes WHERE id_transacao = $1 RETURNING *', [id_transacao]);
            return res.status(200).json({ message: 'Transação deletada com sucesso', transacao: transacao.rows[0] });
        } catch(error) {
            console.error('Erro ao deletar transação', error);
            res.status(500).json({ message: 'Erro ao deletar transação', error: error.message });
        }
    }
    static async listarPorID(req, res) {
        const { id_transacao } = req.params;

        try {
            const transacao = await BD.query('SELECT * FROM transacoes WHERE id_transacao = $1', [id_transacao]);
            if(transacao.rows.length === 0) {
                return res.status(404).json({ message: 'Transação não encontrada' });
            }
            res.status(200).json(transacao.rows[0]);
        } catch(error) {
            console.error('Erro ao listar transação', error);
            res.status(500).json({ message: 'Erro ao listar transação', error: error.message });
        }
    }

    //Criar uma rota que permite filtrar transações por data de vencimento ou data de pagamento
    //dentro de um intervalo específico
    static async filtrarPorData(req, res) {
        const { data_inicio, data_fim, tipo_data } = req.query;

        let colunaData;
        if(tipo_data === 'vencimento') {
            colunaData = 'data_vencimento';
        } else if(tipo_data === 'pagamento') {
            colunaData = 'data_pagamento';
        } else {
            return res.status(400).json({ message: 'Tipo de data inválido, use vencimento ou pagamento' });
        }
        try {
            const query = `SELECT t.*, u.nome AS nome_usuario, ct.nome FROM transacoes AS t
            LEFT JOIN usuarios AS u ON t.id_usuario = u.id_usuario
             LEFT JOIN contas ct ON t.id_conta = ct.id_conta
            WHERE ${colunaData} BETWEEN $1 AND $2
            ORDER BY ${colunaData} ASC`;

            const transacoes = await BD.query(query, [data_inicio, data_fim]);
            res.status(200).json(transacoes.rows);
        } catch(error) {
            console.error('Erro ao filtrar transações por data', error);
            res.status(500).json({ message: 'Erro ao filtrar transações por data', error: error.message });
    }
    }

    //somando transacoes entrada ou saida
    static async somarTransacaoes(req,res){
        const { tipo, id_usuario} = req.query
        try{
            const tipoTransacao = tipo.toUpperCase();

            const query = `SELECT SUM(valor) AS total FROM transacoes WHERE tipo_transacao = $1 AND id_usuario = $2 
                `

                const resultado = await BD.query(query ,[tipoTransacao, id_usuario])
                let total = resultado.rows[0].total
                if(total === null)
                {
                    total = 0
                }
                res.status(200).json({total:parseInt(total)})
        }catch(error){
            console.error('Erro ao somar transações ', error);
            res.status(500).json({ message: 'Erro ao somar transações ', error: error.message });
        }
    }

    static async transacoesVencidas(req,res){
        const {id_usuario} = req.params;

        try{
            const query = `SELECT t.valor,t.data_transacao,t.data_vencimento,t.data_pagamento, 
                c.nome AS nome_conta,
                ct.nome AS nome_categoria, 
                sct.nome AS nome.subcategoria FROM transacoes AS t
                 LEFT JOIN usuarios u ON t.id_usuario = u.id_uasuario
                 LEFT JOIN usuarios c ON t.id_conta = c.id_conta
                 LEFT JOIN usuarios ct ON t.id_categorias = ct.id_categoria
                 LEFT JOIN usuarios u ON t.id_usuario = u.id_usuario
                 LEFT JOIN usuarios sct ON t.id_subcategoria = sct.id_subcategoria
                 WHERE t.dta_vencimento < CURRENT_DATE   --filtrar transacoes vencidas
                 AND t.id_usuario = $1
                 ORDER BY t.data_vencimento ACS
                 `
            const resultado = await BD.query(query, [id_usuario])

            //função para formatar dados
            const formatarDataBr =(data) => {
                if(!data) return null
                return new Date(data). toLocaleDateString('pt-BR') //Converte a data no padrao BR
            }

            const dadosFormatados = resultado.rows.map(t => ({
                ...t, //copia todas as propriedades originais que da resulatdo para t
                data_transacao: formatarDataBr(t.data_transacao),
                data_vencimento: formatarDataBr(t.data_vencimento),
                data_pagamento: formatarDataBr(t.data_pagamento),
            }))
             res.status(200).json(dadosFormatados)

        }catch{
             console.error('Erro ao buscar transações vencidas ', error);
            res.status(500).json({ message: 'Erro ao buscar transações vencidas ', error: error.message })

        }
    }
}
export default rotasTransacoes
