

async function fetchAndDisplayToDoDetails(){
const todoList=document.getElementById('todoListPend');
const finishList=document.getElementById('todoListComp');
try{
const response =await axios.get('https://crudcrud.com/api/716ce7a983bf43bca3634e98c185f271/todoData');
if(response.status!==200)
    {
        throw new Error('failed to fetch data');
    }
    const todos=response.data;
    todoList.innerHTML='';
    finishList.innerHTML='';
    todos.forEach(todo => {
        const listItem=document.createElement('li');
        listItem.textContent=`${todo.name}:${todo.desc}`;
        listItem.classList='list-group-item'
        if(todo.status=== false){
            const deletebutton=document.createElement('button');// create delete button
            deletebutton.classList='btn btn-danger btn-sm float-right';
            deletebutton.textContent='delete';
            deletebutton.addEventListener('click',()=>deleteTodo(todo._id));

            const finishbutton = document.createElement('button');// create finish button
            finishbutton.classList='btn btn-success btn-sm float-right';
            finishbutton.textContent='Finished';
            finishbutton.addEventListener('click',()=>markFinished(todo._id,todo.name,todo.desc));

            listItem.appendChild(finishbutton);
            listItem.appendChild(deletebutton);
            todoList.appendChild(listItem);
        }
        else{
            const deletebutton=document.createElement('button');// create delete button
            deletebutton.classList='btn btn-danger btn-sm float-right';
            deletebutton.textContent='delete';
            deletebutton.addEventListener('click',()=>deletetodo(todo._id));  
            listItem.appendChild(deletebutton);
            finishList.appendChild(listItem);
        }
        
    });

}catch(error){
    console.log('error fetching data:',error);

}    
}
 async function deletetodo(todoId){
    try{
        await axios.delete(`https://crudcrud.com/api/716ce7a983bf43bca3634e98c185f271/todoData/${todoId}`);
        fetchAndDisplayToDoDetails();
}
    catch(error)
    {
        console.log('error deleting todo:',error);
    }
 }
 async function markFinished(todoId,todoName,todoDesc){
    try{
        const todostatus=true
        await axios.put(`https://crudcrud.com/api/716ce7a983bf43bca3634e98c185f271/todoData/${todoId}`,{name:todoName, desc:todoDesc, staus:todostatus});
        fetchAndDisplayToDoDetails();
}
    catch(error)
    {
        console.log('error marking finished todo:',error);
    }
 }
 document.getElementById('my-form').addEventListener('submit', async function(e)
 {
e.preventDefault();
   const name=document.getElementById('todoname').value;
const desc=document.getElementById('tododesc').value;
const status=false
try{
    await axios.post('https://crudcrud.com/api/716ce7a983bf43bca3634e98c185f271/todoData',{name:name , desc:desc , status:status});
    fetchAndDisplayToDoDetails();
    document.getElementById('todoname').value='';
    document.getElementById('tododesc').value='';
}
catch(error){
    console.log('error submitting data:',error);
}
 });
 window,addEventListener('load',fetchAndDisplayToDoDetails);