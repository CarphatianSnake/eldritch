import Ancient from './Ancient'

import styles from './Ancients.module.scss'

const Ancients = () => {
  return (
    <>
      <h2>Choose your Ancient</h2>
      <div className={styles.ancientsContainer}>
        <Ancient />
      </div>
    </>
    
  )
}

export default Ancients