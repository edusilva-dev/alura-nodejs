import { FLAGS } from '../constants/flags.js'

export const getFlags = input => {
  return input
    .map((flag, index) => {
      if (FLAGS.includes(flag)) {
        return { flag, value: input[index + 1] }
      }
    })
    .filter(flag => flag)
}

export const getFlagValue = input => {}
