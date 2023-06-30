import livros from "../models/livro.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros
        .find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros
        .findById(id)
        .populate("autor", "nome")
        .exec();

      res.status(200).json(livroResultado);

    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;
      const livrosResultado = await livros.find({ "editora": editora });
      res.status(200).send(livrosResultado);
      
    } catch (erro) {
      next(erro);
    }
  };


  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Livro atualizado com sucesso!" });
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);

      res.status(200).send({ message: "Livro excluido com sucesso!" });
    } catch (erro) {
      next(erro);
    }
  };



}

export default LivroController;