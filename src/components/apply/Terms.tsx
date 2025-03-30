import { useCallback, useState, MouseEvent } from 'react'
import Agreement from '@shared/Agreement'
import FixedBottomButton from '@shared/FixedBottomButton'

import { TERMS_ITEM } from '@/constants/apply'
import { ApplyValues } from '@/models/apply'

function Terms({ onNext }: { onNext: (terms: ApplyValues['terms']) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return TERMS_ITEM.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  const isAllTermsAgreed = Object.values(termsAgreements).every(
    (isAgree) => isAgree,
  )

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={isAllTermsAgreed}
          onChange={handleAllAgreement}
        >
          약관에 모두 동의
        </Agreement.Title>

        {TERMS_ITEM.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>

      <FixedBottomButton
        label="약관동의"
        disabled={isAllTermsAgreed === false}
        onClick={() => {
          onNext(Object.keys(termsAgreements))
        }}
      />
    </div>
  )
}

export default Terms
