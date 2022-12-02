const chalk = require('chalk');
const menus = {
    main: `
    Usage: animix [search|s] "<anime name>"
           animix [popular|p]

    -search,-s              appropriate animes are listed
    -popular,-p             popular animes are listed
    -help,-h                help command 
    -version,-v             current version of the program
    `,
}

module.exports = () => {
    console.log(chalk.magenta.bold(menus.main))
}
