const readline = require('readline');
const mineflayer = require('mineflayer');
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const chalk = require('chalk');
var figlet = require("figlet");
const { once } = require("events");
const gradient = require('gradient-string');
require('dotenv').config();
const { pathfinder, Movements, goals: { GoalBlock } } = require('mineflayer-pathfinder');
const { CategoryChannel } = require('discord.js');
require('events').EventEmitter.defaultMaxListeners = 40;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const webhookUrl = process.env.WEBHOOK_URL;

const warpCooldown = 10000; // Set the cooldown for /p warp to 10 seconds (in milliseconds)
let lastWarpTime = 0;
let walkingToMortCount = 0;
let lastWalkingToMortTime = Date.now();
let isProcessingPartyLeave = false;
let isProcessingEvacuation = false;
let isProcessingRat = false;
let isProcessingWarp = false;
let isProcessingScam = false;
let isProcessingPartyFinder = false;
let isProcessingScammer = false; // Initialize a processing flag for the scammer event handler
let isProcessingRatter = false;  // Initialize a processing flag for the ratter event handler
let isProcessingScamming = false; // Initialize a processing flag for the scamming event handler
let isProcessingRatting = false;  // Initialize a processing flag for the ratting event handler
let isBotBusy = false;
let isStartQueueRunning = false;

function fetchUsernameFromMinecraftWebsite(ssid) {
  return axios
    .get('https://api.minecraftservices.com/minecraft/profile', {
      headers: {
        Authorization: 'Bearer ' + ssid,
      },
    })
    .then((response) => response.data)
    .catch(() => {
      throw new Error(chalk.red('Invalid SSID.'));
    });
}

async function restartbot() {
  process.exit()
}

async function main() {

  console.log(gradient.vice.multiline`Starting Cvrsedd Racro....`);

  const ssid = process.env.SSID;
  try {

    const { name, id } = await fetchUsernameFromMinecraftWebsite(ssid);
    console.log(chalk.green(`Minecraft username: ${name}`));
    console.log(chalk.green(`Client Token: ${id}`));

    const bot = mineflayer.createBot({
      host: 'hypixel.net',
      port: 25565,
      version: '1.8.9',
      username: name,
      session: {
        accessToken: ssid,
        clientToken: id,
        selectedProfile: {
          id: id,
          name: name,
      keepAlive: false,
        },
      },
      auth: 'mojang',
      skipValidation: true,
    });

    bot.loadPlugin(pathfinder);
      const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms))
 
      bot.on('messagestr', (message) => {
        const messageString = message.toString();
      
        // Exclude messages containing mana, defense, and health
        if (
          !messageString.includes('✎') &&
          !messageString.includes('❈') &&
          !messageString.includes('❤') &&
          !messageString.includes('+400 Bits from Cookie Buff!')
        ) {
          console.log(gradient.fruit.multiline(`${message.toString()}`));
        }
      });

      bot.once('login', async () => {
        console.log(chalk.yellow(`Logged in to Hypixel as ${bot.username}`));

        // Perform actions after logging in
        await sleep(2000); // Initial cooldown

        // Send chat commands once
        bot.chat('/language english');
        await sleep(3000);
        bot.chat('/play skyblock');
        await sleep(5000);
        bot.chat('/p leave');
        await sleep(2000);
      
      bot.loadPlugin(pathfinder)

async function logToWebhook(message) {
  const webhookUrl = process.env.WEBHOOK_URL;

  try {
    const data = {
      content: message // Set the message content
    };

    const response = await axios.post(webhookUrl, data);
    console.log('Log successfully sent to webhook.');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error sending log to webhook:', error);
  }
}

bot.on('message', (message) => {
  if (isProcessingScamming) {
    return; // Don't execute this event handler if processing is in progress for the scamming event
  }

  isProcessingScamming = true; // Set the processing flag to true for the scamming event

  const messageString = message.toString();

  const chatMatch = messageString.match(
    /^(?:Party > )?\[([^\]]+)]? ([a-zA-Z0-9_]{3,16})(?:: .*scamming.*)?$/
  );

  if (chatMatch) {
    const IGNOfVictim = chatMatch[2];
    console.log("Ignore adding " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/ignore add " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/p kick " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/pc its not bruh hes not even in the server");
       }, 2000);
      }, 3000);
    }, 3000);
    const message = "Cvrsedd Racro | Ignore adding " + IGNOfVictim;
    logToWebhook(message);
  }

  try {
    // Code that may throw an exception
  } catch (error) {
    // Code to handle the exception
    console.error("An error occurred:", error);
  } finally {
    isProcessingScamming = false; // Reset the processing flag when done
  }
});

bot.on('message', (message) => {
  if (isProcessingRatting) {
    return; // Don't execute this event handler if processing is in progress for the ratting event
  }

  isProcessingRatting = true; // Set the processing flag to true for the ratting event

  const messageString = message.toString();

  const chatMatch = messageString.match(
    /^(?:Party > )?\[([^\]]+)]? ([a-zA-Z0-9_]{3,16})(?:: .*ratting.*)?$/
  );

  if (chatMatch) {
    const IGNOfVictim = chatMatch[2];
    console.log("Ignore adding " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/ignore add " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/p kick " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/pc its not bruh hes not even in the server");
       }, 2000);
      }, 3000);
    }, 3000);
    const message = "Cvrsedd Racro | Ignore adding " + IGNOfVictim;
    logToWebhook(message);
  }

  try {
    // Code that may throw an exception
  } catch (error) {
    // Code to handle the exception
    console.error("An error occurred:", error);
  } finally {
    isProcessingRatting = false; // Reset the processing flag when done
  }
});

bot.on('message', (message) => {
  if (isProcessingScammer) {
    return; // Don't execute this event handler if processing is in progress for the scammer event
  }

  isProcessingScammer = true; // Set the processing flag to true for the scammer event

  const messageString = message.toString();

  const chatMatch = messageString.match(
    /^(?:Party > )?\[([^\]]+)]? ([a-zA-Z0-9_]{3,16})(?:: .*scammer.*)?$/
  );

  if (chatMatch) {
    const IGNOfVictim = chatMatch[2];
    console.log("Ignore adding " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/ignore add " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/p kick " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/pc its not bruh hes not even in the server");
       }, 2000);
      }, 3000);
    }, 3000);
    const message = "Cvrsedd Racro | Ignore adding " + IGNOfVictim;
    logToWebhook(message);
  }

  try {
    // Code that may throw an exception
  } catch (error) {
    // Code to handle the exception
    console.error("An error occurred:", error);
  } finally {
    isProcessingScammer = false; // Reset the processing flag when done
  }
});

bot.on('message', (message) => {
  if (isProcessingRatter) {
    return; // Don't execute this event handler if processing is in progress for the ratter event
  }

  isProcessingRatter = true; // Set the processing flag to true for the ratter event

  const messageString = message.toString();

  const chatMatch = messageString.match(
    /^(?:Party > )?\[([^\]]+)]? ([a-zA-Z0-9_]{3,16})(?:: .*ratter.*)?$/
  );

  if (chatMatch) {
    const IGNOfVictim = chatMatch[2];
    console.log("Ignore adding " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/ignore add " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/p kick " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/pc its not bruh hes not even in the server");
       }, 2000);
      }, 3000);
    }, 3000);
    const message = "Cvrsedd Racro | Ignore adding " + IGNOfVictim;
    logToWebhook(message);
  }

  try {
    // Code that may throw an exception
  } catch (error) {
    // Code to handle the exception
    console.error("An error occurred:", error);
  } finally {
    isProcessingRatter = false; // Reset the processing flag when done
  }
});

bot.on('message', (message) => {
  if (isProcessingRat) {
    return;
  }

  isProcessingRat = true;

  const messageString = message.toString();

  const chatMatch = messageString.match(
    /^(?:Party > )?\[([^\]]+)]? ([a-zA-Z0-9_]{3,16})(?:: .*rat.*)?$/
  );

  if (chatMatch) {
    const IGNOfVictim = chatMatch[2];
    console.log("Ignore adding " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/ignore add " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/p kick " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/pc its not bruh hes not even in the server");
       }, 2000);
      }, 3000);
    }, 3000);
    const message = "Cvrsedd Racro | Ignore adding " + IGNOfVictim;
    logToWebhook(message);
  }

  try {
    // Code that may throw an exception
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    isProcessingRat = false;
  }
});

bot.on('message', (message) => {
  if (isProcessingWarp) {
    return;
  }

  isProcessingWarp = true;

  const currentTime = Date.now();
  const messageString = message.toString();

  const chatMatch = messageString.match(
    /^Party Finder > ([a-zA-Z0-9_]{3,16}) joined the dungeon group! (([^)]+))/
  );

  if (chatMatch) {
    const IGNOfVictim = chatMatch[1];
    console.log(IGNOfVictim + " will probably visit you");
    let secondTimeoutRunning = false;
    // Check if the cooldown has passed since the last /p warp
    if (currentTime - lastWarpTime >= warpCooldown) {
      bot.chat(`/pc /visit me for more details ${IGNOfVictim}`);
      setTimeout(() => {
        bot.chat("/p disband");
        // Update the timestamp for the last /p warp command
        lastWarpTime = currentTime;
      }, 5000);
    }

    // This part of the code is executed without any cooldown restrictions
    setTimeout(() => {
      sneakEquipAndHitMort();
      const message = "Cvrsedd Racro | Victim may visit island https://sky.shiiyu.moe/stats/" + IGNOfVictim;
      logToWebhook(message);
    }, 1000);
  }

  try {
    // Code that may throw an exception
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    isProcessingWarp = false; // Reset the flag to allow the code to run again
  }
});

bot.on('message', (message) => {
  if (isProcessingScam) {
    return;
  }

  isProcessingScam = true;

  const messageString = message.toString();

  const chatMatch = messageString.match(
    /^(?:Party > )?\[([^\]]+)]? ([a-zA-Z0-9_]{3,16})(?:: .*scam.*)?$/
  );

  if (chatMatch) {
    const IGNOfVictim = chatMatch[2];
    console.log("Ignore adding " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/ignore add " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/p kick " + IGNOfVictim);
    setTimeout(() => {
    bot.chat("/pc its not bruh hes not even in the server");
       }, 2000);
      }, 3000);
    }, 3000);
    const message = "Cvrsedd Racro | Ignore adding " + IGNOfVictim;
    logToWebhook(message);
  }

  try {
    // Code that may throw an exception
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    isProcessingScam = false;
  }
});

bot.on('messagestr', async (message) => {
  if (isProcessingPartyFinder) {
    return;
  }

  isProcessingPartyFinder = true;

  const messageString = message.toString();
  if (messageString.includes('Party Finder > Your group has been removed from the party finder!')) {
    await sleep(10000);
    bot.chat('/is');
    await sleep(8000);
    sneakEquipAndHitMort();
  }
  isProcessingPartyFinder = false;
});
      
      bot.on('messagestr', async (message) => {
        const messageString = message.toString();
        if (messageString.includes('Your active Potion Effects have been paused and stored. They will be restored when you leave Dungeons! You are not allowed to use existing Potion Effects while in Dungeons.')) {
          await sleep(5000); // wait for 5 seconds
          bot.chat('/hub');
          console.log("Going to Hub.");
          await sleep(5000); // wait for 5 seconds
          bot.chat('/warp dungeon_hub');
          console.log("Warping to Dungeon Hub.");
          await sleep(5000); // wait for 5 seconds
          bot.chat('/p leave');
          console.log("Leaving Party.");
          await sleep(8000); // wait for 5 seconds
          sneakEquipAndHitMort();
        }

     });

bot.on('messagestr', async (message) => {
  if (isProcessingEvacuation) {
    return;
  }

  isProcessingEvacuation = true;

  const messageString = message.toString();

  if (messageString.includes('Evacuating to Hub...')) {
    await sleep(15000); // wait for 5 seconds
    bot.chat('/is');
    console.log("Going to island (lobby closed).");
    await sleep(8000); // wait for 5 seconds
    sneakEquipAndHitMort();

    isProcessingEvacuation = false; // Reset the processing flag when done
        }
      });

bot.on('messagestr', async (message) => {
  const messageString = message.toString();
  if (messageString.includes("You tried to rejoin too fast, please try again in a moment!")) {
    console.log("Restarting the bot due to 'You tried to rejoin too fast, please try again in a moment!' message.");
    
    await sleep(5000); // wait for 5 seconds
    bot.quit();
    await sleep(2000); // wait for 5 seconds
    restartbot();
  }
});

        bot.on('messagestr', async (message) => {
          const messageString = message.toString();
          if (messageString.includes('You were spawned in Limbo.'))  {
            await sleep(160000); // wait for 5 seconds
            bot.chat('/l');
            console.log("Going to Lobby (limbo).");
            await sleep(5000); // wait for 5 seconds
            bot.chat('/skyblock');
            await sleep(5000); // wait for 5 seconds
            console.log("Joining Skyblock");
            sneakEquipAndHitMort();
          }
      });

bot.on('messagestr', async (message) => {
  const messageString = message.toString();
  if (messageString.includes("Unknown command.")) {
    console.log("Restarting the bot due to 'Oops! You are not on SkyBlock so we couldn't warp you!' message");
    
    await sleep(5000); // wait for 5 seconds
    bot.quit();
    await sleep(2000);
    restartbot();
  }
});

bot.on('messagestr', async (message) => {
  const messageString = message.toString();
  if (messageString.includes("Oops! You are not on SkyBlock so we couldn't warp you!")) {
    console.log("Restarting the bot due to 'Oops! You are not on SkyBlock so we couldn't warp you!' message");
    
    await sleep(5000); // wait for 5 seconds
    bot.quit();
    await sleep(2000);
    restartbot();
  }
});

bot.on('messagestr', async (message) => {
  if (isProcessingPartyLeave) {
    return; // Don't execute this event handler if processing is in progress for the 'Party Leave' event
  }

  isProcessingPartyLeave = true; // Set the processing flag to true for the 'Party Leave' event

  const messageString = message.toString();
  if (messageString.includes('Party Finder > Your party already has enough players to queue!')) {
    try {
      await sleep(5000); // wait for 5 seconds
      bot.chat('/p leave');
      console.log("Leaving party.");
      await sleep(5000); // wait for 5 seconds
      sneakEquipAndHitMort();
  } catch (error) {
      // Handle any errors that might occur during the process
      console.error("An error occurred:", error);
    } finally {
      isProcessingPartyLeave = false; // Reset the processing flag when done
    }
  }
});
          bot.on('messagestr', async (message) => {
          const messageString = message.toString();
          if (messageString.includes('There are blocks in the way!'))  {
            await sleep(30000); // Wait for 5 seconds
            bot.chat('/is');
            console.log("Redoing sneakequipandhitmort because of bug");
            await sleep(4000); // Wait for 5 seconds
            bot.chat('/warp dungeon_hub');
            console.log("Warping to Dungeon Hub.");
            await sleep(5000); // Wait for 5 seconds
              const embed = new EmbedBuilder()
              .setTitle('Cvrsedd racro')
              .setDescription('Redoing sneakequipandhitmort cuz of bug please restart racro if its not working!')
              .setFooter({ text: 'Cvrsedd racro', iconURL: 'https://i.pinimg.com/originals/75/d7/da/75d7dac8a6a503c63ca40007f0156910.jpg' });
            // Send the embed to the webhook
               logToWebhook(embed);
            await sleep(8000); // Wait for 5 seconds
            sneakEquipAndHitMort();
          }

      });

          bot.on("kicked", async function(permissions, canCreateDiscussions) {
            var p = JSON.parse(permissions);
            var size = p.extra[0].text;
            if (webhookUrl) {
              const embed = new EmbedBuilder()
                .setTitle('Cvrsedd Racro')
                .setDescription('Bot has been kicked from the server.')
                .Field('Reason', size)
                .setFooter({ text: 'Cvrsedd Racro', iconURL: 'https://i.pinimg.com/originals/75/d7/da/75d7dac8a6a503c63ca40007f0156910.jpg' });
          
              // Send the embed to the webhook
              try {
                await axios.post(url, {
                  embeds: [embed]
                });
              } catch (error) {
                console.log("Invalid WEBHOOK.");
              }
            }
            console.log("Bot has been kicked: " + permissions);
            process.exit();
          });

          bot.on('messagestr', async (message) => {
            const messageString = message.toString();
            if (messageString.includes('You were kicked while joining that server!')) {
              await sleep(160000);
              bot.chat('/lobby');
              await sleep(5000); // Wait for 5 seconds
              bot.chat('/play skyblock');
              await sleep(5000);
              sneakEquipAndHitMort();
            }
          });

async function sneakEquipAndHitMort() {
  if (isBotBusy) {
    console.log("[Cvrsedd Racro] Bot is already busy, skipping this request.");
    return;
  }

  isBotBusy = true;

  const targetCoordinates = { x: -68.5, y: 123, z: 0.5 };

  while (true) {
    console.log("[Cvrsedd Racro] Warping To Skyblock.");
    await sleep(3500);
    bot.chat('/play skyblock');
    console.log("[Cvrsedd Racro] Warping To Dungeon Hub.");
    await sleep(7000); // Wait for the chat message to be sent and processed (adjust as needed)
    bot.chat('/warp dungeon_hub');

    await sleep(5000);
    while (true) {
      const botPosition = bot.entity.position;
      const distance = botPosition.distanceTo(targetCoordinates);

      if (distance < 0.5) {
        // Bot is close enough to the target coordinates, stop moving
        break;
      }

      // Move towards the target coordinates
      const currentTime = Date.now();
      console.log(chalk.blue("[Cvrsedd Racro] Walking to Mort."));
      walkingToMortCount++;

      // Check if we've seen the message three times in less than 20 seconds
      if (walkingToMortCount >= 3 && currentTime - lastWalkingToMortTime <= 40000) {
        // Reset the counter and timer
        walkingToMortCount = 0;
        lastWalkingToMortTime = currentTime;

        // Reissue the /warp and pathfinding commands here
        console.log("[Cvrsedd Racro] Restarting the task...");
        bot.chat('/warp dungeon_hub');

        await sleep(10000);

        // You can also reset the path here if needed
        bot.pathfinder.setGoal(new GoalBlock(-68.5, 123, 0.5));
      }

      // Update the timer
      lastWalkingToMortTime = currentTime;

      bot.pathfinder.setGoal(new GoalBlock(-68.5, 123, 0.5));
      await sleep(30000); // Adjust the interval for pathfinding updates
    }

    await sleep(10000);
    const target = bot.nearestEntity();
    if (target) {
      bot.attack(target);
      console.log(chalk.blue("[Cvrsedd Racro] Clicked on Mort."));
    } else {
      console.log(chalk.blue("[Cvrsedd Racro] No Target Found."));
    }

    await sleep(20000);
    // Check if the inventory GUI is open
    const inventoryOpen = isInventoryOpen(); // Implement your logic to check the inventory
    if (!inventoryOpen) {
      console.log("[Cvrsedd Racro] Inventory GUI not open, retrying...");
      continue;
    }

    await sleep(20000);
    // Check if the bot is at the specific coordinates
    const currentCoordinates = bot.entity.position;
    if (currentCoordinates.distanceTo(targetCoordinates) > 0.5) {
      console.log("[Cvrsedd Racro] Bot is not at the expected coordinates, restarting...");
      continue;
    }

    isBotBusy = false;
    break;
  }
}

await sleep(5000);
// Implement your logic to check if the inventory GUI is open
function isInventoryOpen() {
  // Add your logic here
  // You might need to access bot.inventory for this
  // For example, check if a specific slot in the inventory is visible
  // or use other criteria that apply to your specific situation.
  // Return true if the inventory is open, and false otherwise.
  return true; // Change this based on your logic
}

async function StartQueue() {
  // Check if the function is already running
  if (isStartQueueRunning) {
    console.log("StartQueue is already running, stopping the previous task.");
    stopCurrentTask();
  }

  isStartQueueRunning = true;

  let clickOrder = [48, 45, 32];
  let index = 0;

  // Define a function to check for the chat message
  const checkChatMessage = () => {
    const chatListener = (username, message) => {
      if (message === "Party Finder > Your party has been queued in the dungeon finder!") {
        bot.removeListener("chat", chatListener); // Remove the listener
        isStartQueueRunning = false; // Reset the flag
      }
    };
    bot.on("chat", chatListener);
  };

  // Function to stop the current task
  const stopCurrentTask = () => {
      bot.removeListener("chat", chatListener); // Remove the listener
        isStartQueueRunning = false;
  };

  // Function to retry the task
  const retryTask = async () => {
    console.log("Retrying the task...");
    stopCurrentTask(); // Stop the current task before retrying
    index = 0; // Reset the index
    await sleep(10000); // Adjust the delay between retries if needed
    StartQueue(); // Start the queue again
  };

  bot.on('windowOpen', async (window) => {
    try {
      const slot = clickOrder[index];
      await sleep(3000);
      window.requiresConfirmation = false;
      await bot.clickWindow(slot, 0, 0);
      console.log(chalk.greenBright(`[Cvrsedd Racro] Clicked on Slot ${slot}`));
      index++;
      if (index >= clickOrder.length) {
        index = 0;
      }

      // Delay for 20 seconds
      await sleep(30000);

      // Check for the chat message
      checkChatMessage();

      // Set a timeout to retry the task if the message doesn't appear
      const retryTimeout = setTimeout(retryTask, 50000); // Adjust the timeout duration as needed
      bot.once("message", () => {
        clearTimeout(retryTimeout); // Cancel the retry timeout if the message appears
      });
    } catch (error) {
      console.error('An error occurred:', error);
      console.log('Reconnecting to the server...');
      bot.quit();
      restartbot();
      index++;
      if (index >= clickOrder.length) {
        index = 0;
      }

      // Reset the flag when the function is done
      isStartQueueRunning = false;
    }
  });
}

            StartQueue();
        sneakEquipAndHitMort();
    });

      rl.close();
  } catch (error) {
    console.error(chalk.red(error));
    rl.close();
  }
 }

main();
