import React from 'react'

export default function Input({ classes, useInputData, name, ...attrs }) {

    let computedClasses = `input-${name}`;
    if (useInputData.isDirty && !useInputData.inputValid) {
        computedClasses += ' input_warning'
    }
    if (classes) computedClasses += ' ' + classes

    return (
        <input name={name} value={useInputData.value}
            onChange={(e) => useInputData.onChange(e)}
            onBlur={(e) => useInputData.onBlur(e)}
            className={computedClasses}
            {...attrs} />
    )
}
