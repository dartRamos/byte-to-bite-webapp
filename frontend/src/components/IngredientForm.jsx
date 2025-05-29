import { useForm, useFieldArray } from "react-hook-form";
import '../styling/IngredientForm.css';

function IngredientForm({ onSubmit }) {
  const categories = [
    "meat",
    "produce",
    "carbs",
    "dairy",
    "oils & Vinegars",
    "sauces",
    "spices",
  ];

  const defaultValues = categories.reduce((acc, category) => {
    acc[category] = [""];
    return acc;
  }, {});

  const { control, register, handleSubmit } = useForm({
    defaultValues,
  });

  const fieldArrays = categories.reduce((acc, category) => {
    acc[category] = useFieldArray({ control, name: category });
    return acc;
  }, {});

  return (
    <>
      <div className="postit-note">
        tell us what you already have!
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="ingredient-form">
        {categories.map((category) => (
          <div key={category} className="ingredient-category">
            <div className="category-header">
              <h3 className="category-title">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <button
                type="button"
                onClick={() => fieldArrays[category].append("")}
                className="add-btn"
              >
                +
              </button>
            </div>
            {fieldArrays[category].fields.map((item, index) => (
              <div key={item.id} className="ingredient-field">
                <input
                  {...register(`${category}.${index}`)}
                  placeholder={`Enter ${category}...`}
                  className="ingredient-input"
                />
                <button
                  type="button"
                  onClick={() => fieldArrays[category].remove(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-btn">
          Find Recipes
        </button>
      </form>
    </>
  );
}

export default IngredientForm;