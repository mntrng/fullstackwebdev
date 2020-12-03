interface InputValues {
    weight: number
    height: number
}

const parseArguments = (args: Array<string>): InputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        weight: Number(args[2]),
        height: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
}

export const calculateBmi = (weight: number, height: number): string => {
    const bmi = weight / (height / 100) ** 2

    switch (true) {
        case bmi < 18.5:
            return "Underweight"
        case bmi < 25:
            return "Normal (healthy weight)"
        case bmi < 30:
            return "Overweight"
        case bmi >= 30:
            return "Obese"
        default:
            return "Nope"
    }
}

const { weight, height } = parseArguments(process.argv)
console.log(calculateBmi(weight, height))