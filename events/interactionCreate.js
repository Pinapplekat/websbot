const { Events } = require('discord.js');
const http = require('http')
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand() && !interaction.isButton()) return;
		console.log(interaction)
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		}
		if (interaction.isButton()) {
			console.log(interaction)

			console.log("IS HTTP")
			var cmd = interaction.customId.split(":")[1]
			console.log("interaction: "+cmd)
			if(interaction.customId.startsWith('key:')){
				await interaction.update({
					files: ["http://192.168.4.51:3000/key.jpg?keycode=" + cmd],
				})
			}
			if(interaction.customId.startsWith("func:")){
				if(cmd == "screenshot"){
					await interaction.update({
						files: ["http://192.168.4.51:3000/screenshot.jpg"],
					})
				}
			}
			

		}

	},
};
