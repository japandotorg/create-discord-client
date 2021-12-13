module.exports = async function(client) {
    const Discord = require("discord.js")
    const fs = require("fs")
    const {
        FileArray
    } = require(`${Source.path}/Source/Functions/FileArray`)

    FileArray(`${Source.path}/Source/Commands/SelectMenus`, async function (err, res) {
        res.forEach(file => {
            if (fs.statSync(file).isDirectory()) return;
            const selectMenu = require(file)
            client.commands.menus.set(selectMenu.name, selectMenu)
        })
    })
}