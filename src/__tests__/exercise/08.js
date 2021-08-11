// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook (X)
function UseCounterHook() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the component (X)
  render(<UseCounterHook />)
  // 🐨 get the elements you need using screen (X)
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  // 🐨 assert on the initial state of the hook (X)
  const message = screen.getByText(/current count/i)
  
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI (X)
  expect(message).toHaveTextContent('Current count: 0')
  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')

})

/* eslint no-unused-vars:0 */

// Test Functionality of Custom Hook //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// All right. Let's get this custom hook tested. What we're going to do is make a function component that resembles 
// the type of component people are going to write when they're using our custom hook.

// Here, we're going to have a useCounterHookExample. I'm going to call that useCounter. I know that this returns the 
// count, increment, and decrement here. This needs to be useCounter. There we go.

// What we did here to test our custom hook is we made a test component that uses the custom hook in the same way that 
// people will typically be using our custom hook. Then we tested that custom component, and we got great coverage on 
// our custom hook.

// I feel like this type of test is easy to read and understand. If I were building this today, this is the type of 
// test I would write.

