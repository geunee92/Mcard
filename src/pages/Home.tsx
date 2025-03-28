import CardList from '@/components/shared/home/CardList'
import Top from '@components/shared/Top'
import AddBanners from '@components/shared/home/AdBanners'

function Home() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 준비했습니다."
      />

      <AddBanners />

      <CardList />
    </div>
  )
}

export default Home
