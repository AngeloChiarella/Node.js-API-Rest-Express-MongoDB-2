import NaoEncontrado from "../erros/NaoEncontrado.js";
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

  static listarPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado"));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      res.status(500).send({ message: "Falha ao cadastrar autor" });
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Autor atualizado com sucesso!" });
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
    
      res.status(200).send({ message: "Autor removido com sucesso!" });
    } catch (erro) {
      next(erro);
    }
  };


}

export default AutorController;