import { useDispatch, useSelector } from 'react-redux/es/exports'

import styles from './Cards.module.scss'

import { getCurrentCard, updateStatus } from '../slice'

import cardBackground from '../../assets/mythicCardBackground.png'

const Cards = () => {

  const dispatch = useDispatch()

  const cardsStack = useSelector(state => state.slice.mixedCards)
  
  const currentCard = useSelector(state => state.slice.currentCard)

  const onCardShow = () => {
    dispatch(getCurrentCard())
    dispatch(updateStatus())
  }

  const cardBack = <img onClick={onCardShow} className={styles.cardsBack} src={cardBackground} alt="Card Background" />

  const showCard = <img className={styles.cardFace} src={currentCard.cardFace} alt="Current Card" />

  return (
    <div className={styles.container}>
      <div>
        {!!cardsStack.length && cardBack}
      </div>
      <div>
        {!!Object.keys(currentCard).length && showCard}
      </div>
    </div>
  )
}

export default Cards