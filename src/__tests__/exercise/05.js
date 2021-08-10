// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'
import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // as soon as the user hits submit, we render a spinner to the screen. That spinner has an aria-label of "loading"
  // for accessibility purposes, so
  // 🐨 wait for the loading spinner to be removed using waitForElementToBeRemoved (X)
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // once the login is successful, then the loading spinner disappears and we render the username.
  // 🐨 assert that the username is on the screen (X)
  expect(screen.getByText(username)).toBeInTheDocument()
})

// 📜 https://mswjs.io/
// 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved

// Mock Service Worker ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// First, we needed to get { rest } from 'msw' and { setupServer } from 'msw/node'. We used that to set up our server 
// to intercept any requests that our POST request made to this particular URL.

// Any of those requests will get handed off to our server handler here. We went ahead and started the server listening 
// before all the tests started. After they were all done, we closed it so that it's no longer listening and 
// just hanging around there.

// In our test, we simply clicked on that Submit button. We waited for the loading indicator to go away and then 
// we verified that the username did show up.

// Mock Responses ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Something that's really important with the server handlers is that you simulate the exact behavior of your backend.
// You try to do that with as much robustness as possible. One thing that our backend does is it will send a 400 
// response if a required username or password is not provided.

// We feel a little bit more confident because the mock resembles the real world more closely. This allows us to add 
// some additional tests later to verify what the UI does when we get a 400 response because we didn't submit a password.

// Reuse Sever Request Handlers (Extra) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// One of the cool things about MSW is that it works not only in Node but in the browser. That was its initial intent, 
// and Node was added thereafter. I'm happy about this because it means that as awesome as it is for me to make these 
// server handlers for my tests, it's even cooler to be able to share those server handlers for my development 
// environment in the browser.

// We're going to import test server handlers. We'll import the handlers from there. Then we can just say, 
// "Instead of all this nonsense ... handlers," so we'll spread that array of handlers into that setup server position. 
// We can save that. All of our tests are passing. We can now get rid of this {rest} from 'msw'. Things are working 
// awesomely.

// We get the benefit of this mock server, both in our development environment in the browser, as well as in our test 
// environment in Node. All we had to do to do that is put our server handlers in a shared file, which we import in 
// both our development environment, as well as our test environment, and we can have this nice shared experience 
// between the both of them.
