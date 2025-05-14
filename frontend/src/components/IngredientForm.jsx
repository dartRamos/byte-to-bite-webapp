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
    <form onSubmit={handleSubmit(onSubmit)}>
      {categories.map((category) => (
        <div key={category} className="category">
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          {fieldArrays[category].fields.map((item, index) => (
            <div key={item.id} className="field">
              <input
                {...register(`${category}.${index}`)}
                placeholder={`Enter ${category}...`}
              />
              <button
                type="button"
                onClick={() => fieldArrays[category].remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fieldArrays[category].append("")}
          >
            +
          </button>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default IngredientForm;