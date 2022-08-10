import { useEffect, useState } from 'react'

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [telError, setTelError] = useState(false);
    const [inputValid, setInputValid] = useState(true);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'isTel':
                    const regExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                    regExp.test(String(value).toLowerCase()) ? setTelError(false) : setTelError(true)
                    break;
                default:
                    break;
            }
        }
    }, [value, validations])

    useEffect(() => {
        if (isEmpty || minLengthError || telError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, minLengthError, telError])

    return {
        isEmpty,
        minLengthError,
        telError,
        inputValid
    }
}

export default function useInput(initialValue, validations) {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations);

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    const clearValue = () => {
        setValue("")
        setDirty(false)
    }

    return {
        value,
        onChange,
        onBlur,
        clearValue,
        isDirty,
        ...valid
    }
}
