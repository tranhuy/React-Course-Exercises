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

type rating = {
    score: number,
    description: string
}

export const parseInputArgs = (targetArg: number, logArg: Array<string>) : ExerciseInput => {
    if (!targetArg || !logArg?.length) {
        throw new Error('parameters missing');
    }

    let inputArgs = [targetArg, ...logArg].map(n => {
        if (isNaN(Number(n))) {
            throw new Error('malformatted parameters');
        } 

        return Number(n);
    });

    let [ target, ...trainingLog ] = inputArgs

    return {
        target,
        trainingLog
    }
}

export const calculateExercise = (exerciseParams: ExerciseInput) : ExerciseResult => {
    const { target, trainingLog } = exerciseParams;
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
        success = true;
        rating = { score: 3, description: 'Exceeded target.  Excellent work!' }
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