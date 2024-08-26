import { Link } from "react-router-dom";

const AllFlashCards = ({ card }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/study/${card._id}`}>
        <h1 className="text-sm font-semibold">{card.title}</h1>
        <p className="text-xs text-gray-400 mt-1">Flash Card By: {card.createdBy.username}</p>
      </Link>
    </div>
  );
};

export default AllFlashCards;
