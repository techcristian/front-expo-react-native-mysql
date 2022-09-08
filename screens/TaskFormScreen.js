import React,{useEffect, useState} from 'react'
import Layout from '../components/Layout'
import { Text,TextInput,StyleSheet,TouchableOpacity } from 'react-native'

import {saveTask,getTask, updateTask} from '../api'

const TaskFormScreen = ({navigation,route}) => {

  const [task,setTask] = useState({
    title:"",
    description:"",
  });

  const [editing,setEditing]= useState(false)

  


const handleSubmit = async() =>{
 try {
  if(!editing) {
    await saveTask(task)//en caso de no traer id es false el estado de editing
   }else {
    await updateTask(route.params.id,task)//en caso de traer id ,es true el estado de editing
   }
  navigation.navigate("Home") //si es crear o editar navega luego al Home
 } catch (error) {
  console.log(error)
 }
};

const handleChange = (name,value) => setTask({...task,[name]:value});

useEffect(()=>{
  //valido si el cunado carga el componente la props route existe y a su vez contiene un objeto con un parametro(porque puede ser que contenga un objeto indefinido vacio,y si existe empiezo a actualizar el formulario de actualizacion)
  if(route.params && route.params.id) {
    setEditing(true)//cuando caraga el componente cambiamos el estado de editing a true y validamos en el handleSubmit,porque trae id
    navigation.setOptions({headerTitle:"Updating a Task"});//el metodo setOptions nos permite editar el header del componente.
  
    (async()=>{
      const task = await getTask(route.params.id) //cuando caraga el componente y si trae un id, caraga una unica tarea desde el backend con getTask.
      setTask({title:task.title, description: task.description});// establezco en el estado lo traido desde getTask para mostrar en el formulario de actualizacion.
    })();
    
  }

},[]);
  return (
    <Layout>
      <TextInput
      style={styles.input}
      placeholder="write a title"
      placeholderText="#576574"
      onChangeText={(text)=> handleChange("title",text)}
      value={task.title}
      />
      <TextInput 
      style={styles.input}
      placeholder="write a description"
      placeholderText="#576574"
      onChangeText={(text) => handleChange("description",text)}
      value={task.description}
      />
      
       {
        !editing ? (
          <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit} >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        ):(
          <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit} >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        )
       }
         
       
      
   
    </Layout>
  )
}
const styles = StyleSheet.create({
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 30,
    color: "#ffffff",
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#10ac84",
    width: "90%",
  },
  buttonUpdate: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#e58e26",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },



})


export default TaskFormScreen;