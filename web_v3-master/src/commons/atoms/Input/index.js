import { useState, useCallback, useEffect } from "react";

const Input = ({
    children,
    onEnter = () => { },
    onChange = () => { },
    ...props
}) => {
    const [value, setValue] = useState('');
    const onChangeIntern = useCallback(e => setValue(e.target.value), []);
    const onKeyDown = useCallback((key) => {
        if (key.keyCode === 13) {
            onEnter(value);
            setValue('');
        }
    }, [value]);
    
    useEffect(() => {
        onChange(value);
    }, [value]);

    return (
        <div className='Input-wrapper'>
            <input
                value={value}
                onChange={onChangeIntern}
                onKeyDown={onKeyDown}
                className="new-todo"
                {...props} />
        </div>
    );
}

export default Input;