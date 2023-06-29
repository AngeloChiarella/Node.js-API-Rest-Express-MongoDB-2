import mongoose from "mongoose";

mongoose.connect("mongodb+srv://alura:123@alura.midotre.mongodb.net/alura-node");
// mongoose.connect(process.env.STRING_CONEXAO_DB);

let db = mongoose.connection;

export default db;