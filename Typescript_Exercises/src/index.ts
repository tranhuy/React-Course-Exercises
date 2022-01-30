import express from 'express';
import { BmiCalculator } from './BmiCalcModule';
import { parseInputArgs, calculateExercise }  from './ExerciseCalcModule';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {   
    const height = req.query.height as string;
    const weight = req.query.weight as string;
    const bmiCalc = new BmiCalculator();
    
    try {
        res.json(bmiCalc.calculateBmi(height, weight));
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message })
        }
    }       
})

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;

    try {
        res.json(calculateExercise(parseInputArgs(target, daily_exercises)));
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message })
        }
    }
})

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})