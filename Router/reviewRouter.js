const express = require('express');
const reviewRouter = express.Router();
const { isAuthorised, protectRoute } = require('../Controller/authController');
const {getAllReviews, top3reviews, getReview, createReview, updateReview, deleteReview} = require('../Controller/reviewController')

reviewRouter
.route('/')
.get(getAllReviews)

reviewRouter
.route('/top3')
.get(top3reviews)

reviewRouter
.route('/:id')
.get(getReview)

reviewRouter.use(protectRoute)
reviewRouter
.route('/:plan')
.post(createReview)

reviewRouter
.route('/:id')
.patch(updateReview)
.delete(deleteReview)

module.exports = reviewRouter;
