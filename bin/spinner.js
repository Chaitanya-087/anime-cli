const Spinner = require('cli-spinner').Spinner

const spinner = new Spinner("processing.. %s")

spinner.setSpinnerDelay(80)
spinner.setSpinnerString('-\\|/')

module.exports = spinner
