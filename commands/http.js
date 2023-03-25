const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("http")
    .setDescription("Send an HTTP request and recieve a screenshot of page")

    .addStringOption((option) => option.setName("Method").setDescription("Method of HTTP request"))
    .addStringOption((option) =>
      option.setName("message").setDescription("the message")
    ),
  async execute(interaction) {
    const user = interaction.options.getString("Method");

    if (user) {
      user.send(interaction.options.getString("message"));
      await interaction.reply({
        content: `Successfully sent message to user <@${user.id}>`,
        ephemeral: true,
      });
    } else {
      await interaction.reply(`please select a valid user`);
    }

    const channel = interaction.options.getChannel("target");

    if (channel) {
      channel.send(interaction.options.getString("message"));
      await interaction.reply({
        content: `Successfully sent message to channel <#${channel.id}>`,
        ephemeral: true,
      });
      // await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
    } else {
      await interaction.reply(`please select a valid channel`);
    }
  },
};
