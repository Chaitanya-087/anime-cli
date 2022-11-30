const chalk = require('chalk');
const menus = {
    main: `
    Usage: ani [search|s] "<anime name>"

    --search,-s............appropriate names for anime are listed
    --help,-h..............help command 
    --version,-v...........current version of the program
    `,
}

module.exports = () => {
    console.log(chalk.magenta.bold(menus.main))
}
