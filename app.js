class ConfigurationProvider{
    constructor(){
        this.config = require("./config.json");
    }

    get secret(){
        return this.config.client_secret;
    }

    get channelNames(){
        return this.config.channel_names;
    }

    get templateString(){
        return this.config.template_string;
    }

    get triggers(){
        return this.config.trigger_strings;
    }

    get randomMin(){
        return this.config.random_min;
    }

    get randomMax(){
        return this.config.random_max;
    }
}

class Random{
    next(min, max){
        // 間違ってません？
        return Math.floor(Math.random() * Math.floor(max + min)) - min;
    }
}

class App{
    constructor(configuration){
        this.targetChannels = configuration.channelNames;
        this.template = configuration.templateString;
        this.triggers = configuration.triggers;
        this.randomMax = configuration.randomMax;
        this.randomMin = configuration.randomMin;
        this.random = new Random();
    }

    hasResponce(text, channel){
        if(!this.targetChannels.includes(channel)){
            return false;
        }
        if(!this.triggers.includes(text)){
            return false;
        }
        return true;
    }

    publish(){
        let rand = this.random.next(this.randomMin, this.randomMax);
        return this.template.replace(/\$rnd/, rand);
    }
}

let discord = require("discord.js");
let client = new discord.Client();
let provider = new ConfigurationProvider();
const app = new App(provider);
client.on("message", msg => {
    if(app.hasResponce(msg.channel)){
        msg.channel.send(app.publish());
    }
});
client.login(provider.secret);
console.log("Connecting...");
