import express from "express";
import db from "./config/dbConnetc.js";
import livros from "./models/livro.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexao"))
db.once("open", () => {
    console.log("Conexao com banco feita com sucesso")
})

const app = new express();

app.use(express.json()) // interpretar oo que chega e transformar em um obj

routes(app);

export default app