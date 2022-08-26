import { useDispatch, useSelector } from 'react-redux/es/exports'

import styles from './Difficulties.module.scss'

import { getDifficulty } from '../slice'

const Difficulties = () => {

  const dispatch = useDispatch()
  const difficulty = useSelector(state => state.slice.difficulty)

  const difficulties = ['beginner', 'light', 'normal', 'hard', 'hardcore'].map(item => {
    const _class = difficulty === item ? `${styles.btn} ${styles.active}` : styles.btn
    return <div key={item} className={_class}>{item}</div>
  })

  const onChoose = (e) => {
    dispatch(getDifficulty(e.target.textContent))
  }

  return (
    <>
      <h2>Choose Difficulty</h2>
      <div onClick={(e) => onChoose(e)} className={styles.container}>
        {difficulties}
      </div>
    </>
  )
}

export default Difficulties