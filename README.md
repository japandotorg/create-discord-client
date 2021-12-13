# [create-discord-client](https://www.npmjs.com/package/create-discord-client)

## What is create-discord-client?
> create-discord-client is a CLI (Command Line Interface) tool that lets you generate a Discord.js project in a couple of seconds.

## Why create-discord-client?
Do you use a Command/Event Handler? Are you tired of having to copy paste the same files again and again, or cloning a repository? `create-discord-client` serves a purpose to make life easier for the fellow devs with an advanced command and event handler, use `create-discord-client` to generate an advanced base structure for your next Discord Bot Project.

## What create-discord-client is NOT
* Framework
* Library
* Discord Bot (It's a discord bot **generator**)
* Replacement for coding

## Getting Started
Install create-discord-client by running `npm install -g create-discord-client` or `yarn global add create-discord-client` on your terminal or windows command prompt. This will install create-discord-client globally.
* To create a project, type `create-discord-client` in your terminal or command prompt.

Or you can directly use npx to genereate the files for you
```bash
npx create-discord-client
```

## Setup/Configuration
Your `.env` file should look like this -
```env
PREFIX=YOUR_PREFIX_HERE
TOKEN=YOUR_TOKEN_HERE
DEV=YOUR_ID_HERE
```

If you want to change the `ready` event then remember to use these to get the values -
```js
client.commands.normal.size
client.commands.normal.aliases.size
client.events.size
client.commands.buttons.size
client.commands.menus.size
client.commands.slash.size
```

### Command Examples:
Normal Commands -
```js
module.exports = {
    name : 'ping', // Name of command
    aliases: ["pong", "p"], // Aliases. Optional
    // Check below for avaliable optional options that can be used here.
    run : async(client, message, args, Discord) => {
    	// Your code here.
    }
}
```

Button Commands -
```js
module.exports = {
    name : 'evalbtn', // Must be same as button's Custom Id
    // Check below for avaliable optional options that can be used he
    run : async(client, interaction, Discord) => {
        interaction.reply("yo")
    }
}
```

Select Menus -
```js
module.exports = {
    name : 'fun', // Should be same as Menu Custom Id or The menu options set values.
    // Check below for avaliable optional options that can be used he
    run : async(client, interaction, Discord) => {
    	interaction.reply("e")
    }
}
```

Slash Commands -
```js
module.exports = {
    name : 'fun', // Name of the slash command.
    guilds: ["GuildID", "GuildID"], // Makes this command a guild command in these guilds. // Optional
    description: "A fun command :)", // Description of slash command. Optional
    type: "CHAT_INPUT", // Type of / command. Optional
    options: [{
      name: 'Are you having fun?',
      description: 'Choose true / false.',
      required: true,
      type: "BOOLEAN",
    }], // Options for / command. Optional
    // Check below for avaliable optional options that can be used he
    run : async(client, interaction, Discord) => {
    	interaction.reply("pog")
    }
}
```

### Event Examples:
Client Event -
```js
module.exports = {
	name: 'messageDelete', // Name of event that is executed.
	once: true, // Execute event only once. Default: False.
	run: async(client, message) => { // Your event args.) {
		// Event Code
	},
};
```

Non-Client Event -
```js
module.exports = {
	customEvent: true,
	run: async(client) => {
		client.distube.on("error", (message, error) => {
		console.error(error)
            })
		},
};
```

## Options for all commands and interactions
`ownerOnly: true / false`
* Default: `false`. 
* When true, The command will only be runnable by the bot owner.

`cooldown: Time in ms`
* Default: `0`.
* Sets up a global user cooldown for the command for the provided time limit.

`userPermissions: ["SEND_MESSAGES" . . .]`
* Default: `None`.
* The user of the command must have all of the provided permissions to be able to run the command. **Permission(s) names must be in full capital**.

`clientPermissions: ["SEND_MESSAGES" . . .]`
* Default: `None`.
* The client must have all of the provided permissions to be able to run the command. **Permission(s) names must be in full capital**.

`anyUserPermissions: ["SEND_MESSAGES" . . .]`
* Default: `None`.
* The user of the command must any one of the provided permissions to be able to run the command. **Permission(s) names must be in full capital**.

`anyClientPermissions: ["SEND_MESSAGES" . . .]`
* Default: `None`.
* The client must any one of the provided permissions to be able to run the command. **Permission(s) names must be in full capital**.

`guildOnly: true / false`
* Default: `true`.
* When false, The command will be able to be run in DMs as well.

`allowBots: true / false`
* Default: `false`.
* When true, Bots will also be able to run the command.

`onlyUsers: ["User ID", "User ID" . . .]`
* Default: `None`
* Only the provided user IDs will be able to run the command.

`requiredRoles: ["Role ID", "Role ID" . . .]`
* Default: `None`
* Users will need to have all these role to be able to run the command.

`requiredAnyRole: ["Role ID", "Role ID" . . .]`
* Default: `None`
* Users will need to have any one of these roles to be able to run the command.

`onlyChannels: ["Channel ID", "Channel ID" . . .]`
* Default: `None`
* The command will only be able to be run in the provided channels.

`onlyGuilds: ["Server ID", "Server ID" . . .]`
* Default: `None`
* The command will only be able to be run in the provided guilds.

## Return Errors Options
These are a part of the above options. You can choose which option should give the error and which option shouldn't.

`returnNoErrors: true / false`
* Default: `false`
* When true, None of the errors usually sent by the options above will be sent. Basically it is like having all the options below as `false`.

`returnCooldown: true / false`
* Default: `true`
* When false, The error message sent by the `cooldown handler` will not be sent.

`returnOwnerOnly: true / false`
* Default: `true`
* When false, The error message sent by the `ownerOnly handler` will not be sent.

`returnUserPermissions: true / false`
* Default: `true`
* When false, The error message sent by the `userPermissions handler` will not be sent.

`returnClientPermissions: true / false`
* Default: `true`
* When false, The error message sent by the `clientPermissions handler` will not be sent.

`returnAnyUserPermissions: true / false`
* Default: `true`
* When false, The error message sent by the `anyUserPermissions handler` will not be sent.

`returnAnyClientPermissions: true / false`
* Default: `true`
* When false, The error message sent by the `anyClientPermissions handler` will not be sent.

`returnOnlyUsers: true / false`
* Default: `true`
* When false, The error message sent by the `onlyUsers handler` will not be sent.

`returnRequiredRoles: true / false`
* Default: `true`
* When false, The error message sent by the `requiredRoles handler` will not be sent.

`returnRequiredAnyRole: true / false`
* Default: `true`
* When false, The error message sent by the `requiredAnyRole handler` will not be sent.

`returnOnlyChannels: true / false`
* Default: `true`
* When false, The error message sent by the `onlyChannels handler` will not be sent.

`returnOnlyGuilds: true / false`
* Default: `true`
* When false, The error message sent by the `onlyGuilds handler` will not be sent.

## Contributing
Contributions, issues and feature requests are welcomed, feel free to check [issues page](https://github.com/japandotorg/create-discord-client/issues)

## Note
The project is not fully completed yet, so there's still a lot of development left, and guides to make.