import styles from './About.module.css'
import logo from './loading.png';

export default function About() {
   
    return (
        <div className='content'>
          <h3>This is about me page powered by John 12345</h3>
          <hr />
          <img src={logo} alt="logo" />
          <p>This is the online version...ready to go!</p>
        </div>
        )
}