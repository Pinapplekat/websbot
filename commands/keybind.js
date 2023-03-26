const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var http = require("http");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("keybind")
    .setDescription("Send keybind to the browser")
    .addBooleanOption(option =>
      option.setName('shift')
      .setDescription('SHIFT')
    )
    .addBooleanOption(option =>
      option.setName('control')
      .setDescription('CTRL')
    )
    .addStringOption((option) =>
      option.setName("key")
      .setDescription("key")
    ),
  async execute(interaction) {
    var key = interaction.options.getString("key");
    var shift = interaction.options.getBoolean("shift");
    var control = interaction.options.getBoolean("control");
    if (!key) {
      return await interaction.reply({
        content: `Key is required`,
        ephemeral: true,
      });
    }
    const msg = await interaction.reply({
      content: "Getting Page",
      ephemeral: true
    })
    var url = `http://192.168.4.51:3000/keybind.jpg?key=${key}&shift=${shift}&control=${control}`
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
