import { application, response } from "express";
import swaggerJSDoc from "swagger-jsdoc"

const swaggerDefinition = {
    openapi: '3.0.4',
    info: {
        title: 'API do Gestor Financeiro Pessoal',
        version: '1.0.0',
        description: `API para gerenciamento financeiro pessoal desenvolvida no curso Técnico de Desenvolvimento de Sistemas do SENAI`
    },
    servers: [
        {
            url: 'http://localhost:3000/',
            description: 'Servidor Local'
        },
        {
            url: 'http://192.168.0.237:3000/',
            description: 'Servidor do API do Douglas'
        }
    ],
    tags: [
        {
            name: 'Usuarios',
            description: 'Rotas para cadastro, login, atualização e desativação de usuários'
        },
        {
            name: 'Categorias',
            description: 'Rotas para cadastro, leitura, atualização e desativação de categorias'
        }
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    paths: {
        '/usuarios': {
            post: {
                tags: ['Usuarios'],
                summary: 'Cadastrar novo usuário',
                description: 'Método utilizado para cadastrar novos usuários',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nome', 'email', 'senha', 'tipo_acesso'],
                                properties: {
                                    nome: { type: 'string', example: 'Nathalia Rafaely' },
                                    email: { type: 'string', example: 'nathy08@gmail.com' },
                                    senha: { type: 'string', example: '123' },
                                    tipo_acesso: { type: 'string', example: 'admin' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Usuário cadastrado com sucesso'
                    },
                    '400': {
                        description: 'Erro ao cadastrar usuário'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
            get: {
                tags: ['Usuarios'],
                summary: 'Listar todos os usuários',
                description: 'Método utilizado para listar todos os usuários cadastrados',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Lista de usuários',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id_usuario: { type: 'integer', example: 1 },
                                            nome: { type: 'string', example: 'João Silva' },
                                            email: { type: 'string', example: 'joao@example.com' },
                                            senha: { type: 'string', example: '123' },
                                            tipo_acesso: { type: 'string', example: 'adm' },
                                            ativo: { type: 'boolean', example: true },
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
        },
        '/usuarios/{id_usuario}':{
            delete:{
                tags: ['Usuarios'],
                summary: 'Desativar usuario',
                description: 'Rota para desativar usuario',
                security: [
                    {
                        bearerAuth: [],
                    }
                ],
                parameters: [
                    {
                        name: 'id_usuario',
                        in: 'path', // caso queira passar como query in:'query
                        required: true,
                        schema:{
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200':{description: 'Usuario desativado com sucesso'},
                    '500':{description: 'Erro ao desativar usuario'}
                }
            }
        },
        '/usuarios/login': {
            post: {
                tags: ['Usuarios'],
                summary: 'Login do usuário',
                description: 'Método utilizado para efetuar o login do usuário e gerar o token',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'senha'],
                                properties: {
                                    email: { type: 'string', example: 'teste@teste.com' },
                                    senha: { type: 'string', example: '123' },
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Usuário encontrado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            token: { type: 'string', example: 'jkdnaskjdbaskjndlaksnmmlmcaj21lekn1lkn213n12jb3kj 21' },
                                            id_usuario: { type: 'integer', example: 1 },
                                            nome: { type: 'string', example: 'João Silva' },
                                            email: { type: 'string', example: 'joao@example.com' },
                                            senha: { type: 'string', example: '123' },
                                            tipo_acesso: { type: 'string', example: 'adm' },
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Erro ao encontrar usuário'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },

        },
        '/categorias':{
            post: {
                tags: ['Categorias'],
                summary: 'Nova Categoria',
                description: 'Rota para cadastrar nova categoria',
                security: [
                    {
                        bearerAuth: [],
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nome', 'tipo_transacao', 'gasto_fixo', 'id_usuario'],
                                properties:{
                                    nome: {type: 'string', example: 'Alimentação'},
                                    tipo_transacao: {type: 'string', example: 'ENTRADA OU SAIDA'},
                                    gasto_fixo:{type:'boolean', example: true},
                                    id_usuario: {type: 'integer', example: 1},
                                    cor: {type: 'string', example: '#fff'},
                                    icone: {type: 'string', example: 'save'}
                                }
                            }
                        }
                    }
                },
                responses:{
                    '200':{
                        description: 'Categoria cadastrada'
                    },
                    '400':{
                        description: 'Erro ao cadastrar categoria'
                    },
                    '500':{
                        description: 'Erro interno do servidor'
                    }
                }
            },
            get: {
            tags: ['Categorias'],
                summary: 'Listar todas as categorias',
                description: 'Método utilizado para listar todos os categorias cadastrados',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Lista de categorias',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id_categoria: { type: 'integer', example: 1 },
                                            nome: { type: 'string', example: 'Alimentação' },
                                            tipo_transacao: {type: 'string', example: 'ENTRADA OU SAIDA'},
                                            gasto_fixo: { type: 'boolean', example: true },
                                            ativo: { type: 'boolean', example: true },
                                            id_usuario: { type: 'integer', example: 2 },
                                            cor: { type: 'string', example: 'blue' },
                                            icone: { type: 'string', example: 'save' },
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
            },
        '/categorias/{id_categoria}':{
            delete:{
                tags: ['Categorias'],
                summary: 'Desativar categoria',
                description: 'Rota para desativar categoria',
                security: [
                    {
                        bearerAuth: [],
                    }
                ],
                parameters: [
                    {
                        name: 'id_usuario',
                        in: 'path', // caso queira passar como query in:'query
                        required: true,
                        schema:{
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200':{description: 'Usuario desativado com sucesso'},
                    '500':{description: 'Erro ao desativar usuario'}
                }
            }
        },
       
    }
}

const options = {
    swaggerDefinition,
    apis: [] //
}

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
