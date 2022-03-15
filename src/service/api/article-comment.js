"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const commentValidator = require(`./middlewares/comment-validator`);

const AUTHOR_ID = 1;

module.exports = (app, commentService) => {
  const articleCommentsRoutes = new Router({mergeParams: true});

  app.use(`/:articleId/comments`, articleCommentsRoutes);

  articleCommentsRoutes.get(`/`, async (req, res, next) => {
    try {
      const {articleId} = req.params;

      const comments = await commentService.findAllByArticleId(Number(articleId));

      res.status(HttpCode.OK).json(comments);
    } catch (error) {
      next(error);
    }
  });

  articleCommentsRoutes.post(`/`, commentValidator, async (req, res, next) => {
    try {
      const {articleId} = req.params;

      const newComment = await commentService.create({
        ...req.body,
        articleId: Number(articleId),
        authorId: AUTHOR_ID
      });

      res.status(HttpCode.CREATED).json(newComment);
    } catch (error) {
      next(error);
    }
  });
};
