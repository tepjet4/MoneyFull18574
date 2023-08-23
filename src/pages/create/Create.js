import { useState, useRef, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'
import { useHistory } from 'react-router-dom'  
import { ToastContainer, toast } from 'react-toastify';
// styles
import './Create.css'

export default function Create() {  
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
   
  const history = useHistory()
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(title, method)
    
    let comment = method
    const doc = { title, comment }
    try {
      await projectFirestore.collection('versions').add(doc)
      toast.success('Version added!');
      //history.push('/')
      history.push("/version");
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="create">
      <h2 className="page-title">Add a New Version</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Version title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        {/* recipe ingredients here */}

        <label>
          <span>Version Comment:</span>
          <textarea rows={18} cols={50}
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>       

        <button className="btn">Submit</button>
      </form>
    </div>
  )
}