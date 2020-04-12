import React from 'react';
import Home from './Home';
import { shallow } from 'enzyme';


let wrapped;

beforeEach(() => {
  wrapped = shallow(<Home />);
});


it('has a text input that users can type in', () => {
  wrapped.find('input[type="text"]').simulate('change', {
      target: {value: 'new name'}
  });

  wrapped.update();

  expect(wrapped.find('input[type="text"]').prop('value')).toEqual('new name');

});

it('has a select that users can modify', () => {
    wrapped.find('select').simulate('change', {
        target: {value: 1}
    });
  
    wrapped.update();
  
    expect(wrapped.find('select').prop('value')).toEqual(1);
  
  });

  it('has a checkbox that users can modify', () => {
    wrapped.find('input[type="checkbox"]').simulate('change', {
        target: {checked: true}
    });
  
    wrapped.update();
  
    expect(wrapped.find('input[type="checkbox"]').prop('checked')).toEqual(true);
  });

