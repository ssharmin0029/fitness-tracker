const router = require('express').Router();
const Workout = require('../../models/workout.js');

router.get('/', (req, res) => {
    console.log(Workout)
    Workout.find({})
    .then(newWorkout => {
        res.json(newWorkout);
    }) 
    .catch(err => {
        res.status(400).json(err);
    });
});

// View the combined weight of multiple exercises from the past seven workouts on the `stats` page.
// View the total duration of each workout from the past seven workouts on the `stats` page.

// Add new exercises to a new workout plan.
router.post('/', ({body}, res) => {
    Workout.create(body)
    .then(newExercises => {
        res.json(newExercises);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// Add exercises to the most recent workout plan.
router.put('/:id', ({params, body}, res) => {
    Workout.findOneAndUpdate(
        {_id: params.id},
        {$push: {exercises: body}},
        {upsert: true, useFindandModify: false}
    )
    .then(newExercise => {
        res.json(newExercise);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;