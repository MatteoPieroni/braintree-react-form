import React from 'react';
import ReactDOM from 'react-dom';
import CardForm from './CardForm';
import HostedField from './HostedField';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe("app working", () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CardForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

Enzyme.configure({ adapter: new Adapter() });

describe("app letting me write", () => {
    it('receives inputs', () => {
        const input = shallow(<HostedField fieldType="Cvv" />);

        expect(input.value).ToEqual('');
        input.find('input').simulate('change');
        expect(input.value).not.ToEqual('');
    })
});
