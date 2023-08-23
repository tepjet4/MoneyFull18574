import { Link } from 'react-router-dom'
import Trashcan from '../assets/delete.svg'
import Editnote from '../assets/edit_note.svg'
import { useHistory } from 'react-router-dom'

import { projectFirestore } from "../firebase/config"

// styles
import './VersionList.css'

export default function VersionList({ versions }) {  
  const history = useHistory()
    if (versions.length === 0) {
        return <div className="error">No versions to load...</div>
      }

    const handleClick = (id) => {      
      if (window.confirm("Delete Record: (" + id + ")?")){
        projectFirestore.collection('versions').doc(id).delete()
      }
      }
    
    return (
    <div className="version-list">
      {versions.map(version => (
        <div key={version.id} className="card">
          <h3>{version.title}</h3>
          <p>{version.comment.substring(0,18)}... to show.</p>     
          <h5><Link to={`/recipe/${version.id}`} key={version.id}>Show More</Link>  </h5>
          <img 
            className="delete"
            onClick={() => history.push(`/edit/${version.id}` )}
            src={Editnote} alt="edit icon" 
          />    
          <img 
            className="edit"
            onClick={() => handleClick(version.id)}
            src={Trashcan} alt="delete icon" 
          />       
        </div>
      ))}
   
    </div>
  )
}