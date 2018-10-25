import React from 'react';
import client from 'braintree-web/client';
import hostedFields from 'braintree-web/hosted-fields';
import HostedField from './HostedField';

class CardForm extends React.Component {



    //-------------------------------------------------------------------------------
    // Constructor : CardForm
    // Description : Initialises the state of the payment details form.
    //-------------------------------------------------------------------------------
    constructor(props) {
        super(props);

        this.state = {
            creditCardFormLoaded: false,
            hostedFieldInstance: null,
            sendingInfoToServer: false,
            error: '',
        };
        
        this.createBraintreeClient = this.createBraintreeClient.bind(this);
        this.createHostedFields = this.createHostedFields.bind(this);
        this.sendCreditCardDataToServer = this.sendCreditCardDataToServer.bind(this);
        this.submitCreditCard = this.submitCreditCard.bind(this);
    }

    componentDidMount() {
        this.createBraintreeClient(this.props.authKey);
    }

    //-------------------------------------------------------------------------------
    // Method       : createBraintreeClient
    // Description  : Method to create Braintree client session
    //                (Braintree call)
    //-------------------------------------------------------------------------------
    createBraintreeClient(clientAuth) {
        client
            .create({
                authorization: clientAuth,
            })
            .then(receivedClientInstance => {

                this.createHostedFields(receivedClientInstance);

            })
            .catch(err => console.log(err));
    }

    //-------------------------------------------------------------------------------
    // Method       : createHostedFields
    // Description  : Method to create hosted fields 
    //                (Braintree call)
    //-------------------------------------------------------------------------------
    createHostedFields(clientInstance) {
        hostedFields
            .create({
                client: clientInstance,
                styles: {
                    'input': 'input',
                    'invalid': 'not-valid',
                    'valid': 'valid',
                },
                fields: {
                    number: {
                        selector: '#creditCardNumber',
                        placeholder: 'Card Number',
                    },
                    cvv: {
                        selector: '#creditCardCvv',
                        placeholder: 'CVV',
                    },
                    expirationMonth: {
                        selector: '#creditCardExpiration-Month',
                        placeholder: 'MM',
                    },
                    expirationYear: {
                        selector: '#creditCardExpiration-Year',
                        placeholder: 'YY',
                    }
                }
            })
            .then(receivedHostedFieldInstance => {
                this.setState({
                    creditCardFormLoaded: true,
                    hostedFieldsInstance: receivedHostedFieldInstance,
                })
            })
    }

    //-------------------------------------------------------------------------------
    // Method       : sendCreditCardDataToServer
    // Description  : Method to tokenize credit card data and send nonce to server
    //                (Braintree call)
    //-------------------------------------------------------------------------------
    sendCreditCardDataToServer(dataToSend) {

        // the data to send to create payment method url
        var data = {
            nonce: '',
            deviceData: '',
        }

        data.nonce = dataToSend.nonce;

        // Your own send data function

        console.log('Great job!');
    };

    //-------------------------------------------------------------------------------
    // Method       : submitCreditCard
    // Description  : Method to tokenize credit card data and send nonce to server
    //                (Braintree call)
    //-------------------------------------------------------------------------------
    submitCreditCard(event, cb = this.sendCreditCardDataToServer) {
        if (event && event.type === 'submit')
            event.preventDefault();

        this.setState({
            sendingInfoToServer: true
        });

        this.state.hostedFieldsInstance
            .tokenize()
            .then(payload => {
                cb(payload);
                this.setState({
                    sendingInfoToServer: false
                });
            })
            .catch(err => {
                this.setState({
                    sendingInfoToServer: false
                });
                if (err.code === "HOSTED_FIELDS_FIELDS_EMPTY") {
                    this.setState({
                        error: 'Please insert your credit card informations'
                    });
                }
            });
    }

    //-------------------------------------------------------------------------------
    // Method       : render
    // Description  : Method to display the payment details form.
    //-------------------------------------------------------------------------------
    render() {

        const showButton = this.props.buttonRequested;
        const error = this.state.error;
        const disabled =
            !this.state.creditCardFormLoaded ||
            this.state.sendingInfoToServer;
        const sendingInfoToServer = this.state.sendingInfoToServer;

        // used to check if a prop has been passed down to show the submit button
        const checkButton = () => {
            if (showButton === true)
                return (
                    <div className="field-cc__container">
                        <button onClick={this.props.onSubmit ? this.props.onSubmit : this.submitCreditCard} disabled={disabled} className={sendingInfoToServer ? 'loading' : ''}>{this.props.buttonText ? this.props.buttonText : 'Store my CC info safely!'}</button>
                    </div>
                )
        }

        return (
            <div className="credit-card-form__wrapper">

                <div className="credit-card-form__container">

                    <div className="field-cc__wrapper--smaller-fields">
                        <HostedField fieldType="Number" errorMessage="Uh-oh! Looks like your credit card can only be accepted on Mars." />
                        <HostedField fieldType="Cvv" />
                    </div>
                    <div className="field-cc__wrapper--smaller-fields">
                        <p>Expiry date</p>
                        <HostedField fieldType="Expiration-Month" errorMessage="Please enter a valid expiry date" />
                        <HostedField fieldType="Expiration-Year" errorMessage="Please enter a valid expiry date" />
                    </div>
                    <div className="field-cc__container">
                        <input className="field-cc field-cc--creditCard-Name" type="text" name="creditCardName" placeholder="Your Name" />
                    </div>
               
                    {error}

                    {checkButton()}

                </div>
            </div>
        )
    }
}

export default CardForm;