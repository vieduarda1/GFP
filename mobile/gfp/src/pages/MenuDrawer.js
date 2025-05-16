import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from "./Principal";
import Contas from "./Contas.js";

const Drawer = createDrawerNavigator();

export default function MenuDrawer(){
    return(
        <Drawer.Navigator
        //estilizando as barras de navegaçao do Drawer
        screenOptions={{
            headerStyle:{
                backgroundColor: '#A0522D',
                elevation: 0
            },
            headerTintColor:'#fff'
        }}
        >
            <Drawer.Screen name="Principal" component={Principal} />
            <Drawer.Screen name="Contas" component={Contas} />
        </Drawer.Navigator>
    )
}