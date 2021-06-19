const router = require('express').Router();
const Workout = require('../../models');

// // Add new exercises to a new workout plan.
// router.post('/', ({body}, res) => {
//     Workout.create(body)
//     .then(newWorkout => {
//         res.json(newWorkout);
//     })
//     .catch(err => {
//         res.status(400).json(err);
//     });
// });

// // Add exercises to the most recent workout plan.
// router.put('/:id', ({params, body}, res) => {
//     Workout.findOneAndUpdate(
//         {_id: params.id},
//         {$push: {exercises: body}},
//         {upsert: true, useFindandModify: false}
//     )
//     .then(newWorkout => {
//         res.json(newWorkout);
//     })
//     .catch(err => {
//         res.status(400).json(err);
//     });
// });

module.exports = router;