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

console.log(calculateBmi(180, 74))