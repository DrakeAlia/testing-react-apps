// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const increment = screen.getByRole('button', {name: /increment/i})
  const message = screen.getByText(/current count/i)


  expect(message).toHaveTextContent('Current count: 0')
  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})



// Screen Utility /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// We're basically refactoring our test to make it more resilient to changes that the code base may experience over 
// time. Now, if we add another button, it doesn't really matter because as long as the user is still able to find the 
// decrement button by its name and the fact that it's actually a button, our test will as well.

// The user is going to find this message by seeing the text "Current count,” then a number. We can do the same thing
// here by saying, our message is screen.getByText, and we'll say current count.

// We're going to get the element that has the text "Current count." That's going to be our message element. Then we 
// no longer need that container at all and we can just say, "Hey, render this to the page," then my screen will be 
// responsible for grabbing things on the page.

// Broswer Interactions /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// When the user clicks on things, they are firing all kinds of events like pointer events, mouse events. If they're 
// using keyboard, then they're going to be doing key events. It would be great if instead of just firing the click 
// event, we've fired all of those events to ensure that our test is resembling the way that our software is going to 
// be used in production as closely as possible.

// Instead of fireEvent, I'm going to import userEvent from '@testing-library/user-event'. We'll get rid of fireEvent and just use userEvent.

// UserEvent is built on top of testing-library's fireEvent to fire all of those events. UserEvent has a bunch of 
// methods on it that you can use to trigger typical interactions that your users will perform with your application. 
// In general, you want to defer to userEvent if you can, before you reach for fireEvent. That way you can keep your 
// test free of implementation details.