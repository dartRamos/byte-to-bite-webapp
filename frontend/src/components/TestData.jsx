// This component was built to test connections only. 
// It can be deleted later 

const TestData = (props) => {
  const { recipes } = props;

  return (
    <div>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className="mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-lg font-semibold">{recipe.title}</h2>
            <p>{recipe.instructions}</p>
          </li>
        ))}
      </ul>
      
    </div>
  )
};

export default TestData;
