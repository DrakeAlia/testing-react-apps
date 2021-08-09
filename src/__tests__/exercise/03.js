// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
// 🐨 add `screen` to the import here: (X)
import {render, fireEvent, screen} from '@testing-library/react'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)
  // 🐨 replace these with screen queries (X)
  // const [decrement, increment] = container.querySelectorAll('button')
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const increment = screen.getByRole('button', {name: /increment/i})
  const message = screen.getByText(/current count/i)


  expect(message).toHaveTextContent('Current count: 0')
  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  fireEvent.click(decrement)
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
