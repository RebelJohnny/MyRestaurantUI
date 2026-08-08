import { useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce";
import MDInput from "../MDInput";

const FieldArrayInput = ({ inputType = "text", value, onChange, ...props }) => {
    const [type, setType] = useState(inputType)
    const [innerValue, setInnerValue] = useState(value);

    useEffect(() => {
        if (value) {
            setInnerValue(value);
        } else {
            setInnerValue('');
        }
    }, [value]);

    const debouncedHandleOnChange = useDebouncedCallback(
        (event) => {
            if (onChange) {
                onChange(event);
            }
        },
        300
    );

    const handleOnChange = useCallback((event) => {
        event.persist();

        const newValue = event.currentTarget.value;
        setInnerValue(newValue);
        debouncedHandleOnChange(event);
    }, []);

    return (
        <MDInput
            className="form-input"
            type={type}
            autoComplete="off"
            value={innerValue}
            onChange={handleOnChange}
            {...props}
        />
    )
}
export default FieldArrayInput