// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

function renderWithTheme(ui, {theme = 'light', ...options} = {}) {
  const Wrapper = ({children}) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )
  return render(ui, {wrapper: Wrapper, ...options})
}

test('renders with the light styles for the light theme', () => {
  renderWithTheme(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the dark styles for the dark theme', () => {
  renderWithTheme(<EasyButton>Easy</EasyButton>, {theme: 'dark'})
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

// Render Method (Extra) //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Let's get rid of this duplication on here and get us a step closer to what we really want to accomplish by making a 
// special function that I'm going to call renderWithTheme. This is going to basically be a special render function 
// that encapsulates this duplication, just so we don't have to ever worry about that wrapper.

// In review, what we did here was we took some duplication, put it into a function, and then genericized it enough, 
// so it could be a function we could call anytime we want to render something with the ThemeProvider.

// We could do this for all of our providers. This could be maybe not renderWithTheme but renderWithProviders. Then it 
// could have our Redux Provider, Apollo Provider, the React Router Provider, or whatever other context providers you 
// have in your app. You just put them all right here in this wrapper.

// Then you can call renderWithProviders to render any component with all the providers of your app. If you need to 
// configure them in a special way, then you can do so with additional options that you can just de-structure right 
// here, and then spread the rest of the options as regular React Testing Library options.