import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from "./Principal";
import Contas from "./Contas.js";
import CadContas from "./CadContas.js";
import { corSecundaria } from "../styles/Estilos.js";
import Categorias from "./Categorias.js";

const Drawer = createDrawerNavigator();

export default function MenuDrawer(){
    return(
        <Drawer.Navigator
        //estilizando as barras de navegaçao do Drawer
        screenOptions={{
            headerStyle:{
                backgroundColor: corSecundaria,
                elevation: 0
            },
            headerTintColor:'#fff'
        }}
        >
            <Drawer.Screen name="Principal" component={Principal} />
            <Drawer.Screen name="Contas" component={Contas}/>
            <Drawer.Screen name="Categorias" component={Categorias}/>
         
        </Drawer.Navigator>
    )
}