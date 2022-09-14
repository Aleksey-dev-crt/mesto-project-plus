import { Router } from 'express';
import { cardValidator, idValidator } from '../utils/requestValidators';
import { getCards, createCard, deleteCard, likeCard, dislikeCard } from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', cardValidator, createCard);
cardsRouter.delete('/:cardId', idValidator, deleteCard);
cardsRouter.put('/:cardId/likes', idValidator, likeCard);
cardsRouter.delete('/:cardId/likes', idValidator, dislikeCard);

export default cardsRouter;
