import React from 'react';
import App from './App';
import Game from './components/Game/Game';
import { shallow } from 'enzyme';

it('has a Game Box', () => {
  const wrapped = shallow(<App />);
  expect (wrapped.find(Game).length).toEqual(1);;
});
