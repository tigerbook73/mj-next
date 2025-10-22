export default function Game() {
  return (
    <div className="h-screen w-screen">
      {/* the following div is a square (not just rectangle) */}
      <div className="max-h-screen-md m-auto flex h-full w-full max-w-screen-md flex-col">
        {/* create a 3 row, size is 1/10, 8/10, 1/10, no gap, no padding, using flex */}
        <div className="flex h-full flex-col">
          <div className="h-1/10 flex w-full items-center justify-center bg-green-300">
            {/* split into 3 div with size = 1/10, 8/10, 1/10 */}
            <div className="w-1/10 flex h-full items-center justify-center bg-amber-300">
              <div className="text-lg">Top-left </div>
            </div>
            <div className="bg w-8/10 flex h-full items-center justify-center">
              <div className="text-lg">Player </div>
            </div>
            <div className="w-1/10 flex h-full items-center justify-center bg-amber-300">
              <div className="text-lg">Top-Right </div>
            </div>
          </div>
          <div className="h-8/10 flex w-full items-center justify-center">
            {/* split into 3 div with size = 1/10, 8/10, 1/10 */}
            <div className="w-1/10 flex h-full items-center justify-center bg-green-300">
              <div className="text-lg">Player </div>
            </div>
            <div className="w-8/10 flex h-full items-center justify-center bg-blue-300">
              <div className="text-lg">Play Area </div>
            </div>
            <div className="w-1/10 flex h-full items-center justify-center bg-green-300">
              <div className="text-lg">Player </div>
            </div>
          </div>
          <div className="h-1/10 flex w-full items-center justify-center bg-green-300">
            {/* split into 3 div with size = 1/10, 8/10, 1/10 */}
            <div className="w-1/10 flex h-full items-center justify-center bg-amber-300">
              <div className="text-lg">Bottom-Left </div>
            </div>
            <div className="w-8/10 flex h-full items-center justify-center bg-green-300">
              <div className="text-lg">Player </div>
            </div>
            <div className="w-1/10 flex h-full items-center justify-center bg-amber-300">
              <div className="text-lg">Bottom-Right </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
