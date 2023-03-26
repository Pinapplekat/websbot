const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var http = require("http");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("http")
    .setDescription("Send an HTTP request and recieve a screenshot of page")

    .addStringOption((option) =>
      option.setName("url").setDescription("URL")
    ),
  async execute(interaction) {
    var url = interaction.options.getString("url");
    console.log(url)
    if (!url) {
      return await interaction.reply({
        content: `URL is required`,
        ephemeral: true,
      });
    }
    const msg = await interaction.reply({
      content: "Getting URL",
      ephemeral: true
    })
    url = url.replaceAll("/", "%2F")
    url = "http://192.168.4.51:3000/url.jpg?url="+url
    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('key:Tab')
					.setLabel('TAB')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
					.setCustomId('key:Enter')
					.setLabel('ENTER')
          .setStyle(ButtonStyle.Success),
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
