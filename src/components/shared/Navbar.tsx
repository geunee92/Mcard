import { css } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'

import { colors } from '@styles/colorPalette'
import Flex from '@shared/Flex'
import Button from '@shared/Button'

import { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/remote/firebase'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/atoms/user'

function Navbar() {
  const location = useLocation()

  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false

  const user = useAtomValue(userAtom)

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  const renderButton = useCallback(() => {
    if (user != null) {
      return <Button onClick={handleLogout}>로그아웃</Button>
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignButton, handleLogout])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>

      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`

export default Navbar
