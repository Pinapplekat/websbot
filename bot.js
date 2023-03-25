try {
  const fs = require("node:fs");
  const path = require("node:path");
  var http = require("http");
  setInterval(function () {
    http.get("http://obscure-plateau-46006.herokuapp.com");
  }, 300000);
  const express = require("express");

  const {
    Client,
    GatewayIntentBits,
    Partials,
    Events,
    ActivityType,
    Collection,
  } = require("discord.js");
  require("dotenv").config();
  const bot = new Client({
    intents: [
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildBans,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
  });
  bot.commands = new Collection();
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      bot.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      bot.once(event.name, (...args) => event.execute(...args));
    } else {
      bot.on(event.name, (...args) => event.execute(...args));
    }
  }

  bot.on("messageCreate", async (message) => {
    console.log("Message recieved")
  });

  bot.login(process.env.TOKEN);
  app.listen(process.env.PORT || 5000);
} catch (err) {
  throw err;
}
