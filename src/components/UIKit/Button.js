import React from 'react'

export default function Button({classes, children, onClick, ...attrs}) {
    let computedClasses = classes;
    return (
        <button className={computedClasses} onClick={onClick} {...attrs}>
            {children}
        </button>
    )
}
