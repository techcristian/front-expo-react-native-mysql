import { View, FlatList,StyleSheet, RefreshControl } from 'react-native'
import React, {useState,useEffect}from 'react'
import TaskItem from './TaskItem'
import {deleteTask, getTasks} from '../api';
 import {useIsFocused} from '@react-navigation/native' 

const TaskList = () => {

  const [refreshing,setRefreshing] = useState(false)
  const [tasks,setTasks] = useState([]);
  const isFocused = useIsFocused();

  const getUsers = async () => {
    try {
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getUsers();
  },[isFocused])

  const onRefresh = React.useCallback(async()=>{
    setRefreshing(true)
    await getUsers()
    setRefreshing(false)
  },[]);

  const handleDelete = async(id)=>{
    await deleteTask(id);
    await getUsers();
  };
  
const renderItems =   ({item})=>{
   
    return <TaskItem task={item} handleDelete={handleDelete}/>
      }

    

  return (
    <View>
       <FlatList 
         style={styles.flatList}
          data={tasks}
           renderItem={renderItems}
           refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#78e08f"]}
            progressBackgroundColor="#0a3d62"
            />
           }
           
          />
      
    </View>
  )
}
const styles = StyleSheet.create({
 
  flatList:{
    width: '100%'
  }
})

export default TaskList

