import { useNavigate } from "react-router-dom"
import React from "react";
import { Router, useState } from "react";
export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');


    async function botaoEntrar(e) {
        e.preventDefault();

        try {
            if (email == '' || senha == '') {
                throw new Error('Preencha todos os campos')
            }
            //Autenticando utlizando a aAPI  de backend com fetch 
            const resposta = await fetch(`${enderecoServidor}/usuarios/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'applicantion/json' },
                    body: JSON.stringify({
                        email: email,
                        senha: senha
                    })

                }
            )
            if (resposta.ok) {
                const dados = await resposta.json();
                setMensagem(`Login bem sucedido!`)
                localStorage.setItem('UsuarioLogado', JSON.stringify(dados))
            } else {
                setMensagem('Email ou senha incorretos ❌')
                throw new Error('Email ou senha incorretos ❌')
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error)
            alert(error.mensage);
            return;
        }
    }

    function botaoLimpar() {
        setEmail('');
        setSenha('');
        setMensagem('');
    }
    return (
        <div style={estilos.container}>
            <img style={{height: '100px'}} src= 'https://upload.wikimedia.org/wikipedia/commons/8/8c/SENAI_S%C3%A3o_Paulo_logo.png' alt="Logo SENAI" className="logo" />
            <h1 style={{color:'#DDA0DD', fontFamily: 'cursive'}}> Tela de Login </h1>
            <h2 style={{fontFamily:'inherit', color:'#DA70D6'}}>Bem-Vindo de Volta!</h2>
            <label style={{color:'#8B008B'}}>Acesse para continuar</label>

            <input style={{display:'flex', marginTop:'5px', height: '40px', width: '30%', borderRadius: '10px', marginTop: '20px'}} type="email" placeholder="digite seu email"
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
                <div className="input-group"></div>
                
            <input style={{height: '40px', marginTop: '10px', width: '30%', borderRadius: '10px'}} type="password" placeholder="digite sua senha"
                onChange={(e) => setSenha(e.target.value)}
                value={senha} />
            <div style={estilos.containerbotoes}>           
                <button style={estilos.botoes} onClick={() => navigate("/principal")}>Entrar</button>
            </div>

        </div>
    )
}

const estilos = {
    botoes : {
        alignItems: 'center',
        backgroundColor: "	#EE82EE",
        padding: '20px',
        gap: '10px',
        borderRadius: '10px',
        width: '150px'

    },
    containerbotoes: {
        padding: '30px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        padding: '20px',
        margin: 'auto'
    }
}