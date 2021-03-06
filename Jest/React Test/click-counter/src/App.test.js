import React from 'react'
import App from './App';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new EnzymeAdapter() })

// 그냥 나중을 위한 JS doc, 쓰면 미래에 좋을 수도 있는..?
/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App/>)

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`)

test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
})
test('renders button', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})
test('renders couter display', () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.length).toBe(1)
})
test('counter starts at 0', () => {
  const wrapper = setup()
  const count = findByTestAttr(wrapper, "count").text()
  expect(count).toBe("0")
})
test('clicking on button increase couter display', () => {
  const wrapper = setup()
  // find the button
  const button = findByTestAttr(wrapper, 'increment-button')
  // click the button
  button.simulate('click')
  // find the display, and test that the number has been incremented
  const count = findByTestAttr(wrapper, "count").text()
  expect(count).toBe("1")
})
  
