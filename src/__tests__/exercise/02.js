// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
// 🐨 import the `render` and `fireEvent` utilities from '@testing-library/react' (X)
import {render, fireEvent, screen} from '@testing-library/react'
import Counter from '../../components/counter'

// 💣 remove this. React Testing Library does this automatically! (X)
// beforeEach(() => {
//   document.body.innerHTML = ''
// })

test('counter increments and decrements when the buttons are clicked', () => {
  // 💣 remove these two lines, React Testing Library will create the div for you (X)
  // const div = document.createElement('div')
  // document.body.append(div)

  // 🐨 swap ReactDOM.render with React Testing Library's render
  // Note that React Testing Library's render doesn't need you to pass a `div`
  // so you only need to pass one argument. render returns an object with a
  // bunch of utilities on it. For now, let's just grab `container` which is
  // the div that React Testing Library creates for us.
  // 💰 const {container} = render(<Counter />)

  // ReactDOM.render(<Counter />, div)
  const {container} = render(<Counter />)

  // 🐨 instead of `div` here you'll want to use the `container` you get back
  // from React Testing Library (X)
  // const [decrement, increment] = div.querySelectorAll('button')
  // const message = div.firstChild.querySelector('div')

  const [decrement, increment] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')

  expect(message.textContent).toBe('Current count: 0')

  // 🐨 replace the next two statements with `fireEvent.click(button)` (X)

  // const incrementClickEvent = new MouseEvent('click', {
  //   bubbles: true,
  //   cancelable: true,
  //   button: 0,
  // })
  // increment.dispatchEvent(incrementClickEvent)
  fireEvent.click(increment)
  expect(message.textContent).toBe('Current count: 1')
  // const decrementClickEvent = new MouseEvent('click', {
  //   bubbles: true,
  //   cancelable: true,
  //   button: 0,
  // })
  // decrement.dispatchEvent(decrementClickEvent)
  fireEvent.click(decrement)
  expect(message.textContent).toBe('Current count: 0')
})

// Rendering /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Since we're testing with React Testing Library, we no longer need to create the div ourselves and put that into the
// body, then clean up after ourselves. All of that is going to happen for us automatically when we call render.

// It creates the div. It renders that using ReactDOM.render, just like what we were doing before. It returns that
// container div as the container property of the view objects that we get back. Then we can use that to query around
// like we were doing before.

// All of that React Testing Library will also make sure that this component is unmounted. The div that I created,
// it was removed from the DOM between every one of our tests, so we don't have to worry about clean-up.

// Firing Events /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// In review, what we've done here is we pulled in render and fireEvent from React Testing Library. We cleaned up a
// bunch of boilerplate here and then we cleaned up a bunch of boilerplate here for our fireEvent. Then we cleaned up
// a bunch of boilerplate for triggering events to click on the increment and decrement buttons.

// Now our test reads quite nicely. We say, "Hey, let's render this counter." Then let's get the decrement and
// increment and message elements. Then we'll verify that the text content of the message starts out at . We'll click
// on the increment, we'll verify that the text content of the message changed, then we click on decrement, and then
// verify that our message was updated there as well.
