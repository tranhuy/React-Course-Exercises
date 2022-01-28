interface BmiInput {
    weight: number;
    height: number;
}

const parseInputArgs = (args: string[]) : BmiInput => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    let height = Number(args[2]);
    let weight = Number(args[3]);

    if (!isNaN(weight) && !isNaN(height)) {
        return {
            weight,
            height
        }
    } else {
        throw new Error('Provided values were not numbers');
    }
}

const calculateBmi = (height: number, weight: number) : string => {
    let bmi = weight/(Math.pow(height, 2)) * 10000
    let bmiResult = `Your BMI is ${bmi}: `

    if (bmi < 18.5) {
        bmiResult += 'Underweight';
    } else if (bmi < 25 && bmi >= 18.5) {
        bmiResult += 'Healthy Weight';
    } else if (bmi < 30 && bmi >= 25) {
        bmiResult += 'Overweight';
    } else {
        bmiResult += 'Obese, go get some exercise!'
    }

    return bmiResult;
}

try {
    const { weight, height } = parseInputArgs(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage: string = '';

    if (error instanceof Error) {
        errorMessage = `ERROR: ${error.message}`;
    }

    console.log(errorMessage)
}