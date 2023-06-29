import express from "express";
import AutorController from "../controllers/autoresController.js";

const router = express.Router();

router // param1 Rota, param2 Acao, 
    .get("/autores", AutorController.listarAutores)
    .get("/autores/:id", AutorController.listarPorId)
    .post("/autores", AutorController.cadastrarAutor)
    .put("/autores/:id", AutorController.atualizarAutor)
    .delete("/autores/:id", AutorController.excluirAutor)

export default router;