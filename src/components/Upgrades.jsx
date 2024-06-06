const Upgrades = ({ buyUpgrade, points, healthUpgrade, hungerUpgrade, serenityUpgrade, upgradePrices }) => {
    const isMaxLevel = (level) => level >= 6;
  
    return (
      <div id="upgrades" className="page text-center">
        <h2 className="text-2xl font-bold mb-4">Upgrades</h2>
        <div className="flex justify-center space-x-8 mb-4">
          <button
            onClick={() => buyUpgrade('Cat Bed')}
            className={`px-4 py-2 rounded ${isMaxLevel(healthUpgrade) ? 'bg-gray-500' : 'bg-green-500 text-white'}`}
            disabled={isMaxLevel(healthUpgrade)}
          >
            {isMaxLevel(healthUpgrade) ? 'Upgrade Completed' : `Cat Bed (${upgradePrices[healthUpgrade - 1]} points)`}
          </button>
          <button
            onClick={() => buyUpgrade('Snacks')}
            className={`px-4 py-2 rounded ${isMaxLevel(hungerUpgrade) ? 'bg-gray-500' : 'bg-red-500 text-white'}`}
            disabled={isMaxLevel(hungerUpgrade)}
          >
            {isMaxLevel(hungerUpgrade) ? 'Upgrade Completed' : `Snacks (${upgradePrices[hungerUpgrade - 1]} points)`}
          </button>
          <button
            onClick={() => buyUpgrade('Candle')}
            className={`px-4 py-2 rounded ${isMaxLevel(serenityUpgrade) ? 'bg-gray-500' : 'bg-blue-500 text-white'}`}
            disabled={isMaxLevel(serenityUpgrade)}
          >
            {isMaxLevel(serenityUpgrade) ? 'Upgrade Completed' : `Candle (${upgradePrices[serenityUpgrade - 1]} points)`}
          </button>
        </div>
        <div className="text-center">Points: <span id="pointsCount">{Math.floor(points)}</span></div>
      </div>
    );
  };
  
  export default Upgrades;
  