const express = require('express');
const { isAuthorised, protectRoute } = require('../Controller/authController');
const planRouter = express.Router();

const {getAllPlan, getPlan, createPlan, updatePlan, deletePlan, top3plans} = require('../Controller/planController')


planRouter
.route('/')
.get(getAllPlan)

planRouter
.route('/top3')
.get(top3plans)

planRouter.use(protectRoute)
planRouter
.route('/:id')
.get(getPlan)

planRouter.use(isAuthorised(['admin', 'reastaurentowner']))
planRouter
.route('/')
.post(createPlan)

planRouter
.route('/:id')
.patch(updatePlan)
.delete(deletePlan)

module.exports = planRouter;