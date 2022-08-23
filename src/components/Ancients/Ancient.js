import { useState } from 'react'

import styles from './Ancients.module.scss'

import ancientsData from '../../data/ancients'

const Ancient = () => {

  const [ activeAncient, setActiveAncient ] = useState()

  const onChoose = (e) => {
    setActiveAncient(e.target.alt)
  }

  const ancients = ancientsData.map(item => {
    const _class = activeAncient === item.id ? `${styles.ancientCard} ${styles.active}` : styles.ancientCard
    return (
      <div onClick={(e) => {onChoose(e)}} className={_class} key={item.id}>
        <img className={styles.cardFace} src={item.cardFace} alt={item.name} />
      </div>
    )
  })

  return ancients
}

export default Ancient