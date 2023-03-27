const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var http = require("http");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("view")
    .setDescription("View the screen"),
  async execute(interaction) {
    var url = "http://192.168.4.51:3000/screenshot.jpg"
    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('key:Escape')
					.setLabel('ESC')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
					.setCustomId('key:Tab')
					.setLabel('TAB')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
					.setCustomId('key:Enter')
					.setLabel('ENTER')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
					.setCustomId('key:Backspace')
					.setLabel('BACKSPACE')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
					.setCustomId('func:screenshot')
					.setLabel('Refresh Screenshot')
          .setStyle(ButtonStyle.Primary)
			);
    interaction.reply({
      files: [url],
      components: [row],
    })
    
  },
};
