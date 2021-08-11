// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

// 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function (X)
beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

// 💰 I'm going to give you this handy utility function
// it allows you to create a promise that you can resolve/reject on demand.
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}
// 💰 Here's an example of how you use this:
// const {promise, resolve, reject} = deferred()
// promise.then(() => {/* do something */})
// // do other setup stuff and assert on the pending state

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }
  // 🐨 create a deferred promise here (X)
  // 🐨 Now we need to mock the geolocation's getCurrentPosition function (X)
  // 🐨 so call mockImplementation on getCurrentPosition (X)
  // 🐨 the first argument of your mock should accept a callback (X)
  // 🐨 you'll call the callback when the deferred promise resolves (X)
  const {promise, resolve} = deferred()
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    callback => {
      promise.then(() => callback(fakePosition))
    },
  )

  // 🐨 now that setup is done, render the Location component itself
  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  // 🐨 resolve the deferred promise (X)
  // 🐨 wait for the promise to resolve (X)
  // 💰 right around here, you'll probably notice you get an error log in the
  // test output. You can ignore that for now and just add this next line:
  // act(() => {})
  await act(async () => {
    resolve()
    await promise
  })

  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude (X)
  // 🐨 verify the loading spinner is no longer in the document (X)
  // 🐨 verify the latitude and longitude appear correctly (X)
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
no-unused-vars: "off",
*/

// 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
// 📜 https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
// 📜 https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning

// Mock Geolocation /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// The first thing that I want to do is render this location component, so I'm going to come down here and say render
// location. Then, we're going to do a screen.debug to get an idea of what happens when we do that.

// First of all, we had to mock out the geolocation API because that's not currently supported in JS DOM. Even if it
// were, we might want to mock out what getCurrentPosition returns, so that our tests will run reliably, regardless of
// where the machine is in the world at the time that's running our test.

// We mock it out to a Jest mock function. Down here, we create a fakePosition and we make a mock implementation
// getCurrentPosition to call the callback with that fakePosition.

// But then we only want to do that after this promise resolves, which will give us a chance to verify that the
// loading spinner shows up before we tell that promise to resolve, wait for it to resolve, and then verify the UI
// after that state.

// Act Function /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Now that we've got a passing test, we've got an error right here saying, "Hey, you've got an update into location
// that wasn't wrapped in act." What in the world is this? You can dive in and read about this. I linked to a blog
// post in the instructions.

// Now, act() is a function that's built in to react-test-utils. React Testing Library re-exports it right here.
// We can pull that act utility out. Then we're going to wrap this inside of act. We'll say act. This is an
// asynchronous thing that's happening. We're going to make our callback async and we're going to wait for this whole
// thing to finish.

// Now, what this is going to do is it's going to say, "OK, I'm going to go ahead and do all the things which it will
// include calling this callback. Once this whole thing resolves, then I'll go ahead and flush all of the side effects
// that happened during that time." We can save this. We get rid of that warning and are interacting with a stable UI,
// just like the user would in a real application.

// This is one of the very few places where you actually need to use act directly. Most of the API's that you use
// within React Testing Library are going to handle this for you automatically. You don't normally need to deal with
// act directly.

// In situations like this where we are directly calling a function that results in calling a state update or function,
// we do have to use act ourselves.
