module.exports = async function(client) {
    const Discord = require("discord.js")
    const fs = require("fs")
    const { FileArray } = require(`${Source.path}/Source/Functions/FileArray`)

    FileArray(`${Source.path}/Source/Commands/Slash`, async function (err, res) {
        res.forEach(file => {
            if (fs.statSync(file).isDirectory()) return;
            let cmd = require(file)
            if (cmd.ignoreFile) return;
            client.commands.slash.set(cmd.name, cmd)
        })
    })

    FileArray(`${Source.path}/Source/Commands/Normal`, async function (err, res) {
        res.forEach(file => {
            if (fs.statSync(file).isDirectory()) return;
            const command = require(file)
            client.commands.normal.set(command.name.toLowerCase(), command)
            if (command.aliases) command.aliases.forEach(alias => {
                client.commands.normal.aliases.set(alias, command.name)
            })
        })
    })
}