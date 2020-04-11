const Discord = require('discord.js-commando');
const bot = new Discord.Client();
const token = 'NTI0OTIwOTU4MTc2MzI5NzM4.Xlan2g.38w-Ja7bs9hougKv488SM9T37ZE';
var name = ['kien', 'ninh', 'toan to', 'canh', 'canh muc', 'cảnh', 'bua', 'bứa', 'bita'];
var quest = ['hôm nay ăn gì', 'ai đẹp trai nhất hạ long', 'lộc lí', 'hôm nay sinh nhật ai', '75 củ đã vô địch sever chưa', 'tí nữa tao comeback', 'hôm nay ăn gì'];
var current = new Date();
//new semester is on new line
bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerCommandsIn(__dirname + '/commands');
bot.registry.registerDefaults();

global.servers =[];

bot.login(token);

bot.on('ready', () => {
    console.log('Server is on!!');
});

bot.on('message', (message) => {
    for (let index = 0; index < name.length; index++) 
    {
        if(message.content == name[index])
        {
            message.channel.sendMessage('Địt con mẹ ' + name[index]);
            break;
        }
    }
    if(message.content == quest[0])
    {
        message.channel.sendMessage('ăn cứt');
    }
    if(message.content == quest[2])
    {
        message.channel.sendMessage('Hôm nay sinh nhật chú công an!!!');
    }
    if(message.content == quest[3])
    {
        message.channel.sendMessage('vô địch thiên hạ');
    }
    if(message.content == quest[4])
    {
        message.channel.sendMessage('oke');
    }
});


