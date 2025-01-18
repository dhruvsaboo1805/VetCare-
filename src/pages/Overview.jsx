import React, { useState } from "react";
import PetCard from "../components/PetCard";

const Overview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState("");
  const [petPhoto, setPetPhoto] = useState(null);
  const [breed, setBreed] = useState("");
  const [dob, setDob] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [reproductionStatus, setReproductionStatus] = useState("");
  const [pregnancyStatus, setPregnancyStatus] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [medication, setMedication] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm(); // Reset form when modal is closed
  };

  const resetForm = () => {
    setPetName("");
    setPetPhoto(null);
    setBreed("");
    setDob("");
    setWeight("");
    setGender("");
    setReproductionStatus("");
    setPregnancyStatus("");
    setAllergies([]);
    setDiseases([]);
    setVaccines([]);
    setMedication([]);
  };

  const handleAddPet = () => {
    const newPet = {
      name: petName,
      photo: petPhoto,
      breed,
      dob,
      weight,
      gender,
      reproductionStatus,
      pregnancyStatus,
      allergies,
      diseases,
      vaccines,
      medication,
    };
    setPets((prevPets) => [...prevPets, newPet]);
    handleCloseModal(); // Close modal after adding
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetPhoto(reader.result); // Set the uploaded image data
      };
      reader.readAsDataURL(file); // Convert the image to base64
    }
  };

  const handleAddAllergy = () => {
    setAllergies((prev) => [...prev, { name: "", date: "" }]);
  };

  const handleAllergyChange = (index, field, value) => {
    const updatedAllergies = [...allergies];
    updatedAllergies[index][field] = value;
    setAllergies(updatedAllergies);
  };

  const handleRemoveAllergy = (index) => {
    const updatedAllergies = allergies.filter((_, i) => i !== index);
    setAllergies(updatedAllergies);
  };

  const handleAddDisease = () => {
    setDiseases((prev) => [...prev, { name: "", date: "" }]);
  };

  const handleDiseaseChange = (index, field, value) => {
    const updatedDiseases = [...diseases];
    updatedDiseases[index][field] = value;
    setDiseases(updatedDiseases);
  };

  const handleRemoveDisease = (index) => {
    const updatedDiseases = diseases.filter((_, i) => i !== index);
    setDiseases(updatedDiseases);
  };

  const handleAddVaccine = () => {
    setVaccines((prev) => [...prev, { name: "", date: "" }]);
  };

  const handleVaccineChange = (index, field, value) => {
    const updatedVaccines = [...vaccines];
    updatedVaccines[index][field] = value;
    setVaccines(updatedVaccines);
  };

  const handleRemoveVaccine = (index) => {
    const updatedVaccines = vaccines.filter((_, i) => i !== index);
    setVaccines(updatedVaccines);
  };

  const handleAddMedication = () => {
    setMedication((prev) => [...prev, { name: "", date: "" }]);
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedication = [...medication];
    updatedMedication[index][field] = value;
    setMedication(updatedMedication);
  };

  const handleRemoveMedication = (index) => {
    const updatedMedication = medication.filter((_, i) => i !== index);
    setMedication(updatedMedication);
  };

  return (
    <div className="flex flex-wrap items-start justify-center min-h-screen bg-gray-100 p-6">
      {/* Add Pets Card */}
      <div
        className="bg-white shadow-lg rounded-lg w-60 h-72 flex flex-col justify-center items-center cursor-pointer mb-6 mr-52"
        onClick={handleOpenModal}
      >
        <div className="bg-blue-100 rounded-full p-4 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <h3 className="text-gray-700 font-semibold text-xl">Add Pets</h3>
        <p className="text-gray-500 text-sm text-center px-4 mt-2">
          Click here to add a new <br />
          pet to your list.
        </p>
      </div>

      {/* Display Pet Cards */}
      <div className="flex flex-wrap justify-center">
        {pets.map((pet, index) => (
          <PetCard key={index} name={pet.name} photo={pet.photo} />
        ))}
      </div>

      {/* Add Pet Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Pet</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Pet Name"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {petPhoto && (
              <img
                src={petPhoto}
                alt="Pet"
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Reproduction Status"
                value={reproductionStatus}
                onChange={(e) => setReproductionStatus(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Pregnancy Status"
                value={pregnancyStatus}
                onChange={(e) => setPregnancyStatus(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Allergies, Diseases, Vaccines, Medication (Multiple Entries) */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Allergies</h3>
              {allergies.map((allergy, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    placeholder="Allergy Name"
                    value={allergy.name}
                    onChange={(e) =>
                      handleAllergyChange(index, "name", e.target.value)
                    }
                    className="w-1/2 p-2 mb-2 border rounded-md"
                  />
                  <input
                    type="date"
                    placeholder="Date (DD/MM/YYYY)"
                    value={allergy.date}
                    onChange={(e) =>
                      handleAllergyChange(index, "date", e.target.value)
                    }
                    className="w-1/2 p-2 mb-2 border rounded-md"
                  />
                  <button
                    onClick={() => handleRemoveAllergy(index)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddAllergy}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
              >
                Add Allergy
              </button>
            </div>

            {/* Repeat the same grid structure for Diseases, Vaccines, Medication */}
            {/* Example for Diseases */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Diseases</h3>
              {diseases.map((disease, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    placeholder="Disease Name"
                    value={disease.name}
                    onChange={(e) =>
                      handleDiseaseChange(index, "name", e.target.value)
                    }
                    className="w-1/2 p-2 mb-2 border rounded-md"
                  />
                  <input
                    type="date"
                    placeholder="Date (DD/MM/YYYY)"
                    value={disease.date}
                    onChange={(e) =>
                      handleDiseaseChange(index, "date", e.target.value)
                    }
                    className="w-1/2 p-2 mb-2 border rounded-md"
                  />
                  <button
                    onClick={() => handleRemoveDisease(index)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddDisease}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
              >
                Add Disease
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Vaccine</h3>
              {vaccines.map((vaccine, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    placeholder="Vaccine Name"
                    value={vaccine.name}
                    onChange={(e) =>
                      handleVaccineChange(index, "name", e.target.value)
                    }
                    className="w-1/2 p-2 mb-2 border rounded-md"
                  />
                  <input
                    type="date"
                    placeholder="Date (DD/MM/YYYY)"
                    value={vaccine.date}
                    onChange={(e) =>
                      handleVaccineChange(index, "date", e.target.value)
                    }
                    className="w-1/2 p-2 mb-2 border rounded-md"
                  />
                  <button
                    onClick={() => handleRemoveVaccine(index)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddVaccine}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
              >
                Add Vaccine
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Medication</h3>
              {medication.map((medication, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    placeholder="Medication Name"
                    value={medication.name}
                    onChange={(e) =>
                      handleMedicationChange(index, "name", e.target.value)
                    }
                    className="w-1/2 p-2 mb-2 border rounded-md"
                  />
                  <input
                    type="date"
                    placeholder="Date (DD/MM/YYYY)"
                    value={medication.date}
                    onChange={(e) =>
                      handleMedicationChange(index, "date", e.target.value)
                    }
                    className="w-1/2 p-2 mb-2 border rounded-md"
                  />
                  <button
                    onClick={() => handleRemoveMedication(index)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddMedication}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
              >
                Add Medication
              </button>
            </div>

            {/* Add buttons for Add Pet and Close */}
            <div className="flex justify-between">
              <button
                onClick={handleAddPet}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add Pet
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
