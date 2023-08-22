const operators = ["+", "-", "x", "/"]

function Operators() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-5 grid-rows-1 gap-2 min-w-max">
          <span class="aspect-square rounded-full bg-green-500 text-white text-2xl">
          </span>
        {operators.map((operator, index) => (
          <span class="aspect-square rounded-full bg-black text-white text-2xl">{operator}</span>
        ))}
      </div>
    </div>
  );
}

export default Operators
