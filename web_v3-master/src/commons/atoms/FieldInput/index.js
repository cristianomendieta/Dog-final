import './index.less';
import Input from '../Input';
import { useField } from 'react-final-form';

const FieldInput = ({
    children,
    label,
    name,
    placeholder,
    ...props
}) => {
    const { input, meta } = useField(name);

    return (
        <div className='FieldInput-wrapper'>
            <div style={{
                position: 'relative',
            }}>
                <label style={{
                    position: 'absolute',
                    left: 50,
                    fontSize: 15,
                    fontWeight: 'inherit',
                    top: 2,
                }} htmlFor="user-name">{label}</label>
                <Input
                    onChange={(value) => {
                        input.onChange(value);
                    }}
                    value={input.value}
                    {...props}
                    id="user-name"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}

export default FieldInput;