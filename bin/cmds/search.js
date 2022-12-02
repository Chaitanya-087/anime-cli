const inquirer = require('inquirer')
const {searchResults,getEpisodes,getEpisodeLink,getPopular} = require('../util')
const spinner = require('../spinner')
const open = require('open')

module.exports = async (args) => {
    spinner.start()
    const names = args.s ?await searchResults(args.s) : await getPopular(5)
    spinner.stop(true)
    
    const showlist = await inquirer.prompt([{
        type:"list",
        name:"anime",
        pageSize: 15,
        message:"select from list",
        choices: names
    },])
    const latest = await getEpisodes(showlist.anime)
    const episodes = await inquirer.prompt([{
        name:"episode",
        message:`select from 1-${latest} episodes`,
    },])
    const watchLink = await getEpisodeLink(showlist.anime,episodes.episode)
    await open(watchLink)
}