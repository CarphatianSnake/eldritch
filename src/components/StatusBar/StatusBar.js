import { useSelector } from 'react-redux/es/exports'

import { nanoid } from '@reduxjs/toolkit/dist/'
import { Fragment } from 'react'

import styles from './StatusBar.module.scss'

const StatusBar = () => {

  const { firstStage, secondStage, thirdStage } = useSelector(state => state.slice.ancient)

  const { green, orange, blue } = styles

  const _stagesRender = ['first', 'second', 'third'].map(item => {

    const statusData = (color) => {

      const takeNumber = (stage) => {
        return !stage ? 0 : color === green ? stage['greenCards'] : color === orange ? stage['brownCards'] : color === blue ? stage['blueCards'] : 0
      }

      switch (item) {
        case 'first':
          return takeNumber(firstStage)
        case 'second':
          return takeNumber(secondStage)
        case 'third':
          return takeNumber(thirdStage)
      }
    }

    return (
      <Fragment key={nanoid()}>
        <h3>{item} Stage</h3>
        {[green, orange, blue]
          .map(color => <div key={nanoid()} className={`${styles.status} ${color}`}>
            {statusData(color)}
          </div>)
        }
      </Fragment>
    )
  })

  return (
    <div className={styles.container}>
      <h2>Game Status</h2>
      <div className={styles.stage}>
        {_stagesRender}
      </div>
    </div>
  )
}

export default StatusBar