import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map(part => 
                <div key={part.name}><Part part={part} /></div>
            )}
        </div>
    );
}

export default Content;