import { createContext, useContext, useState, useEffect } from 'react'

const EnvironmentContext = createContext({ env: 'default', setEnv: () => {} })

export function EnvironmentProvider({ children }) {
  const [env, setEnv] = useState('default')

  useEffect(() => {
    const accents = {
      default: 'rgba(192,132,252,0.04)',
      polypus: 'rgba(168,85,247,0.09)',
      pantheon: 'rgba(182,139,74,0.09)',
    }
    document.documentElement.style.setProperty('--env-glow', accents[env] || accents.default)
  }, [env])

  return (
    <EnvironmentContext.Provider value={{ env, setEnv }}>
      {children}
    </EnvironmentContext.Provider>
  )
}

export function useEnvironment() {
  return useContext(EnvironmentContext)
}
