import mongoose from "mongoose";

const autorSchema = mongoose.Schema(
  {
    id: { type: String },
    nome: { 
      type: String, 
      required: [true, "O nome do autor e obrigatorio!"] 
    },
    nacionalidade: { type: String },
  },
  {
    versionKey: false, //    "__v": 0
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;