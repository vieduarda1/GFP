import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Principal(){
    const [usuario, setUsuario] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        const buscarUsuario = async () =>{
            const UsuarioLogado = await localStorage.getItem('UsuarioLogado')
        if(UsuarioLogado) {
            setUsuario(JSON.parse(UsuarioLogado));
        }else {
            navigate('/')
        }
    };
    buscarUsuario();
    }, [])
    const botaoLogout =() =>{
        try{
            localStorage.removeItem('UsuarioLogado');
            navigate('/')
        }catch (error){
            console.log('Erro ao desloga:', error);
            
        }
    }
    return(
        <div>
            <div style={{display:'flex',flexDirection:'row',
                justifyContent: 'space-between', alignItems: 'center'
            }}>
                <p>Usuario: {usuario.nome}</p>
                <button onClick={botaoLogout}>Sair</button>
            </div>
            <div style={{padding: '20px'}}></div>
             <h1>Tela Principal</h1>
        </div>
      

    )
}