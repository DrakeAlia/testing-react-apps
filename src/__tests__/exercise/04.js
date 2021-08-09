// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),

  }
})

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
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

// Use a Jest Mock Function (Extra) ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// All that we did here is remove the local variable that we had and our own custom little function we were using to
// track what this function was called with and instead used a Jest function which we can pass into the onSubmit handler.

// We can use the assertion toHaveBeenCalledWith and toHaveBeenCalledTimes to get us the confidence that we need that
// this onSubmit prop is being used appropriately based on how the user is going to react with what's rendered by the
// login component.

// Generate Test Data (Extra) ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// All that we did here is pull in Faker from the Faker module, really popular module for generating fake test data. 
// We generated a username and a password. Down here, we put that into a function that we could call.

// Now, we're communicating that it doesn't matter what they are, just that they are your typical username and password
// using this buildLoginForm. Then, we fill those in. We verify that handleSubmit is called with the values that we 
// filled into the form.

// Allow for Overrides (Extra) ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// All that we did here is add an overrides argument to this build login form, and then combine our object that we 
// generate when this is normally called with whatever is passed as overrides.

// Sometimes these overrides can be options from which you can derive other generated values. It just depends on the 
// needs of the particular mock object factory that you have.

// use Test Data Bot (Extra) ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fake is called with the faker module, and then we can get rid of our faker import because test-data-bot is going 
// to do that for us. It's also going to handle that overrides for us as well.

// In review, all that we did here was we took our build login form that we created at the beginning and replaced it 
// with one that we create with the test-data-bot module. We generate that function with the build utility and then 
// use the fake utility to configure our fields for the username and password.