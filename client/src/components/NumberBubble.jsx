function NumberBubble({number}) {
  return (
    <div class="group">
      <div class="aspect-square border-dashed border-black border-4 rounded-full group-hover:border-none group-hover:bg-green-500 w-28 h-28 sm:w-28 sm:h-28 md:w-36 md:h-36 flex items-center justify-center">
        <span class="text-4xl font-bold group-hover:text-white">
          {number}
        </span>
      </div>
    </div>
  );
}

export default NumberBubble
