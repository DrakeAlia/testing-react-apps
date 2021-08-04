// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

// 🐨 cleanup by removing the div from the page (💰 div.remove())
// 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div')
  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div)
  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  ReactDOM.render(<Counter />, div)
  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  const [decrement, increment] = div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  const message = div.firstChild.querySelector('div')
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(message.textContent).toBe('Current count: 0')
// Now we have an increment and a decrement using the mouseEvent constructor, and the dispatchEvent API. This aligns 
// our test a little bit closer to the user's experience when they're actually using our component.
  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
// We need to configure the clickEvent so that it bubbles so that React can take advantage of its event delegation 
// and make it cancelable because that's how the event is going to be by default when the user clicks on the button. 
// We'll make it a left button click by setting button to zero.
  increment.dispatchEvent(incrementClickEvent)
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 1')
  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  decrement.dispatchEvent(decrementClickEvent)
  // console.log(document.body.innerHTML)
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 0')
})

// Render Counter Component ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// If we look at the implementation of the counter, it also renders a div. That's the one right here. That's the
// first child that our component renders, the first child of our containing div. Here, it renders yet another div
// for that current count and then a button for the increment and decrement right here

// What we did here is we added some actions and some additional assertions where we're interacting with our component
// in a way that the user would by clicking on the button and then expecting the text content to change accordingly.

// We clicked on the Decrement button and expected that textContent to change as well. We also verified that our tests
// are providing us value by making sure that they can fail if we make breaking changes to our counter.

// Test Counter Component ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// What we did here is we're going to query for the element that we want to make an assertion on. We're not using a
// great query right here, but we will use something better here in the near future.

// The idea is we just need to get the element that we want to start making assertions on and that was our message
// element in that div. We're going to verify that the textContent is what we think it should be based on the
// initial render of our component.

// We're in a pretty good place where our test is starting to provide us with some value.

// Increment and Decrement Buttons ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// What we did here is we added some actions and some additional assertions where we're interacting with our component
// in a way that the user would by clicking on the button and then expecting the text content to change accordingly.

// We clicked on the Decrement button and expected that textContent to change as well. We also verified that our tests
// are providing us value by making sure that they can fail if we make breaking changes to our counter.

// Cleaning up Test Environments ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// What we're going to do instead is we'll have a beforeEach. We'll make sure that our test environment is awesome,
// document.body.innerHTML = "". If we save that, then we're going to get a passing test for the one that's working.

// I just wanted to make sure that you understood the importance of cleaning up your environment between each one of
// your tests, so that your tests can run in total isolation of each other.

/* eslint no-unused-vars:0 */
