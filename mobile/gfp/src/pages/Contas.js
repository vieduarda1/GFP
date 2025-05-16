import React, { useState, useEffect, useLayoutEffect} from 'react';
import  {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos, { corPrincipal } from '../styles/Estilos';
import {enderecoServidor} from '../utils';

export default function Contas({navigation}) {
    const [dadosLista, setDadosLista] = useState([]);
    const [usuario, setUsuario] = useState([]);

    const buscarDadosAPI = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/contas`,{
                method: 'GET',
                headers: {
                    'Autorization': `Bearer${usuario.token}`
                }
            });
            const dados = await resposta.json();
            setDadosLista(dados);
            console.log('dados', dados);
            
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }
    useEffect(() => {
        buscarUsuarioLogado()
        ;
    }, [])

     useEffect(() => {
        buscarDadosAPI()
    }, [usuario])

          const UsuarioLogado = async () =>{
        const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
            if(UsuarioLogado){
                setUsuario(JSON.parse(UsuarioLogado));
            } else {
                navigation.nagate('Login')
            }
        }
    const botaoLogout =() =>{
        AsyncStorage.removeItem('UsuarioLogado');
        navigation.navigate('Login');
    }

    const botaoExcluir = async (id) = () =>{
        try{
            const resposta = await.fetch(`${enderecoServidor}/contas/${id}`,{
                method: 'DELETE',
                headers: {
                    'Autorization': `Bearer${usuario.token}`
                }
            });

        }catch(error){
            console.error('Erro ao excluir:',error)
        }
    }



    const exibirItemLista = ({item}) => {
        return (
            <TouchableOpacity style={Estilos.itemLista}>
                <Image source={require('../assets/logo.png')} 
                    style={Estilos.imagemLista} />
                <View style={Estilos.textContainer}>
                    <Text>{item.tipo_conta}</Text>
                    <Text style={Estilos.nomeLista}>{item.nome}</Text>
                </View>
                <MaterialIcons name='edit' size={24} color={corPrincipal} />
                <MaterialIcons name='delete' size={24} color={corPrincipal} 
                onPress={() => botaoExcluir (item.id_conta)}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={Estilos.conteudoHeader}>
            <View style={Estilos.conteudoCorpo}>
                <Text>Contas</Text>
                <FlatList 
                    data={dadosLista}
                    renderItem={exibirItemLista}
                    keyExtractor={(item) => item.id_conta}
                />
            </View>
        </View>
    )
}