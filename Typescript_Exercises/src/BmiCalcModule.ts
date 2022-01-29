interface BmiResult {
    weight: number;
    height: number;
    bmi: string;
}

export class BmiCalculator {
    private verifyInpuParams = (params: (string|undefined)[]) : { weight: number, height: number } => {    
        let height = Number(params[0]);
        let weight = Number(params[1]);
    
        if (weight > 0 && height > 0) {
            return {
                weight, height
            }           
        } else {
            throw new Error('malformatted parameters');
        }
    }

    calculateBmi = (heightStr: string|undefined, weightStr: string|undefined) : BmiResult => {
        const { weight, height } = this.verifyInpuParams([ heightStr, weightStr ]);
        let bmi = weight/(Math.pow(height, 2)) * 10000;
        let bmiStatus = `Your BMI is ${bmi}: `;
    
        if (bmi < 18.5) {
            bmiStatus += 'Underweight';
        } else if (bmi < 25 && bmi >= 18.5) {
            bmiStatus += 'Healthy Weight';
        } else if (bmi < 30 && bmi >= 25) {
            bmiStatus += 'Overweight';
        } else {
            bmiStatus += 'Obese, go get some exercise!';
        }
    
        return {
            weight, height, bmi: bmiStatus
        }
    }
}