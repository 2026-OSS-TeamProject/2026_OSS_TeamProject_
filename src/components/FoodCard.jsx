import React from 'react';

function FoodCard({ dish, onClick }) {
  const placeholderImage = "https://www.holidify.com/blog/wp-content/uploads/2015/11/Maharashtras_Misal_Pav.jpg";
  const defaultDescription = "No description available.";

  return (
    <div
      className="relative bg-white shadow-md rounded-lg overflow-hidden border-2 border-gray-300 cursor-pointer transition-transform duration-300 ease-in-out transform hover:-translate-y-1 group"
      onClick={onClick}
    >
      <img
        src={dish.dishImage || placeholderImage}
        alt={dish.dish || "No image available"}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg text-black font-bold mb-2">{dish.dish}</h3>
        </div>
        <p className="text-gray-700">{dish.description || defaultDescription}</p>
      </div>
    </div>
  );
}

export default FoodCard;
