// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }

  let setReturnValue
  function useMockCurrentPosition() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue([fakePosition])
  })

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

// Mock the module (Extra) /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// There's an alternative way that we could have solved this problem. That is by mocking the third-party module that's 
// interacting with geolocation. If we look at our implementation here, we've got this { useCurrentPosition } from 
// 'react-use-geolocation'.

// In review, let's start with the implementation. When we render this location, it's going to call this 
// useCurrentPosition. From the way things look here, we're going to be using useCurrentPosition from 
// react-use-geolocation.

// That's not the case because we used jest.mock, which will rewrite all of our module imports to use a mocked version 
// of react-use-geolocation, which means that useCurrentPosition is going to be a Jest mock function.

// When useCurrentPosition is called, it's going to be calling useMockCurrentPosition, which is technically a hook. 
// It's using React useState, but we're taking that state updater value and assigning it to something that we can call 
// ourselves.

// It's returning the state value, which at the very beginning is just this empty array. We get position is undefined, 
// error is undefined, which will result in this spinner showing up. That allows us to verify that the spinner is in 
// the document.

// We want to trigger a state update from our test. We're going to say, "Hey, act. I'm going to do some sort of action 
// and when I'm all done, I want you to flush all of the side effects." The action that we take is to set the return 
// value to this array that has our fake position.

// That will trigger a re-render in any component that's using useCurrentPosition. This time, when we say state at 
// position , it's going to be this array that has a fake position.

// We come back to this location, we call useCurrentPosition, which is our useMockCurrentPosition. This is going to 
// give us our fake position, which will ultimately result in rendering this latitude and longitude. We can make all 
// of those assertions to ensure that our component is working properly.

// Anytime you have a module, whether it be third party or your own, and you don't want its code to run in the test 
// environment, then you can use the Jest mock API to mock out that particular component. Mock implementations of 
// functions to make them do whatever you want them to do in your test environment, so that you can have a good 
// testing experience.

// Just be careful when you do this because you are poking holes in reality. That reduces the amount of confidence that 
// your test can give you. Sometimes, you just really have to mock things for practicality reasons. It's nice that 
// Jest gives us such powerful APIs to do that.