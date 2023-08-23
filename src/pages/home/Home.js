import styles from './Home.module.css'
// components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import React from 'react'

export default function Home() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection('transactions', ["uid","==",user.uid], ["createdAt", "desc"])
  return (
    // <div className='content'>
    //   <h3>Home</h3>
    // </div>
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>Transaction list</h3>
        {error && <p className='apperror'>{error}</p>}
        {documents && <TransactionList transactions={documents} />} 
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
    
  )
}

