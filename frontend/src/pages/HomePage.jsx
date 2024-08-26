import { useRecoilState } from "recoil"
import { AllFlashCards, CardNavigate } from "../components"
import { cardsState } from "../atoms/cardsAtom"
import { useEffect } from "react"

const HomePage = () => {
  const [cards, setCards] = useRecoilState(cardsState)

  useEffect(() => {
    const getAllFlashCards = async () => {
      try {
        const res = await fetch("/api/cards/all")
        const data = await res.json()
        if(data.error) {
          console.log("UseEffect data.error:", data.error)
          return
        }

        setCards(data.allCards)
      } catch (error) {
        console.log("All Cards Useffect Error:", error)
      }
    }

    getAllFlashCards()

  }, [setCards])

  return (
    <>
      <CardNavigate />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {Array.isArray(cards) &&
          cards.map((card) => (
            <AllFlashCards key={card._id} card={card}/>
          ))}
      </div>
    </>
  )
}

export default HomePage