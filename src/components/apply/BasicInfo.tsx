import { ChangeEvent, useCallback, useState } from 'react'
import Select from '@shared/Select'

import FixedBottomButton from '@shared/FixedBottomButton'

import {
  ANNUAL_INCOME_OPTIONS,
  CREDIT_SCORE_OPTIONS,
  PAYMENT_DAY_OPTIONS,
} from '@/constants/apply'
import { ApplyValues } from '@models/apply'

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

function BasicInfo({ onNext }: { onNext: (infoValues: InfoValues) => void }) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const 모든정보가선택되었는가 = Object.values(infoValues).every(
    (value) => value,
  )

  return (
    <div>
      <Select
        name="salary"
        label="연소득"
        options={ANNUAL_INCOME_OPTIONS}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />

      <Select
        name="creditScore"
        label="신용점수"
        options={CREDIT_SCORE_OPTIONS}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />

      <Select
        name="payDate"
        label="결제일"
        options={PAYMENT_DAY_OPTIONS}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />

      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(infoValues)
        }}
        disabled={모든정보가선택되었는가 === false}
      />
    </div>
  )
}

export default BasicInfo
