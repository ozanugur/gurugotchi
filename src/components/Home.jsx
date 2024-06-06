const Home = ({ health, hunger, serenity, points, increaseStat }) => {
  return (
    <div id="home" className="page">
      <div id="stats" className="flex justify-center space-x-8 mb-4">
        <div className="stat text-center w-40"> {/* Fixed width for container */}
          <label htmlFor="health" className="block mb-1">Health:</label>
          <div className="relative w-full h-4 bg-gray-200 rounded mb-1">
            <div
              id="health"
              className="absolute top-0 left-0 h-full bg-green-500 rounded"
              style={{ width: `${health}%` }}
            ></div>
          </div>
          <span id="healthValue" className="block mb-1">{health.toFixed(1)}/100</span>
          <button onClick={() => increaseStat('health')} className="px-4 py-2 bg-green-500 text-white rounded">Nap</button>
        </div>
        <div className="stat text-center w-40"> {/* Fixed width for container */}
          <label htmlFor="hunger" className="block mb-1">Hunger:</label>
          <div className="relative w-full h-4 bg-gray-200 rounded mb-1">
            <div
              id="hunger"
              className="absolute top-0 left-0 h-full bg-red-500 rounded"
              style={{ width: `${hunger}%` }}
            ></div>
          </div>
          <span id="hungerValue" className="block mb-1">{hunger.toFixed(2)}/100</span>
          <button onClick={() => increaseStat('hunger')} className="px-4 py-2 bg-red-500 text-white rounded">Hunt</button>
        </div>
        <div className="stat text-center w-40"> {/* Fixed width for container */}
          <label htmlFor="serenity" className="block mb-1">Serenity:</label>
          <div className="relative w-full h-4 bg-gray-200 rounded mb-1">
            <div
              id="serenity"
              className="absolute top-0 left-0 h-full bg-blue-500 rounded"
              style={{ width: `${serenity}%` }}
            ></div>
          </div>
          <span id="serenityValue" className="block mb-1">{serenity.toFixed(2)}/100</span>
          <button onClick={() => increaseStat('serenity')} className="px-4 py-2 bg-blue-500 text-white rounded">Meditate</button>
        </div>
      </div>
      <div id="points" className="text-center">Points: <span id="pointsCount">{Math.floor(points)}</span></div>
    </div>
  );
};

export default Home;
