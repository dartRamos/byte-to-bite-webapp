import { useForm, useFieldArray } from "react-hook-form";

function IngredientForm({ onSubmit }) {
  const categories = ["meat", "produce", "carbs", "dairy", "oils & vinegars", "condiments", "seasonings"];

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-gray-300 rounded-lg shadow-md p-4 space-y-6 max-w-xs mx-auto"
    >
      {categories.map((category) => (
        <div key={category} className="category space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <button
              type="button"
              onClick={() => fieldArrays[category].append("")}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              +
            </button>
          </div>
          {fieldArrays[category].fields.map((item, index) => (
            <div key={item.id} className="field flex items-center space-x-2">
              <input
                {...register(`${category}.${index}`)}
                placeholder={`Enter ${category}...`}
                className="flex-1 border border-gray-300 rounded-md p-2"
              />
              <button
                type="button"
                onClick={() => fieldArrays[category].remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                -
              </button>
            </div>
          ))}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mx-auto block mb-8"
      >
        Find Recipes
      </button>
    </form>
  );
}

export default IngredientForm;