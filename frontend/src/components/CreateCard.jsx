import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { cardsState } from '../atoms/cardsAtom';
import { useNavigate } from 'react-router-dom';

const CreateCard = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [inputs, setInputs] = useState({
      title: "",
      description: "",
      cards: [{ term: "", definition: "" }]
    })
    const [cards, setCards] = useRecoilState(cardsState);
    const navigate = useNavigate()

    useEffect(() => {
      const handleScroll = () => {
        const mainHeaderHeight = document.querySelector('header').offsetHeight;
        const scrollTop = window.scrollY;
  
        if (scrollTop >= mainHeaderHeight) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const handleAddCard = () => {
      setInputs((prevInputs) => ({
          ...prevInputs,
          cards: [...prevInputs.cards, { term: "", definition: "" }]
      }));
  };

    const handleInputChange = (index, field, value) => {
        const updatedCards = inputs.cards.map((card, i) => 
            i === index ? { ...card, [field]: value } : card
        );
        setInputs((prevInputs) => ({
            ...prevInputs,
            cards: updatedCards
        }));
    };

    const handleCreate = async () => {
      try {
          const res = await fetch("/api/cards/flashCards", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(inputs)
          });

          if (!res.ok) {
              throw new Error(`Failed to create card: ${res.statusText}`);
          }

          const data = await res.json();
          setCards((prevCards) => [...prevCards, data]);

          setInputs({
              title: "",
              description: "",
              cards: [{ term: "", definition: "" }]
          });

          navigate(`/study/${data._id}`);
      } catch (error) {
          console.error("Create Card error:", error);
      }
    };

    const handleDeleteCard = (index) => {
        const updateCard = inputs.cards.filter((_, i) => i !== index)
        setInputs((prevInputs) => ({
            ...prevInputs,
            cards: updateCard
        }))
    }

  return (
    <>
        <header className={`w-full bg-gray-800 text-white shadow-md z-10  ${isSticky ? 'fixed top-0 w-full z-40' : 'fixed top-16 z-10'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <h1 className="text-lg font-semibold">Create New Card</h1>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleCreate}>
                        Create
                    </button>
                </div>
            </div>
        </header>
        
        <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-8">
                <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter title"
                    onChange={(e) => setInputs((inputs) => ({...inputs, title: e.target.value}))} value={inputs.title}
                />
            </div>
            
            <div className="mt-6">
                <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows="4"
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter description"
                    onChange={(e) => setInputs((inputs) => ({...inputs, description: e.target.value}))} value={inputs.description}
                ></textarea>
            </div>

            {inputs.cards.map((card, index) => (
                <div key={index} className="mt-8 p-4 bg-white bg-opacity-25 rounded-md shadow-md relative">
                    <button onClick={() => handleDeleteCard(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-600">
                        <FaTrash />
                    </button>
                    <div className="text-gray-700">
                        <h2 className="text-xl font-semibold mb-4">Card {index + 1}</h2>
                        
                        <div className="mb-4">
                            <label htmlFor={`term-${index}`} className="block text-md font-medium text-gray-600">Term</label>
                            <input
                                type="text"
                                id={`term-${index}`}
                                name={`term-${index}`}
                                className="mt-1 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                                placeholder="Enter term"
                                onChange={(e) => handleInputChange(index, "term", e.target.value)}
                                value={card.term}
                            />
                        </div>

                        <div>
                            <label htmlFor={`definition-${index}`} className="block text-md font-medium text-gray-600">Definition</label>
                            <input
                                type="text"
                                id={`definition-${index}`}
                                name={`definition-${index}`}
                                className="mt-1 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                                placeholder="Enter definition"
                                onChange={(e) => handleInputChange(index, "definition", e.target.value)}
                                value={card.definition}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleAddCard}>
                Add Term and Definition
            </button>
        </main>
    </>
);
}

export default CreateCard


  
  
  