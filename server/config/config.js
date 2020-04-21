process.env.TOKEN_TIME = 60 * 60 * 24 * 30;
process.env.TOKEN_SKEY = process.env.TOKEN_SKEY || "my-token-secret-key-123";

process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || "dev";
let urlDB;
if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/cafe";
} else {
    urlDB = process.env.URL_MONGO;
}

process.env.URLDB = urlDB;

process.env.CLIENT_ID = process.env.CLIENT_ID || '547168320304-dadreg1q0gs20vrmg7intrbtuhqdt35l.apps.googleusercontent.com';