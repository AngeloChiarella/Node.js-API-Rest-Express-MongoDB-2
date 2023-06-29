import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);

    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }

  };

  static listarPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        res.status(404).send({ message: " Id do Autor não localizado" });
      }

    } catch (erro) {
      if (erro instanceof mongoose.Error.CastError) {
        res.status(404).send({ message: "Dados fornecidos incorretamente" });
      } else {
        res.status(400).send({ message: "Id do Autor não localizado" });
      }
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new autores(req.body);
      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (error) {
      res.status(500).send({ message: "Falha ao cadastrar autor" });
    }
  };

  static atualizarAutor = (req, res) => {
    const id = req.params.id;
    autores.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Autor atualizado com sucesso!" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static excluirAutor = (req, res) => {
    const id = req.params.id;
    autores.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Autor removido com sucesso!" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };


}

export default AutorController;