import { useState } from 'react'
import { useDispatch } from 'react-redux/es/exports'

import styles from './Ancients.module.scss'

import ancientsData from '../../data/ancients'

import { getAncient, onMixCards, clearData } from '../slice'

const Ancient = () => {

  const [ activeAncient, setActiveAncient ] = useState()
  const dispatch = useDispatch()

  const onChoose = (e) => {
    dispatch(clearData())
    setActiveAncient(e.target.alt)
    const ancient = ancientsData.filter(item => item.id === e.target.alt)[0]
    dispatch(getAncient(ancient))
    dispatch(onMixCards())
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