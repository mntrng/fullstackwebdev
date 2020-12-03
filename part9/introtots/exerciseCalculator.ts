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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))