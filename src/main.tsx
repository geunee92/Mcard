import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles'
import { AlertContextProvider } from './contexts/AlertContext.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthGuard from './components/auth/AuthGuard.tsx'
import { Provider } from 'jotai'

const client = new QueryClient({
  defaultOptions: {},
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Global styles={globalStyles} />
      <QueryClientProvider client={client}>
        <AlertContextProvider>
          <AuthGuard>
            <App />
          </AuthGuard>
        </AlertContextProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
