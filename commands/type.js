const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var http = require("http");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("type")
    .setDescription("Send text to the browser")

    .addStringOption((option) =>
      option.setName("text").setDescription("TEXT")
    ),
  async execute(interaction) {
    var text = interaction.options.getString("text");
    console.log(text)
    if (!text) {
      return await interaction.reply({
        content: `Text is required`,
        ephemeral: true,
      });
    }
    const msg = await interaction.reply({
      content: "Getting URL",
    })
    text = text.replaceAll("/", "%2F")
    var url = "http://192.168.4.51:3000/type.jpg?text="+text
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
    interaction.editReply({
      files: [url],
      components: [row] 
    })
    
  },
};
