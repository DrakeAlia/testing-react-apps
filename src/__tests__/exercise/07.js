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

/* eslint no-unused-vars:0 */


// Wrapper Component //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// In review, all that we did here was we rendered the component we wanted. We noticed that it wasn't getting all of 
// the context values that it needed. We use the wrapper option and created a wrapper component that wrapped our 
// children in our context providers. That ensured that our consumer of that context had access to the context value 
// provided to us from the context provider.