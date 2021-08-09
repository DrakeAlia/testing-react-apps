// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  let submittedData
  const handleSubmit = (data) => submittedData = data
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  const username = 'chucknorris'
  const password = 'i need no password'

  // 🐨 get the username and password fields via `getByLabelText`
  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  // 🐨 click on the button with the text "Submit"
  userEvent.click(screen.getByRole('button', {name: /submit/i}))
  // assert that submittedData is correct
  expect(submittedData).toEqual({
    username,
    password,
  })
})

// 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue

/*
eslint
  no-unused-vars: "off",
*/

// Form Testing ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// What we're doing here is we're rendering the login. We're finding some elements that are rendered by that login. 
// We're typing into those elements, and we're clicking on that button that is rendered by the login.

// We also pass an onSubmit handler, which will take the data that it's called with and assign a local variable to 
// that value, so that we can then assert on that value after we've clicked that Submit button.