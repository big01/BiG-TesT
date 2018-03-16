const Discord = require('discord.js');
const client = new Discord.Client();
const YTDL = require('ytdl-core');

var servers = {};

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {fliter: 'audionly'}));

    server.queue.shift();

    server.dispatcher.on('end', function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

client.on('ready', () => {
    console.log('© ︎︎︎ ︎︎︎PanDa...シ| PG#5795  ™');
});

var PREFIX = 'PREFIX_HERE';

client.on('message', message => {

var args = message.content.substring(PREFIX.length).split(' ');

    switch (args[0].toLowerCase()) {
        case 'play':
            if (!args[1]) {
                message.channel.sendMessage('Please provide a link');
                return;
            }

            if (!message.member.voiceChannel) {
                    message.channel.sendMessage('You must be in a voice channel');
                return;
            }

            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;
            case 'skip':
            var server = servers[message.guild.id];

            if(server.dispatcher) server.dispatcher.end();
                break;

                case 'stop':
                    var server = server = servers[message.guild.id];

                    if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                    break;
    }
});

client.login('NDI0MzE3NzAyNDUwOTcwNjY1.DY3IMQ.XUF8hsvepgeEY05buHMKLlMY6_8');
