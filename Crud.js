import React,{useState} from 'react'

const Crud = () => {
  const [data, setData] = useState({name:"",email:"",address:""});
  const [allData,setAllData]=useState([])
  const[editIndex,setEditIndex]=useState(null)  //for update/edit editline need this

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setData((prevData) => ({  ...prevData,  [name]: value })) 
    //agr ...prevData na hoga to last input  jo b fill krenge usse phle ke sare filled inputs empty show honge inspect>component
    // [name]: value > without it , can't type
  }

  const handleSubmit=(e)=>{
    e.preventDefault(); //refresh hone se bchayega

    if(data.name.length!==0 && data.email.length!==0 && data.address.length!==0){
     
      if(editIndex!==null){
         // If editIndex is not null, update the existing item
         const updatedData = [...allData]; //used to make changes without directly modifying the original allData array.
         updatedData[editIndex] = { ...data, id: allData[editIndex].id };
         //This line updates the item at the 'editIndex' position in the 'updatedData' array. It creates a new object with the updated data '(...data)' and ensures that the id remains the same as the original item's id.
         setAllData(updatedData);  //updating the item in the component's state
         setEditIndex(null); // Clear the editIndex after updating
      }
      else{
        //add a item 
        setAllData(prevD=>[...prevD,{id:new Date().getTime().toString(),...data}]) 
        //...pervD previous data ko gyab nhi hone dege jo enter ho chuka,...data se naya data b isme jud jata h unique id k sath
      }
     
      setData({name:"",email:"",address:""}) //fields empty
    }
  }

  const handleEdit=(id)=>{
    const index = allData.findIndex((item) => item.id === id);
    //if item.id === id true ,findIndex will return the index of that element in the array, (which will be a non-negative integer) indicating the position of the element in the AllData array.
    //if false , findIndex will return -1 
    if (index !== -1){
      const itemToEdit = allData[index];  //us index number pe allData ka value/obj
      setData({ name: itemToEdit.name, email: itemToEdit.email, address: itemToEdit.address }); //ise hum us itemToEdit s aaya data edit kr skte hai
      setEditIndex(index); 
      //to update the state variable editIndex with the index of the item being edited in the allData array. and after if editIndex is not equal to null
    }
  }

  const handleDelete =(id)=>{    //curElem=id
    const deleteData = allData.filter((item) => item.id !== id);
  //item.id filter ko btayga alldataArray m konsi id delete krni h ,
  // item.id !== id agar 'true'/notEqual hui to not deleted ,agar 'false'/equal hui to allData se vo deleted
  // filter method mein callbackfun item k liy false lotata hai to phir vo item allData array se bahar ho jayga mtln delete
  setAllData(deleteData)
  }


  return (
    <>
     <form action='' onSubmit={handleSubmit}>
       <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' value={data.name} onChange={handleChange} />
       <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' value={data.email} onChange={handleChange} />
        <label htmlFor='address'>address</label>
        <textarea type='text' name='address' id='address' value={data.address} onChange={handleChange} />

        <button type='submit'>{editIndex !== null ? 'Update' : 'Add'}</button>
     </form>

     <ul>
     {
          allData.map((curElem) => {
            return (
              <li key={curElem.id}>
                {curElem.name}<br />{curElem.email}<br />{curElem.address}
                <button onClick={() => { handleDelete(curElem.id) }}>Delete</button>
                <button onClick={() => { handleEdit(curElem.id) }}>Edit</button>
              </li>
            )
          })
        }
     </ul>
    </>
  )
}

export default Crud