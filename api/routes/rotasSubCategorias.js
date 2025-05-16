import { BD } from '../db.js'


class rotasSubCategorias {
    static async novoSubCategoria(req, res) {
        const { nome, gasto_fixo, id_usuario } = req.body;

        try {
            const categoria = await BD.query(`
                    INSERT INTO categorias(nome, gasto_fixo,id_usuario)
                    VALUES($1, $2, $3,) RETURNING *`,
                [nome, gasto_fixo, id_usuario])

            res.status(201).json("subCategoria Cadastrada com sucesso✔")
        } catch (error) {
            console.error('Erro ao criar subcategoria', error);
            res.status(500).json({ message: 'Erro ao criar', error: error.message })
        }
    }

    //filtrar por tipo de categoria
    static async filtrarSubCategoria(req, res) {
        const { id_categoria } = req.query;
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
            const SubCategorias = await BD.query('SELECT * FROM SubCategorias');
            res.status(200).json(SubCategorias.rows);
        } catch (error) {
            res.status(500).json({
                message:
                    'Erro ao listar as categorias', error: error.message
            })
        }
    }
    static async consultarPorId(req, res) {
        const { id_SubCategoria } = req.params;
        try {
            const SubCategorias = await BD.query('SELECT * FROM SubCategorias WHERE id_subcategoria = $1', [id_SubCategoria])
            res.status(200).json(SubCategorias.rows[0])
        } catch (error) {
            res.status(500).json({
                message:
                    'Erro ao consultar as categorias', error: error.message
            })
        }
    }

    static async atualizar(req, res) {
        const { id_subcategoria } = req.params;
        const { nome, gasto_fixo } = req.body;

        try {
            const campos = [];
            const valores = [];

            //verificar quais campos foram fornecidos
            if (nome !== undefined) {
                campos.push(`nome = $${valores.length + 1}`) //
                valores.push(nome);
            }
            
            if (gasto_fixo !== undefined) {
                campos.push(`gasto_fixo = $${valores.length + 1}`)
                valores.push(gasto_fixo);
            }
            if (campos.length === 0) {
                return res.status(400).json({ message: 'Nenhum campo fornecido para atualizar' })
            }

            //Adicionar o id ao final de valores
            valores.push(id_subcategoria)

            //Montamos a query dinamicamente
            const query = `UPDATE subcategorias SET ${campos.join(', ')} WHERE id_subcategoria = ${id_subcategoria} RETURNING *`
            //Executando nossa query
            const subcategorias = await BD.query(query, valores)
            //Verifica se o categorias foi atualizando
            if (subcategorias.rows.length === 0) {
                return res.status(404).json({ message: 'subCategoria não encontrado' })
            }

            return res.status(200).json(subcategorias.rows[0])
        } catch (error) {
            res.status(500).json({
                message:
                    'Erro ao atualizar as subcategorias', error: error.message
            })
        }
    }

    static async atualizarTodosCampos(req, res) {
        const { id_subcategoria } = req.params;
        const { nome, gasto_fixo } = req.body
        try {
            const subcategoria = await BD.query('UPDATE subcategorias SET nome = $1, gasto_fixo = $3  WHERE id_subcategoria = $3 RETURNING *', [nome, gasto_fixo, id_subcategoria])
            res.status(200).json(subcategoria.rows[0])
        } catch (error) {
            res.status(500).json({
                message:
                    'Erro ao atualizar as subcategorias', error: error.message
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
export default rotasSubCategorias