import { useParams } from 'react-router-dom'

import { useState, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'

// styles
import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()  

  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    setIsPending(true)

    projectFirestore.collection('versions').doc(id).get().then(doc => {
      if (doc.exists) {
        setIsPending(false)
        setRecipe(doc.data())
      } else {
        setIsPending(false)
        setError(`Could not find that application version controls`)
      }
    })

  }, [id])

  return (
    <div className={`content`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}--Version Details</h2>     <hr />    
          <p className="method">{recipe.comment}</p>
        </>
      )}
    </div>
  )
}