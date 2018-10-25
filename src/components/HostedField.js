import React from "react";

const HostedField = props => {
    return (
        <div className={'field-cc__container field-cc__container--' + props.fieldType + ' ' + (props.className ?  props.className : '')}>
            <div className={'field-cc field-cc--' + props.fieldType} id={'creditCard' + props.fieldType} placeholder={props.placeholder} onChange={props.onChange}></div>
            <div className="field-cc__error">{props.errorMessage ? props.errorMessage : ('Please enter a valid ' + props.fieldType.toLowerCase().replace(/-/g, ' '))}</div>
        </div>
        );
};

export default HostedField;