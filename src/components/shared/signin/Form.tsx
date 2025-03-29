import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import validator from 'validator'

import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { colors } from '@styles/colorPalette'
import { FormValues } from '@/models/signin'

import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import styled from '@emotion/styled'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const cansSubmit = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="olaf@gmail.com"
        onChange={handleFormValues}
        value={formValues.email}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        type="password"
        name="password"
        onChange={handleFormValues}
        value={formValues.password}
      />

      <Spacing size={32} />

      <Button
        size="medium"
        disabled={cansSubmit === false}
        onClick={() => {
          onSubmit(formValues)
        }}
      >
        로그인
      </Button>

      <Spacing size={12} />

      <StyledLink to="/signup">
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </StyledLink>
    </Flex>
  )
}

function validate(formValues: FormValues) {
  const errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요'
  }

  return errors
}

const formContainerStyles = css`
  padding: 24px;
`

const StyledLink = styled(Link)`
  text-align: center;

  &:hover span {
    color: ${colors.blue};
  }
`

export default Form
