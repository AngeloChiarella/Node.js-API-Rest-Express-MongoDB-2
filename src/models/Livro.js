import mongoose from "mongoose";

const livroSchema = mongoose.Schema(
  {
    id: { type: String },
    titulo: {
      type: String,
      required: [true, "O nome do livro e obrigatorio!"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O autor e obrigatorio!"]
    },
    editora: {
      type: String,
      required: [true, "O nome da editora e obrigatorio!"]
    },
    numeroPaginas: { type: Number }
  }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;