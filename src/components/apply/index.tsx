import { useEffect, useState } from 'react'

import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'

import { ApplyValues } from '@models/apply'
import { useAtomValue } from 'jotai'
import { useParams } from 'react-router-dom'
import { userAtom } from '@/atoms/user'
import { APPLY_STATUS } from '@/constants/apply'

function Apply({ onSubmit }: { onSubmit: (applyValues: ApplyValues) => void }) {
  const user = useAtomValue(userAtom)

  const { id } = useParams() as { id: string }

  const [step, setStep] = useState(0)

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  })

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.REDAY,
      } as ApplyValues)
    }
  }, [applyValues, step, onSubmit])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
    }))

    setStep((prevStep) => prevStep + 1)
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
    }))

    setStep((prevStep) => prevStep + 1)
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
    }))

    setStep((prevStep) => prevStep + 1)
  }

  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}

      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}

      {step === 2 ? <CardInfo onNext={handleCardInfoChange} /> : null}
    </div>
  )
}

export default Apply
