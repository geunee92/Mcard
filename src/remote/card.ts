import {
  collection,
  getDocs, // 전체 문서를 가져온다.
  QuerySnapshot,
  query,
  limit,
  startAfter,
  getDoc,
  doc,
} from 'firebase/firestore'
import { store } from './firebase' // 실제 서비스의 스토어

import { COLLECTIONS } from '@constants'
import { Card } from '@models/card'

// pageParam 지금 보이고있는 맨 마지막요소
export async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(10))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(10),
        )

  const cardSnapshot = await getDocs(cardQuery)

  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

export async function getCard(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id))

  return {
    id,
    ...(snapshot.data() as Card),
  }
}
