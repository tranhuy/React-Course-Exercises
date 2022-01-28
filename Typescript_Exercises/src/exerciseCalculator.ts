interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ExerciseInput {
    target: number;
    trainingLog: Array<number>;
}

const parseInput = (args: Array<string>) : ExerciseInput => {
    if (args.length < 4) throw new Error('Not enough arguments');

    let inputArgs = args.slice(2).map(n => {
        if (isNaN(Number(n))) {
            throw new Error('Provided values were not all numbers');
        } 

        return Number(n);
    });

    let [ target, ...trainingLog ] = inputArgs

    return {
        target,
        trainingLog
    }
}

type rating = {
    score: number,
    description: string
}

const calculateExercise = (target: number, trainingLog: Array<number>) : ExerciseResult => {
    let periodLength = trainingLog.length;
    let trainingDays = trainingLog.filter(n => n !== 0).length;
    let average = trainingLog.reduce((n1, n2) => n1 + n2)/periodLength;
    let success: boolean
    let rating: rating

    if (average < target) {
        success = false;
        rating = { score: 1, description: 'Failed to meet target.  Work harder!' }
    } else if (average === target) {
        success = true;
        rating = { score: 2, description: 'Target met.  Good work' }
    } else {
        success = false;
        rating = { score: 1, description: 'Exceeded target.  Excellent work!' }
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating: rating.score,
        ratingDescription: rating.description,
        target,
        average
    }
}

try {
    const { target, trainingLog } = parseInput(process.argv);
    console.log(calculateExercise(target, trainingLog));
} catch (error: unknown) {
    let errorMessage: string = '';

    if (error instanceof Error) {
        errorMessage = `ERROR: ${error.message}`;
    }

    console.log(errorMessage)
}