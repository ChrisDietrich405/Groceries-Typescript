import React, { useState, useEffect } from 'react'
import { IAlert } from './model';
import { IList } from './model';
import { IListFunc } from './model';

import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem("list")
  if(list) {
    return JSON.parse(list)
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState<string>('');
  const [list, setList] = useState<IList[]>(getLocalStorage);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editID, setEditID] = useState<number | null>(null);
  const [alert, setAlert] = useState<IAlert>({ show: false, msg: '', type: '' });
  
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault()
     if(!name) {
     showAlert(true, "add item", "danger")
     } else if(name && isEditing) {
      const updatedItems = list.map((item) => {
        if(item.id === editID) {
          return { ...item, title: name }
        } else {
          return item
        }
      })
      setList(updatedItems)
      setEditID(null) 
     } else {
      showAlert(true, "item successfully added", "success")
      const newItem = {id: new Date().getTime(), title: name}
      setList([...list, newItem])
      setName("")
     }
  };

  const showAlert = (show=false, msg="", type="") => {
    setAlert({show, msg, type})
  }

  const clearList = () => {
    setList([])
  }

  const deleteItem = (id: number) => {
    const updatedItems = list.filter((item) => item.id !== id)
    setList(updatedItems)
  }

  const editItem = (id: number) => {
    const specificItem = list.find((item) => item.id === id)
    if(specificItem) {
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
    }
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  return ( 
  
  <section className="section-center">
    <form onSubmit={handleFormSubmit} className="grocery-form">
      {alert.show && <Alert {...alert} removeAlert={showAlert}/> }
      <h3>grocery bud</h3>
      <div className="form-control">
        <input type="text" placeholder="cereal" className="grocery"
        value={name} onChange={(e) => setName(e.target.value  ?? "")}
        />
        <button type="submit" className="submit-btn">
          {isEditing ? "edit" : "add"}
        </button>
      </div>
    </form>
    {list.length > 0 ? ( <div className="grocery-container">
      <List items={list} deleteItem={deleteItem} editItem={editItem}/>
      <button onClick={clearList} className="clear-btn">
        clear items
      </button>
    </div>) : ("NO GROCERIES")}
   
  </section>
  )
}

export default App