import { Router } from 'express';
import { addMovie, getMovies, updateMovie, deleteMovie} from '../controllers/watchlistController';

const router = Router();

router.post('/', addMovie);
router.get('/', getMovies);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
