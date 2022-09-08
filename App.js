import  React from 'react';
import {Text,TouchableOpacity,StyleSheet} from 'react-native';


//importamos de la biblioteca @react-navigation/native
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const Stack = createStackNavigator()

//importamos paginas de la carpeta screens
import HomeScreen from './screens/HomeScreen';
import TaskFormScreen from './screens/TaskFormScreen';

const App = () =>{
    
    return(
      <NavigationContainer>

      <Stack.Navigator>
      
      <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={({navigation})=>({
        headerStyle:{backgroundColor:'#222f3e'},
        headerTitleStyle:{color:'#ffffff'},
        headerRight: () =>(
          <TouchableOpacity onPress={()=> navigation.navigate("Form")}>
              <Text 
               style={styles.buttonSave}
              >
                Create New Task
                </Text>
          </TouchableOpacity>
          
        )
    })}
      />
      <Stack.Screen 
      name="Form" 
      component={TaskFormScreen}
      options={{
        title: 'Create a Task',
        headerStyle:{backgroundColor:'#222f3e'},
        headerTitleStyle:{color:'#ffffff'},
        headerTintColor:'#ffffff',
      }}
      />
      
  
        

      </Stack.Navigator>

      </NavigationContainer>
    )
  


};
const styles = StyleSheet.create({
  buttonSave: {
    paddingTop: 5,
    paddingBottom:5,
    paddingRight:5,
    paddingLeft:5,
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "green",
    width: "40%",
    color:'#fff',
    marginRight:20,
    fontSize:15
  },
})

export default App;