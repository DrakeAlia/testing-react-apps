// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
// 🐨 you'll need to grab waitForElementToBeRemoved from '@testing-library/react' (X)
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
// 🐨 you'll need to import rest from 'msw' and setupServer from msw/node (X)
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// 🐨 get the server setup with an async function to handle the login POST request:
// you'll want to respond with an JSON object that has the username. (X)
const server = setupServer(
  rest.post(
    'https://auth-provider.example.com/api/login',
    async (req, res, ctx) => {
      return res(ctx.json({username: req.body.username}))
    },
  ),
)

// 🐨 before all the tests, start the server with `server.listen()` (X)
beforeAll(() => server.listen())
// 🐨 after all the tests, stop the server with `server.close()` (X)
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  // 🐨 uncomment this and you'll start making the request! (X)
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