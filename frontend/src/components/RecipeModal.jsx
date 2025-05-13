import React from "react";
import { X } from 'lucide-react';

const RecipeModal = () => {
  
  return (
    <div className="fixed inset-0 bg-gray bg-opacity-30 backdrop-blur-sm  flex-col justifiy-center items-center">
      <div className="mt-10 flex flex-col gap-5">
        <button className="place-self-end"><X size={30}/></button>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold">Recipe Title</h1>
      </div>
      <div>
        <p>Recipe Picture goes here </p>
      </div>
      <div>
        <h3 className="text-3xl font-bold">Recipe Ingredients</h3>
        <section>
          <p className="text-2xl text-center">List of ingredients go here </p>
        </section>
      </div>
      
      <div>
        <h3 className="text-3xl font-bold">Recipe Instructions</h3>
        <section>
          <p className="text-2xl text-center">Recipe Instructions go here </p>
        </section>
      </div>
      

      
      
    </div>
  )
};

export default RecipeModal;
