import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreateCards = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/create-card")
  }

  return (
    <>
      <button 
        onClick={handleNavigate} 
        className="fixed bottom-10 right-5 text-sm bg-gray-500 p-5 rounded-lg"
      >
        <FaPlus />
      </button>
    </>
  );
}

export default CreateCards;
