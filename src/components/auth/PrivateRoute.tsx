import { userAtom } from '@/atoms/user'
import { useAtomValue } from 'jotai'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useAtomValue(userAtom)

  if (user == null) {
    return <Navigate to="/signin" replace={true} />
  }

  return <>{children}</>
}

export default PrivateRoute
