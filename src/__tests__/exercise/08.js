// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
  // console.log(result)

  // const increment = screen.getByRole('button', {name: /increment/i})
  // const decrement = screen.getByRole('button', {name: /decrement/i})
  // const message = screen.getByText(/current count/i)

  // expect(message).toHaveTextContent('Current count: 0')
  // userEvent.click(increment)
  // expect(message).toHaveTextContent('Current count: 1')
  // userEvent.click(decrement)
  // expect(message).toHaveTextContent('Current count: 0')
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

// Fake Component //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This is one of the very few situations where you do have to use the act utility from ReactTestUtils, which is React
// exported for us from react-testing-library.

// In our review, what we did here is create this test component, assign the result of the useCounter to this variable
// that we could interact with. In particular, I wanted to mention again that the act function here is basically just
// telling React, "Hey, I'm going to do something that's going to trigger an update".

// After my callback is all finished, I want you to flush all the side effects, the React useEffect callbacks and
// everything so that my next line of code has a stable component to interact with so we don't end up with some sort
// of intermediary state where our effects haven't been run yet."

// This was not necessary before because we were using userEvent, which wraps everything in act calls. It is now
// necessary because we are calling that setCount directly through this increment function call. Because of that, we
// have to manually wrap this in act.

// This is one of the very few situations where you do have to use the act utility from ReactTestUtils, which is React
// exported for us from react-testing-library.
