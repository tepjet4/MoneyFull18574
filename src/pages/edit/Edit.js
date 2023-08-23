import { useParams } from 'react-router-dom'
import styles from './Edit.module.css'
import React, { version } from 'react'
import { useState, useEffect } from 'react'
import updateDocument, { useFirestore } from '../../hooks/useFirestore.js'
import { useHistory } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'

export default function Edit() {
  const { id } = useParams()  
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')  
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null) 
  const { updateDocument, response } = useFirestore('versions') 
  const history = useHistory();

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(title, comment) 
    await updateDocument(id, {
      title: title,
      comment:comment
    })
    if (!response.error){
      console.log('Update has been done.')
      history.push(`/version/`)
    }   
  }   
  
  useEffect(() => {
      setIsPending(true)  
      projectFirestore.collection('versions').doc(id).get().then(doc=> {
        if (doc.exists) {
          setIsPending(false)
          console.log('Test: ' + doc.data().title)
          setTitle(doc.data().title)   
          setComment(doc.data().comment)     
       
        } else {
          setIsPending(false)
          setError(`Could not find that application version controls`) 
        }       
      })  
}, [id])
    
    return (
        <form onSubmit={handleSubmit} className={styles['signup-form']}>
        <h2>Version Edit</h2>
        <label>
          <span>Title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
          />
        </label>
        <label>
          <span>Comment:</span>
          <textarea rows={12} cols={49}
            onChange={(e) => setComment(e.target.value)} 
            value={comment} 
          />
        </label>
        
        { !isPending && <button className="btn">Submit</button> }
        { isPending && <button className="btn" disabled>Loading...</button> }
         <br /> <br />
        { error && <p className='apperror'>{error}</p> }
      </form>
    )
}
