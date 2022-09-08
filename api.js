const API = 'http://10.0.2.2:3000/tasks'


export const getTasks = async() => {
  const res = await fetch(API)
  return await res.json()
}

export const saveTask = async(newTask) =>{
  const res = await fetch(API,{
    method:"POST",headers:{Accept:"application/json", "Content-Type":"application/json"},
    body:JSON.stringify(newTask)
  });
  return await res.json();

};

export const deleteTask = async(id) =>{
  await fetch(`${API}/${id}`,{method:"DELETE"})
} 

//obtengo primero una unica tarea para despues actualizar
export const getTask = async (id) =>{
  const res = await fetch(`${API}/${id}`)
  return await res.json();
}

//actualizar tarea
export const updateTask = async (id,newTask) =>{
 const res= await fetch(`${API}/${id}`,{
    method:"PUT",headers:{Accept:"application/json", "Content-Type":"application/json"},
    body:JSON.stringify(newTask)
  })
  return res;
}
