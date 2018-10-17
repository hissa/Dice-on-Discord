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
            if (!this.provider.channelNames.includes(msg.channel.name)) {
                return;
            }
            if(!this.provider.trigger.includes(msg.content)){
                return;
            }
            let rand = this.random.next(this.provider.min, this.provider.max);
            // テンプレートを指定してセンドする
        });
        this.client.login(this.provider.secret);
    }
}

const app = new App(new ConfigurationProvider());
app.run();
console.log("running");
