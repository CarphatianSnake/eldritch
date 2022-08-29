import { createSlice } from "@reduxjs/toolkit/dist"

import shuffle from "../../utilities/shuffle"

import { greenCards, brownCards, blueCards } from '../../data/mythicCards'

const initialState = {
  ancient: {},
  currentCard: {},
  cardsCount: {},
  mixedCards: [],
  difficulty: ''
}

const cards = { greenCards, brownCards, blueCards }

export const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getAncient(state, { payload }) {
      state.ancient = payload
    },
    onMixCards(state) {
      
      // eslint-disable-next-line
      if (state.difficulty === '' || state.ancient == {}) {
        return
      }

      const { firstStage, secondStage, thirdStage } = state.ancient

      const countCards = (color) => firstStage[color] + secondStage[color] + thirdStage[color]

      const cardsCount = {
        'greenCards': countCards('greenCards'),
        'brownCards': countCards('brownCards'),
        'blueCards': countCards('blueCards')
      }

      const mixedCards = {
        'greenCards': [],
        'brownCards': [],
        'blueCards': []
      }

      const prepareCardsStack = (difficulty, color) => {
        switch (difficulty) {
          case 'beginner':
            const beginner = cards[color].filter(item => item.difficulty === 'easy')
            if (beginner.length < cardsCount[color]) {
              beginner.push(cards[color].filter(item => item.difficulty === 'normal').splice(0, cardsCount[color] - beginner.length))
            }
            return beginner.flat()
          case 'light':
            return cards[color].filter(item => item.difficulty !== 'hard')
          case 'normal':
            return cards[color]
          case 'hard':
            return cards[color].filter(item => item.difficulty !== 'easy')
          case 'hardcore':
            const hardcore = cards[color].filter(item => item.difficulty === 'hard')
            if (hardcore.length < cardsCount[color]) {
              hardcore.push(cards[color].filter(item => item.difficulty === 'normal').splice(0, cardsCount[color] - hardcore.length))
            }
            return hardcore.flat()
          default: {}
        }
      }

      const stages = {
        firstStage: [],
        secondStage: [],
        thirdStage: []
      }

      const mixCards = (data, cardsCount) => shuffle(data)
          .slice(0, cardsCount)

      for (let color in mixedCards) {
        switch (color) {
          case 'greenCards':
            mixedCards[color] = mixCards(prepareCardsStack(state.difficulty, color), cardsCount[color])
            break
          case 'brownCards':
            mixedCards[color] = mixCards(prepareCardsStack(state.difficulty, color), cardsCount[color])
            break
          case 'blueCards':
            mixedCards[color] = mixCards(prepareCardsStack(state.difficulty, color), cardsCount[color])
            break
          default: {}
        }
      }

      // for (let color in mixedCards) {
      //   switch (color) {
      //     case 'greenCards':
      //       mixedCards[color] = mixCards(greenCards, cardsCount[color])
      //       break
      //     case 'brownCards':
      //       mixedCards[color] = mixCards(brownCards, cardsCount[color])
      //       break
      //     case 'blueCards':
      //       mixedCards[color] = mixCards(blueCards, cardsCount[color])
      //       break
      //     default: {}
      //   }
      // }

      for (let stage in { firstStage, secondStage, thirdStage }) {
        switch (stage) {
          case 'firstStage':
            for (let color in firstStage) {
              stages[stage].push(mixedCards[color].splice(0, firstStage[color]))
            }
            break
          case 'secondStage':
            for (let color in secondStage) {
              stages[stage].push(mixedCards[color].splice(0, secondStage[color]))
            }
            break
          case 'thirdStage':
            for (let color in thirdStage) {
              stages[stage].push(mixedCards[color].splice(0, thirdStage[color]))
            }
            break
          default: {}
        }
        
      }

      for (let stage in stages) {
        stages[stage] = shuffle(stages[stage].flat())
        stages[stage] = stages[stage].map(item => {
          return {...item, stage}
        })
        state.mixedCards.push(stages[stage])
      }

      state.mixedCards = state.mixedCards.flat()

    },
    getDifficulty(state, { payload }) {
      state.difficulty = payload
    },
    getCurrentCard(state) {
      state.currentCard = state.mixedCards.shift()

      const findColor = (stage) => {
        switch (state.currentCard.color) {
          case 'green':
            state.ancient[stage].greenCards = state.ancient[stage].greenCards - 1
            break
          case 'brown':
            state.ancient[stage].brownCards = state.ancient[stage].brownCards - 1
            break
          case 'blue':
            state.ancient[stage].blueCards = state.ancient[stage].blueCards - 1
            break
          default: {}
        }
      }
      switch (state.currentCard.stage) {
        case 'firstStage':
          findColor('firstStage')
          break
        case 'secondStage':
          findColor('secondStage')
          break
        case 'thirdStage':
          findColor('thirdStage')
          break
        default: {}
      }

    },
    clearData(state) {
      state.currentCard = {}
      state.cardsCount = {}
      state.mixedCards = []
    }
  }
})

const {reducer, actions} = slice

export const {
  getAncient,
  getDifficulty,
  onMixCards,
  getCurrentCard,
  clearData
} = actions
export default reducer