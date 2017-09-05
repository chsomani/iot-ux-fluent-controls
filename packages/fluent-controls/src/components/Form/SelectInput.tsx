import * as React from 'react'; 
import * as classNames from 'classnames/bind';
const css = classNames.bind(require('./SelectInput.scss'));

export interface SelectInputType {}

export interface SelectInputState {
    cancelFocused: boolean;
}

export interface SelectOption {
    /** Text label to show as the select box option */
    label: string;
    /** Value of select box option */
    value: any;
}

export interface SelectInputProps extends React.Props<SelectInputType> {
    /** HTML form element name */
    name: string;
    /** 
     * Current value of HTML select element
     * 
     * This must be an Object that is in `SelectInputProps.options`
     */
    value: any;
    /** 
     * List of HTML select element options in the format:
     * 
     * `{
     *     label: string,
     *     value: any
     * }`
     */
    options: SelectOption[];
    
    /** Apply error styling to input element */
    error?: boolean;
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;

    /** Callback for HTML select element onChange events */
    onChange: (newValue: any) => void;
}

/**
 * Low level select combo box control
 * 
 * IMPORTANT: The options provided to this control must all be UNIQUE. The 
 * `value` property of option tags is the numerical index of the option in
 * `SelectInput.options` so `SelectInput.value` is compared to each value in
 * `options` (===) to decide which option is the one currently selected.
 * 
 * (Use the `SelectField` control instead when making a form with standard styling)
 * 
 * @param props Control properties (defined in `SelectInputProps` interface)
 */
export const SelectInput = (props: SelectInputProps) => {
    const containerClass = css('combo-container');
    const comboClass = css(
        'combo', {'error': props.error}
    );
    const arrowClassName = css(
        'arrow', 'icon icon-chevronDown4Legacy'
    );

    let value;
    const options = props.options.map((opt, index) => {
        if (opt.value === props.value) {
            value = index;
        }
        return <option value={index} key={index}>{opt.label}</option>;
    });

    const onChange = (event) => {
        const index = parseInt(event.target.value);
        const value = props.options[index].value;
        props.onChange(value);
    };

    return (
        <div className={containerClass}>
            <select 
                className={comboClass}
                value={value}
                onChange={onChange}
                disabled={props.disabled}
            >
                {options}
            </select>
            <span className={arrowClassName} />
        </div>
    );
};