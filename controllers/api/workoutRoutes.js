const router = require('express').Router();
const Workout = require('../../models/workout.js');

router.get('/', (req, res) => 
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        },
    ])
        .sort({date: -1})
        .then(lastWorkout => {
            res.json(lastWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
);

router.get('/range', (req, res) => 
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"},
                combinedWeight: {$sum: "$exercises.weight"}
            }
        },
    ],
    (err, data) => (err ? res.send(err) : res.send(data))
    )
);

router.post('/', ({body}, res) => {
    Workout.create(body)
    .then(newExercises => {
        res.json(newExercises);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put('/:id', ({params, body}, res) => {
    Workout.findOneAndUpdate(
        {_id: params.id},
        {$push: {exercises: body}},
        // {upsert: true, useFindandModify: false}
    )
    .then(newExercise => {
        res.json(newExercise);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;