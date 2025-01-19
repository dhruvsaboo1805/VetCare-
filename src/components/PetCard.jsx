import photo1 from "../assets/cat.jpeg";

const PetCard = ({ name, photo , onClick , breed }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg w-60 h-72 flex flex-col justify-center items-center cursor-pointer ml-4 mt-14" onClick={onClick}>
        <div className="bg-blue-100 rounded-full p-4 mb-4">
          <img
            src={photo1}
            alt={name}
            className="h-12 w-12 object-cover rounded-full"
          />
        </div>
        <h3 className="text-gray-700 font-semibold text-xl">{name}</h3>
        <br />
        <h3 className="text-gray-700 font-semibold text-xl">{breed}</h3>
      </div>
    );
  };
  
  export default PetCard;
  