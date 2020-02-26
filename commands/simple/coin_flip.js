const commando = require('discord.js-commando');


class CoinFlipCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'flip',
            group: 'simple',
            memberName: 'flip',
            description: 'Flip a coin'
        });
    }

    async run(message, args){
        var chance = Math.floor(Math.random()*100);
        if(chance % 2 == 0){
            console.log(chance);
            message.channel.sendMessage('Even number, ' + chance);
        }else {
            console.log(chance);
            message.channel.sendMessage('Odd number, ' + chance);
        }
    }
}

module.exports = CoinFlipCommand;