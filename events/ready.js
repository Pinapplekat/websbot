const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    const guild = client.guilds.cache.get("970048427239047178")
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setPresence({
      activities: [
        {
          name: `HTTP requests`,
          type: ActivityType.Listening,
          url: "https://pinapplekat.xyz/"
        },
      ],
      status: "dnd",
    });
  },
};
