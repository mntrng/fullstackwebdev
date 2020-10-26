import React from 'react';

const Header = ({ courseName }) => {
    return (
      <h1>{courseName}</h1>
    )
}

const Component = ({ courseName, noExe }) => {
    return (
      <div>
        {courseName} {noExe}
      </div>
    )
}

const Total = ( {course} ) => {

    const sum = course.parts.reduce((a, b) => a + b.exercises, 0);

    return(
      <p><strong>Total number of exercises: {sum}</strong></p>
    )
}

const Course = ( {course} ) => {

    return (
        <div>
            <Header courseName = {course.name}/>

            {course.parts.map(part => (
                <Component key = {part.id} courseName = {part.name} noExe = {part.exercises} />
            ))}

            <Total course = {course} />
        </div>
    )
}

export default Course;