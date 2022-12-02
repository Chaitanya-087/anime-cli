const minimist = require('minimist');
const chalk = require('chalk');

module.exports = async () => {
    const args = minimist(process.argv.slice(2))

    let cmd = args._[0] || 'help'
    if (args.search || args.s) {
        cmd = 'search'
    }
    if (args.help || args.h) {
        cmd = 'help'
    }
    if (args.version || args.v) {
        cmd = 'version'
    }
    if (args.popular || args.p) {
        cmd = 'popular'
    }

    switch(cmd) {
        case 'search': require('./cmds/search')(args); break;
        case 'popular':require('./cmds/search')(args); break;
        case 'help': require('./cmds/help')(); break;
        case 'version': require('./cmds/version')(); break;
        default: console.log(chalk.red.bold(`${cmd} not a valid command`))
    }

}

// const getArgs = () => {
//     const args = minimist(process.argv.slice(2))
//     return args
// }

// (async function(){
//     const args = getArgs()
//     let results = await searchResults(args.s)
//     console.log(results)
// })()
