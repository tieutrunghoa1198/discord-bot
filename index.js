require('dotenv').config()
const { Client, Collection } = require('discord.js');
const BOT = new Client();
const config = require('./config/config')
const TOKEN = process.env.TOKEN
//Attaching config to BOT so it could be accessed anywhere 
BOT.config = config

//Once the BOT is ready, then do smt.....
BOT.once('ready', () => {
    console.log(`Logged in as `);
});

// Creating command and aliases collection.
["commands", "aliases"].forEach(x => BOT[x] = new Collection());

BOT.on('message', msg => {
    if (msg.author.BOT) return
    if (msg.content.toLowerCase() === "hello") msg.channel.send(` Em có sai với ai đi nữa, có làm cái gì đi nữa, nếu có phải trả giá thì em cũng xin chấp nhận. Bởi vì anh biết đấy, ra xã hội làm ăn bươn chải, liều thì ăn nhiều, không liều thì ăn ít. Muốn thành công thì phải chấp nhận chịu qua đắng cay ngọt bùi. Làm ăn muốn kiếm được tiền phải chấp nhận mạo hiểm, nguy hiểm một tý, nhưng trong tầm kiểm soát. Xã hội này chỉ có làm, chịu khó, cần cù thì bù siêng năng. Chỉ có làm thì mới có ăn. Những cái loại không làm mà đòi có ăn thì chỉ có ăn đầu buồi, ăn cứt.`)
    // BOT.commands
})



//Login the BOT with provided token in config file 
BOT.login(TOKEN).catch(err => {
    console.log("Cannot login \n")
    console.log(err)
});


