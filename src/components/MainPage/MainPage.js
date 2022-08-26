import Ancients from '../Ancients/Ancients'
import Difficulties from '../Difficulties/Difficulties'
import Cards from '../Cards/Cards'
import StatusBar from '../StatusBar/StatusBar'

import styles from './MainPage.module.scss'

const MainPage = () => {
  return (
    <main className={styles.container}>
      <Ancients />
      <Difficulties />
      <div className={styles.game}>
        <StatusBar />
        <Cards />
      </div>
    </main>
  )
}

export default MainPage