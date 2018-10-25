import React from "react";

const HostedField = props => {
    return (
        <div className={'field-cc__container field-cc__container--' + props.fieldType + ' ' + (props.className ?  props.className : '')}>
            <div className={'field-cc field-cc--' + props.fieldType} id={'creditCard' + props.fieldType}></div>
            <div className="field-cc__error">{props.errorMessage ? props.errorMessage : ('We are not able to validate this field. Can you check it again?')}</div>
        </div>
        );
};

export default HostedField;