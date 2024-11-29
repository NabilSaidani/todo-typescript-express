import express, { Request, Response } from 'express';
import { serviceTodo } from '../services/todoservices';

const routeur = express.Router();

// Route GET pour récupérer tous les todos
routeur.get('/', (req: Request, res: Response) => {
  res.json(serviceTodo.getAll());
});

// Route GET pour récupérer un todo par ID
routeur.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "L'ID doit être un nombre valide" });
  }

  const todo = serviceTodo.obtenirUn(id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo non trouvé' });
  }

  res.json(todo);
});

// Route POST pour créer un nouveau todo
routeur.post('/', (req: Request, res: Response) => {
  const { titre, description } = req.body;

  if (!titre || typeof titre !== 'string') {
    return res.status(400).json({ message: 'Le titre est requis et doit être une chaîne de caractères' });
  }

  const nouveauTodo = serviceTodo.creer(titre, description);
  res.status(201).json(nouveauTodo);
});

// Route PUT pour mettre à jour un todo existant
routeur.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "L'ID doit être un nombre valide" });
  }

  const { titre, description, termine } = req.body;

  // Validation des données entrantes
  if (titre !== undefined && typeof titre !== 'string') {
    return res.status(400).json({ message: 'Le titre doit être une chaîne de caractères' });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ message: 'La description doit être une chaîne de caractères' });
  }

  if (termine !== undefined && typeof termine !== 'boolean') {
    return res.status(400).json({ message: 'Terminé doit être un booléen' });
  }

  const todoModifie = serviceTodo.update(id, { titre, description, completed });

  if (!todoModifie) {
    return res.status(404).json({ message: 'Todo non trouvé' });
  }

  res.json(todoModifie);
});

// Route DELETE pour supprimer un todo
routeur.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "L'ID doit être un nombre valide" });
  }

  const supprime = serviceTodo.delete(id);

  if (!supprime) {
    return res.status(404).json({ message: 'Todo non trouvé' });
  }

  res.status(204).send();
});

export default routeur;