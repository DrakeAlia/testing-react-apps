// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

test('renders with the light styles for the light theme', () => {
  // 🐨 update the `render` call above to use the wrapper option using the (X)
  // ThemeProvider (X)
  const Wrapper = ({children}) => (
    <ThemeProvider initialTheme="light">{children}</ThemeProvider>
  )
  render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the dark styles for the dark theme', () => {
  const Wrapper = ({children}) => (
    <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
  )
  render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    color: white;
    background-color: black;
  `)
})

/* eslint no-unused-vars:0 */

// Wrapper Component //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// The naive way to test this easyButton component is to take a look at it and be like, "OK, it's actually remarkably 
// simple. All it does is render this button."

// In review, all that we did here was we rendered the component we wanted. We noticed that it wasn't getting all of
// the context values that it needed. We use the wrapper option and created a wrapper component that wrapped our
// children in our context providers. That ensured that our consumer of that context had access to the context value
// provided to us from the context provider.


// Dark Theme (Extra) //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// For our first extra credit here, we want to test the dark theme. That's pretty much just a copy-paste here. We're 
// just going to copy that, "Renders the dark styles for the dark theme." We'll make our initial theme be dark. Then 
// pretty much we just swap these out.

// In review, we just copy-pasted this, made a change to the title for our test, and then we updated our initial theme 
// to dark because that's the API for our ThemeProvider, is that it allows us to set that initial theme. Then we 
// rendered that EasyButton with that wrapper. We got that button and verified its styles were correct.