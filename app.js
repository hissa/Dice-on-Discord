class ConfigurationProvider{
    constructor(){
        this.config = require("./config.json");
    }

    get id(){
        return this.config.client_id;
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

    get trigegr(){
        return this.config.trigger_strings;
    }

    get randomMin(){
        return this.config.random_min;
    }

    get randomMax(){
        return this.config.random_max;
    }
}

class DumyConfigurationProvider{
    constructor(){
        this.id = "";
        this.secret = "";
        this.channelNames = [];
        this.templateString = "";
        this.trigger = "";
        this.randomMax = 0;
        this.randomMin = 0;
    }
}

class Random{
    // next(max){
    //     return Math.floor(Math.random() * Math.floor(max));
    // }
    next(min, max){
        return Math.floor(Math.random() * Math.floor(max + min)) - min;
    }
}

class App{
    constructor(configurationProvider){
        let discord = require("discord.js");
        this.client = new discord.Client();
        this.random = new Random();
        this.provider = configurationProvider;
    }

    run(){
        this.client.on("message", msg => {
            if (msg.channel.name != "ワードウルフ") {
                return;
            }
            if (msg.content == "seed") {
                let rand = this.random.next(10000)
                msg.channel.send(`--${rand}----------------`);
            }
            if (msg.content == "line") {
                let rand = this.random.next(10000)
                msg.channel.send(`-------------------------`);
            }
        });
        this.client.login(this.provider.secret);
    }
}

const app = new App(new DumyConfigurationProvider());
app.run();
console.log("running");
