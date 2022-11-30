const inquirer = require('inquirer')
const {searchResults} = require('../util')
const spinner = require('../spinner')


module.exports = async (args) => {
    const term = args.s || "high school dxd"
    spinner.start()
    const names = await searchResults(term)
    spinner.stop(true)
    const showlist = await inquirer.prompt([{
        type:"list",
        name:"anime",
        message:"select anime from the list",
        choices: names
    },])
    console.log(showlist)
}