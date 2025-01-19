const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { clientId } = require('./config.json');
require('dotenv').config();

const commands = [];
const loadCommands = (dir) => {
  const readDirRecursive = (directory) => {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
      const fullPath = path.join(directory, file);
      if (fs.statSync(fullPath).isDirectory()) {
        readDirRecursive(fullPath); 
      } else if (file.endsWith('.js')) {
        const command = require(fullPath);
        if (command.data) { 
          commands.push(command.data.toJSON());
        }
      }
    });
  };

  const commandDir = path.join(__dirname, 'function', dir); 
  readDirRecursive(commandDir); 
};

const deployCommands = async () => {
  loadCommands('slashcommands');  
  loadCommands('contextmenu');   

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    console.log('コマンドの登録を開始します...');

    await rest.put(
      Routes.applicationCommands(clientId), 
      { body: commands }
    );

    console.log('コマンドの登録が完了しました！');
  } catch (error) {
    console.error(error);
  }
};

module.exports = deployCommands; 