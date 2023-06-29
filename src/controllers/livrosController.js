import livros from "../models/livro.js";

class LivroController {

  static listarLivros = async (req, res) => {
    try {
      const livrosResultado = await livros
        .find()
        .populate("autor");
      res.status(200).json(livrosResultado);
    
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listarPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros.findById(id);
      res.status(200).json(livroResultado);

    } catch (error) {
      res.status(400).json({ message: `${error.message} - id do livro nao localizado.` });
    }
  };

  static listarLivroPorEditora = (req, res) => {
    const editora = req.query.editora;

    livros.find({ "editora": editora }, {}, (err, livros) => {
      res.status(200).send(livros);
    });


  };

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);
      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (error) {
      res.status(500).send({ message: "Falha ao cadastrar livro" });
    }
  };

  static atualizarLivro = (req, res) => {
    const id = req.params.id;
    livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro atualizado com sucesso!" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static excluirLivro = (req, res) => {
    const id = req.params.id;
    livros.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro removido com sucesso!" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };



}

export default LivroController;