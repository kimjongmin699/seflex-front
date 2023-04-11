import React from 'react'
import { AuthProvider } from './AuthProvider'
import { NotificationProvider } from './NotificationProvider'
import { ThemeProvider } from './ThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import SearchProvider from './SearchProvider'
import MoviesProvider from './MoviesProvider'

export const ContextProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <SearchProvider>
          <MoviesProvider>
            <AuthProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </AuthProvider>
          </MoviesProvider>
        </SearchProvider>
      </NotificationProvider>
    </BrowserRouter>
  )
}
