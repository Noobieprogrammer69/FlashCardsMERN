import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cardsState } from '../atoms/cardsAtom';
import { useNavigate, useParams } from 'react-router-dom';
import userAtom from '../atoms/userAtom';

const FlashCard = () => {
    const { id } = useParams();
    const [card, setCards] = useRecoilState(cardsState);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [slideClass, setSlideClass] = useState('');
    const currentUser = useRecoilValue(userAtom);
    const navigate = useNavigate();

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNextCard = () => {
        setSlideClass('slide-left');
        setTimeout(() => {
            setCurrentCardIndex((prevIndex) => (prevIndex + 1) % card.cards.length);
            setSlideClass('slide-left-exit');
        }, 500);
    };

    const handlePrevCard = () => {
        setSlideClass('slide-exit-active');
        setTimeout(() => {
            setCurrentCardIndex((prevIndex) => (prevIndex - 1 + card.cards.length) % card.cards.length);
            setSlideClass('slide-enter-active');
        }, 500);
    };

    useEffect(() => {
        const fetchCard = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/cards/${id}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                console.log("Fetched card data:", data);

                if (data.cards && data.cards.length > 0) {
                    setCards(data);
                } else {
                    console.error("No cards found.");
                }
            } catch (error) {
                console.error("Failed to fetch card data: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCard();
    }, [id, setCards]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!card || !card.cards || card.cards.length === 0) {
        return <p>No cards available.</p>;
    }

    const currentCard = card.cards[currentCardIndex];

    return (
        <div className="bg-gray-900 h-screen flex flex-col justify-center items-center text-white">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">{card.title}</h1>
                <h2 className="text-lg mt-2">{card.description}</h2>
            </div>
            <div
                className={`w-[350px] h-[450px] bg-transparent cursor-pointer perspective transition-transform duration-500 ${slideClass}`}
                onClick={handleClick}
                onAnimationEnd={() => setSlideClass('')} // Reset the slide class after animation
            >
                <div
                    className={`relative preserve-3d w-full h-full duration-1000 transform ${
                        isFlipped ? 'my-rotate-y-180' : ''
                    }`}
                >
                    <div className="absolute backflip-hidden w-full h-full flex justify-center items-center bg-gray-800 text-white p-4">
                        <h2 className="text-xl font-semibold">{currentCard.term}</h2>
                    </div>
                    <div className="absolute my-rotate-y-180 backflip-hidden w-full h-full flex justify-center items-center bg-gray-800 text-white p-4">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold">{currentCard.definition}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex space-x-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handlePrevCard}
                >
                    Previous
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNextCard}
                >
                    Next
                </button>
            </div>
            {currentUser?._id === card.createdBy && (
                <div className="mt-6">
                    <button
                        onClick={() => navigate(`/update/${id}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Update FlashCard
                    </button>
                </div>
            )}
        </div>
    );
};

export default FlashCard;
