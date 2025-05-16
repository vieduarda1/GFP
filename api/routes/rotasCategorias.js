import { BD } from '../db.js'


class rotasCategorias {
    static async novaCategoria(req, res) {
        const { nome, tipo_transacao, gasto_fixo, id_usuario } = req.body;

        try {
            const categoria = await BD.query(`
                    INSERT INTO categorias(nome, tipo_transacao, gasto_fixo,id_usuario)
                    VALUES($1, $2, $3,$4) RETURNING *`,
                [nome, tipo_transacao, gasto_fixo, id_usuario])

            res.status(201).json("Categoria Cadastrada com sucesso✔")
        } catch (error) {
            console.error('Erro ao criar categoria', error);
            res.status(500).json({ message: 'Erro ao criar', error: error.message })
        }
    }

    //filtrar por tipo de categoria
    static async filtrarCategoria(req, res) {
        const { tipo_transacao } = req.query;
        try {
            const query = `SELECT * FROM categorias
              WHERE tipo_transacao = $1 AND ativo = true
              ORDER BY nome `

            const valores = [tipo_transacao]
            console.log(query, valores);
            
            const resposta = await BD.query(query, valores)
            return res.status(200).json(resposta.rows)
        } catch (error) {
            console.error('Erro ao filtrar categoria', error);
            res.status(500).json({ message: 'Erro ao filtrar categoria', error: error.message })
        }
    }

    static async listar(req, res) {
        try {
            const categorias = await BD.query('SELECT * FROM categorias');
            res.status(200).json(categorias.rows);
        } catch (error) {
            res.status(500).json({
                message:
                    'Erro ao listar as categorias', error: error.message
            })
        }
    }

    static async consultarPorId(req, res) {
        const { id_categoria } = req.params;
        try {
            const categoria = await BD.query('SELECT * FROM categorias WHERE id_categoria = $1', [id_categoria])
            res.status(200).json(categoria.rows[0])
        } catch (error) {
            res.status(500).json({
                message:
                    'Erro ao consultar as categorias', error: error.message
            })
        }
    }

    static async atualizar(req, res) {
        const { id_categoria } = req.params;
        const { nome, tipo_transacao, gasto_fixo } = req.body;

        try {
            const campos = [];
            const valores = [];

            //verificar quais campos foram fornecidos
            if (nome !== undefined) {
                campos.push(`nome = $${valores.length + 1}`) //
                valores.push(nome);
            }
            if (tipo_transacao !== undefined) {
                campos.push(`tipo_transacao = $${valores.length + 1}`)
                valores.push(tipo_transacao);
            }
            if (gasto_fixo !== undefined) {
                campos.push(`gasto_fixo = $${valores.length + 1}`)
                valores.push(gasto_fixo);
            }
            if (campos.length === 0) {
                return res.status(400).json({ message: 'Nenhum campo fornecido para atualizar' })
            }

            //Adicionar o id ao final de valores
            valores.push(id_categoria)

            //Montamos a query dinamicamente
            const query = `UPDATE categorias SET ${campos.join(', ')} WHERE id_categoria = ${id_categoria} RETURNING *`
            //Executando nossa query
            const categorias = await BD.query(query, valores)
            //Verifica se o categorias foi atualizando
            if (categorias.rows.length === 0) {
                return res.status(404).json({ message: 'Categorias não encontrado' })
            }

            return res.status(200).json(categorias.rows[0])
        } catch (error) {
            res.status(500).json({
                message:
                    'Erro ao atualizar as categorias', error: error.message
            })
        }
    }

    static async atualizarTodosCampos(req, res) {
        const { id_categoria } = req.params;
        const { nome, tipo_transacao, gasto_fixo } = req.body
        try {
            const categoria = await BD.query('UPDATE categorias SET nome = $1, tipo_transacao = $2, gasto_fixo = $3  WHERE id_categoria = $4 RETURNING *', [nome, tipo_transacao, gasto_fixo, id_categoria])
            res.status(200).json(categoria.rows[0])
        } catch (error) {
            res.status(500).json({
                message:
                    'Erro ao atualizar as categorias', error: error.message
            })
        }

    }

    static async desativar(req, res) {
        const { id_categoria } = req.params;
        try {
            const categoria = await db.query(
                'UPDATE categorias SET ativo = FALSE WHERE id_categoria = $1 RETURNING *',
                [id_categoria]);
            res.json({ mensagem: 'Categoria desativado com sucesso.', categoria: categoria.rows[0] });
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao desativar a categoria.' });
        }
    };
}
export default rotasCategorias