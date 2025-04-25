import {useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
// import * as Animar from 'react-native-animatable'
import { enderecoServidor } from '../utils'; // Importando o endereço do servidor


//Recebemos como props o navigation, para podermos navegar entre as telas
const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    //  async function botaoEntrar() {
    //       try{
    //         if (email =='' || senha ==''){
    //           throw new Error('Preencha todos os campos')
    //         }
    //         //Autenticando utlizando a aAPI  de backend com fetch 
    //         const resposta = await fetch (`${enderecoServidor}/usuarios/login`,
    //           {
    //           method: 'POST',
    //           headers: {'Content-Type': 'applicantion/json'},
    //           body: JSON.stringify({
    //               email: email,
    //               senha: senha
    //         })
    //       }          
    //     )        
    //     if (resposta.ok){
    //       const dados = await resposta.json();
    //       AsyncStorage.setItem('UsuarioLogado', JSON.stringify(dados))
    //       navigation.navigate('MenuDrawer')
    //     }else{
    //         throw new Error('Email ou senha incorretos ❌');
    //     }
    //       }catch (error) {
    //         console.error('Erro ao realizar login:', error)
    //         alert(error.mensage);           
    //         console.log(dados); 
    //         return;
    //       }
    //   }
    const botaoEntrar = async () => {
        try {
          if (email === "" || senha === "") {
            throw new Error("Preencha todos os campos");
          }
          //autenticando utilizando a API de backend com o fetch e recebendo o token
          const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              senha: senha,
            }),
          });
          const dados = await resposta.json();
    
          if (resposta.ok) {
            console.log("Login bem-sucedido:", dados);
            // Aqui você pode armazenar o token em um estado global ou AsyncStorage, se necessário
            AsyncStorage.setItem("UsuarioLogado", JSON.stringify(dados));
            navigation.navigate("MenuDrawer");
          } else {
            throw new Error(dados.message || "Erro ao fazer login");
          }
        } catch (error) {
          console.error("Erro ao realizar login:", error);
          alert(error.message);
          return;
        }
      };
    
    return (
        <View style={styles.conteudoHeader}>
            <View style={styles.header} >
                <Image source={require('../../assets/icon.png')}
                        style={styles.logo}
                        resizeMode="contain" />
                <Text style={styles.headerText}>Bem-vindo(a) </Text>
            </View>
            <View style={styles.conteudoCorpo}>

                <Text style={styles.label}> Email:</Text>
                <TextInput 
                    placeholder="Digite um email..." 
                    style={styles.inputLogin} 
                    onChangeText={setEmail}
                    value={email}
                    />
                <Text style={styles.label}> Senha:</Text>
                <TextInput 
                    placeholder="Digite sua senha" 
                    style={styles.inputLogin} 
                    secureTextEntry={true} 
                    onChangeText={setSenha}
                    value={senha}
                    />
                <TouchableOpacity style={styles.botao}
                    onPress={botaoEntrar}>
                    <Text style={styles.textoBotao}> Acessar </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao}
                    onPress={() => navigation.navigate('MenuTopTab')}>
                    <Text style={styles.textoBotao}> Top Tabs </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao}
                    onPress={() => navigation.navigate('MenuBottomTab')}>
                    <Text style={styles.textoBotao}> Bottom Tabs </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login


const corPrincipal = '#0055ff'
const corBranco = '#fff'


const styles = StyleSheet.create({
    conteudoHeader: {
        flex: 1,
        backgroundColor: corPrincipal
    },
    header: {
        flex: 1,
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: corBranco
    },
    conteudoCorpo: {
        flex: 2,
        backgroundColor: corBranco,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: '5%',
        paddingTop: '2%',
    },
    logo : {
        width: 30, 
        height: 30, 
        marginRight: 20
    },
    label: {
        fontSize: 20,
        marginTop: 28
    },
    inputLogin: {
        borderBottomWidth: 1,
        height: 40,
        fontSize: 16
    },
    botao: {
        backgroundColor: corPrincipal,
        borderRadius: 4,
        paddingVertical: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        borderColor: corBranco,
        borderWidth: 2
    },
    textoBotao: {
        fontSize: 18,
        color: corBranco,
        fontWeight: 'bold'
    },
})



// import {View, Text, Button} from 'react-native';

// //Recebemos como props o navigation para navegar entre as telas
// const Login = ({navigation}) => {
//     return (
//         <View style={{flex:1, backgroundColor:'#d5edb9', justifyContent:'center', alignItems:'center'}}>
//             <Button title="Entrar Drawer" onPress={() => navigation.navigate('MenuPrincipal')}/>
//             <Button title="Entrar Top Tab" onPress={() => navigation.navigate('MenuTopTab')}/>
//             <Button title="Entrar Bottom Tab" onPress={() => navigation.navigate('MenuBottomTab')}/>
//         </View>
//     )
// }

// export default Login;

    


//     return (
//         <View>
//             <Text>Login</Text>
//             <Button title="Entrar"
//             onPress={() => navigation.navigate('MenuDrawer')}/>
//         </View>
//     )
// }