interface InputValues {
    array: number[]
    target: number
}

const parseArguments = (args: string[]): InputValues => {
    if (args.length < 4) {
        throw new Error('Not enough arguments')
    } else {
        let arr = args.slice(2)
        
        if (arr.every( element => !isNaN(Number(element)) )) {
            const list = arr.map(element => Number(element))
            return {
                target: list[0],
                array: list.slice(1)
            }
        } else {
            throw new Error('Provided values were not numbers!')
        }
    }
}

interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (data: number[], target: number): Result => {
    let ratingDescription, rating
    const periodLength = data.length
    const trainingDays = data.reduce(
        (a, b) => (b === 0 ? a : a + 1), 0
    )
    const average = data.reduce((a, b) => a + b, 0) / periodLength
    if (average > target) {
        rating = 3
        ratingDescription = 'You should be proud of yourself!'
    } else if (average === target) {
        rating = 2
        ratingDescription = 'Well done!'
    } else {
        rating = 1
        ratingDescription = 'Not too bad. But you could try harder next time!'
    }

    return {
        periodLength,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    }
}

const { target, array } = parseArguments(process.argv)
console.log(calculateExercises(array, target))