class TokenProvider{
    constructor(){
        this.config = require("./config.json");
    }

    get id(){
        return this.config.client_id;
    }

    get secret(){
        return this.config.client_secret;
    }
}

class Random{
    next(max){
        return Math.floor(Math.random() * Math.floor(max));
    }
}

class App{
    constructor(tokenProvider){
        let discord = require("discord.js");
        this.client = new discord.Client();
        this.random = new Random();
        this.provider = tokenProvider;
        this.initialize();
    }

    initialize(){
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

const app = new App(new TokenProvider());
console.log("done");
