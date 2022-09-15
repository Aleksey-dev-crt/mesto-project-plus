import { Router } from 'express';
import { cardValidator, cardIdValidator } from '../utils/requestValidators';
import { getCards, createCard, deleteCard, likeCard, dislikeCard } from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', cardValidator, createCard);
cardsRouter.delete('/:cardId', cardIdValidator, deleteCard);
cardsRouter.put('/:cardId/likes', cardIdValidator, likeCard);
cardsRouter.delete('/:cardId/likes', cardIdValidator, dislikeCard);

export default cardsRouter;
