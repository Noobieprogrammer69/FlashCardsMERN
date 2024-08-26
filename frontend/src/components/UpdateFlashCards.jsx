// src/pages/UpdateFlashCard.jsx
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateFlashCard = () => {
    const { id } = useParams();
    const [flashCard, setFlashCard] = useState(null);
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        cards: [{ term: "", definition: "" }]
    });
    const navigate = useNavigate()

    useEffect(() => {
        const fetchFlashCard = async () => {
            try {
                const res = await fetch(`/api/cards/${id}`);
                if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
                const data = await res.json();
                setFlashCard(data);
                setInputs({
                    title: data.title,
                    description: data.description,
                    cards: data.cards
                });
            } catch (error) {
                console.error("Error fetching flashcard:", error);
            }
        };

        fetchFlashCard();
    }, [id]);

    const handleInputChange = (index, field, value) => {
        const updatedCards = inputs.cards.map((card, i) => 
            i === index ? { ...card, [field]: value } : card
        );
        setInputs((prevInputs) => ({
            ...prevInputs,
            cards: updatedCards
        }));
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch(`/api/cards/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs), // Ensure inputs match the expected format
            });
    
            if (!res.ok) throw new Error(`Failed to update: ${res.status}`);
            
            const updatedCard = await res.json();
            alert('Flashcard updated successfully!');
    
            // Redirect to the updated flashcard or another page
            navigate(`/study/${updatedCard._id}`); // Adjust the route as needed
        } catch (error) {
            console.error("Error updating flashcard:", error);
        }
    };

    const handleAddCard = () => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            cards: [...prevInputs.cards, { term: "", definition: "" }]
        }));
    };

    const handleDeleteCard = (index) => {
        const updateCard = inputs.cards.filter((_, i) => i !== index)
        setInputs((prevInputs) => ({
            ...prevInputs,
            cards: updateCard
        }))
    }


    return (
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
            <div className='mt-10 pb-5'>
                <button
                    onClick={handleUpdate}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Update FlashCard
                </button>
            </div>
        </main>
    );
};

export default UpdateFlashCard;
