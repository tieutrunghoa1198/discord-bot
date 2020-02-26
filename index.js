const Discord = require('discord.js-commando');
const bot = new Discord.Client();
const TOKEN = 'NTI0OTIwOTU4MTc2MzI5NzM4.DvvISw.zG1uvjS7gAYNu5y1zZ59b1Ow2bo';
var name = ['kien', 'ninh', 'toan to', 'canh', 'canh muc', 'cảnh', 'bua', 'bứa', 'bita'];
var quest = ['ai đẹp trai nhất hạ long', 'lộc lí', 'hôm nay sinh nhật ai', '75 củ đã vô địch sever chưa', 'tí nữa tao comeback', 'hôm nay ăn gì'];
var current = new Date();
// let time = 'Bây giờ là: ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();
bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerCommandsIn(__dirname + '/commands');
bot.registry.registerDefaults();

global.servers =[];

bot.login(TOKEN);

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
    if(message.content == quest[1])
    {
        message.channel.sendMessage('chào chú công an');
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


