import styles from './Version.module.css'
import { projectFirestore } from '../../firebase/config'
import VersionList from '../../components/VersionList'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

export default function Version() {
    const [version, setVersion] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)    
   
    useEffect(()=> {
        setIsPending(true)
        const unsub = projectFirestore.collection('versions').onSnapshot((snapshot) => {          
            if (snapshot.empty) {
                setError('No versions to load')
                setIsPending(false)
              } else {
                let results = []
                snapshot.docs.forEach(doc => {
                  console.log(doc)
                  results.push({ ...doc.data(), id: doc.id })
                })
                setVersion(results)
                setIsPending(false)
              }
            }, (err) => {
              setError(err.message)
              setIsPending(false)
            })
            return ()=> unsub()
    }, [])      
    return (        
        <div className='content'>
            <h2>Version List&nbsp;  <Link to="/create">Create New Version</Link></h2><hr />
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {version && <VersionList versions={version} />}          
            <hr />
        </div>
    )
   
}