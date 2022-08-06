import React from 'react'

export default function Button({ classes, loading, disabled, children, onClick, ...attrs }) {
    let computedClasses = classes;
    if (disabled) computedClasses += ' button_disabled';

    return (
        <button disabled={disabled} className={computedClasses} onClick={onClick} {...attrs}>
            {loading ?
                <div>
                    ...
                </div>
                :
                children
            }
        </button>
    )
}
