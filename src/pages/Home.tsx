import ListRow from '@/components/shared/ListRow'
import CardList from '@/components/shared/home/CardList'
import Top from '@components/shared/Top'
import AddBanners from '@components/shared/home/AdBanners'
import { Suspense } from 'react'

function Home() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 준비했습니다."
      />

      <AddBanners />

      <Suspense
        fallback={[...new Array(10)].map((_, idx) => (
          <ListRow.Skeleton key={idx} />
        ))}
      >
        <CardList />
      </Suspense>
    </div>
  )
}

export default Home
