const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(process.env.PORT || 3000, () => {
  console.log('Web server is running.');
});

const TOKEN = process.env.TOKEN;
const SALON_ID = '1367896135506726982'; // ID du salon où réagir

// 👇 Mets les IDs réels ici
const EMOJIS = [
    '<:tank_icone:1367949630142156800>',  
    '<:heal_icone:1367949627718107196>',
    '<:dps_icone:1510907481621004338>'
  ];
  
  client.on('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
  });
  
  client.on('messageCreate', async (message) => {
    if (message.channel.id === SALON_ID && !message.author.bot) {
      try {
        for (const emoji of EMOJIS) {
          await message.react(emoji);
        }
      } catch (err) {
        console.error('Erreur lors de l’ajout des réactions :', err);
      }
    }
  });
  
  client.login(TOKEN);
