import React from 'react';

export default function DeleteIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" {...props}>
            <path fill={props.color} d="M28 22.398L19.594 14 28 5.602 22.398 0 14 8.402 5.598 0 0 5.602 8.398 14 0 22.398 5.598 28 14 19.598 22.398 28z"/>
        </svg>
    )
}