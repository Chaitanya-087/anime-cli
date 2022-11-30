const patterns = require('cli-spinners')
const Spinner = require('cli-spinner').Spinner

const patternString = patterns.dots.frames.join('')
const delay = patterns.dots.interval

const spinner = new Spinner()

spinner.setSpinnerDelay(delay)
spinner.setSpinnerString(patternString)

module.exports = spinner
