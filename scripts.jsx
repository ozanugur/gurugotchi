// Initial stats and points
let health = 100;
let hunger = 100;
let serenity = 100;
let points = 0;

// Decrease rates and amounts for each stat
const decreaseRate = 1000; // 1 second
const decreaseAmounts = [0, 25 / 3600, 25 / 7200, 25 / 14400, 25 / 21600, 25 / 43200]; // Level 0 is placeholder

// Upgrades start at level 1
let upgrades = {
    bed: { level: 1, price: 100 },
    snacks: { level: 1, price: 100 },
    candle: { level: 1, price: 100 }
};

<div className="absolute -top-[72%] left-1/2 w-[200%] -translate-x-1/2 md:-top-[85%] md:w-[138%] lg:-top-[85%]">
<img
  src="assets/images/background.jpg"
  className="w-full"
  width={1440}
  height={1800}
  alt="hero"
/>
</div>

const upgradePrices = [0, 100, 200, 400, 800]; // Level 0 is placeholder

// Tasks completed status
let tasksCompleted = {
    follow: false,
    like: false,
    retweet: false
};

// Load the game state from localStorage
function loadGame() {
    const savedHealth = localStorage.getItem('health');
    const savedHunger = localStorage.getItem('hunger');
    const savedSerenity = localStorage.getItem('serenity');
    const savedPoints = localStorage.getItem('points');
    const savedUpgrades = localStorage.getItem('upgrades');
    const savedTasksCompleted = localStorage.getItem('tasksCompleted');

    if (savedHealth !== null) health = parseFloat(savedHealth);
    if (savedHunger !== null) hunger = parseFloat(savedHunger);
    if (savedSerenity !== null) serenity = parseFloat(savedSerenity);
    if (savedPoints !== null) points = parseFloat(savedPoints);
    if (savedUpgrades !== null) upgrades = JSON.parse(savedUpgrades);
    if (savedTasksCompleted !== null) tasksCompleted = JSON.parse(savedTasksCompleted);

    updateUI();
}

// Save the current game state to localStorage
function saveGame() {
    localStorage.setItem('health', health);
    localStorage.setItem('hunger', hunger);
    localStorage.setItem('serenity', serenity);
    localStorage.setItem('points', points);
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    localStorage.setItem('tasksCompleted', JSON.stringify(tasksCompleted));
}

// Update points based on the current stat levels
function updatePoints() {
    let pointsPerMinute = 0;

    pointsPerMinute += getPointsFromStat(health);
    pointsPerMinute += getPointsFromStat(hunger);
    pointsPerMinute += getPointsFromStat(serenity);

    points += pointsPerMinute / 60;
    document.getElementById('pointsCount').innerText = Math.floor(points);
    saveGame();
}

function getPointsFromStat(stat) {
    if (stat >= 75) return 60;
    if (stat >= 50) return 30;
    if (stat >= 25) return 15;
    return 0;
}

// Decrease the stat value over time
function decreaseStat(stat) {
    switch (stat) {
        case 'health':
            health = Math.max(0, health - decreaseAmounts[upgrades.bed.level]);
            break;
        case 'hunger':
            hunger = Math.max(0, hunger - decreaseAmounts[upgrades.snacks.level]);
            break;
        case 'serenity':
            serenity = Math.max(0, serenity - decreaseAmounts[upgrades.candle.level]);
            break;
    }
    updateUI();
    updatePoints();
}

// Start the intervals to decrease stats over time
function startIntervals() {
    setInterval(() => decreaseStat('health'), decreaseRate);
    setInterval(() => decreaseStat('hunger'), decreaseRate);
    setInterval(() => decreaseStat('serenity'), decreaseRate);
    setInterval(updatePoints, 1000);
}

// Actions to increase stats
function increaseStat(stat) {
    switch (stat) {
        case 'health':
            health = Math.min(100, health + 10);
            break;
        case 'hunger':
            hunger = Math.min(100, hunger + 10);
            break;
        case 'serenity':
            serenity = Math.min(100, serenity + 10);
            break;
    }
    updateUI();
    saveGame();
}

// Buy an upgrade and apply its effect
function buyUpgrade(upgrade) {
    if (upgrades[upgrade].level < 5 && points >= upgrades[upgrade].price) {
        points -= upgrades[upgrade].price;
        upgrades[upgrade].level++;
        upgrades[upgrade].price = upgradePrices[upgrades[upgrade].level];
        updateUI();
        saveGame();
    }
}

// Update the UI elements
function updateUI() {
    document.getElementById('health').value = health;
    document.getElementById('healthValue').innerText = `${health.toFixed(2)}/100`;
    document.getElementById('hunger').value = hunger;
    document.getElementById('hungerValue').innerText = `${hunger.toFixed(2)}/100`;
    document.getElementById('serenity').value = serenity;
    document.getElementById('serenityValue').innerText = `${serenity.toFixed(2)}/100`;
    document.getElementById('pointsCount').innerText = Math.floor(points);

    document.getElementById('bedUpgrade').innerText = `Cat Bed (Level ${upgrades.bed.level}) - ${upgrades.bed.price} points`;
    document.getElementById('snacksUpgrade').innerText = `Snacks (Level ${upgrades.snacks.level}) - ${upgrades.snacks.price} points`;
    document.getElementById('candleUpgrade').innerText = `Candle (Level ${upgrades.candle.level}) - ${upgrades.candle.price} points`;

    document.querySelector('[onclick="completeTask(\'follow\')"]').disabled = tasksCompleted.follow;
    document.querySelector('[onclick="completeTask(\'like\')"]').disabled = tasksCompleted.like;
    document.querySelector('[onclick="completeTask(\'retweet\')"]').disabled = tasksCompleted.retweet;
}

// Complete a task and grant points
function completeTask(task) {
    if (!tasksCompleted[task]) {
        switch (task) {
            case 'follow':
                points += 2000;
                break;
            case 'like':
                points += 250;
                break;
            case 'retweet':
                points += 250;
                break;
        }
        tasksCompleted[task] = true;
        updateUI();
        saveGame();
    }
}

// Show the requested page and hide the others
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// Reset the game state
function resetGame() {
    localStorage.clear();
    location.reload();
}

// Initialize the game
loadGame();
startIntervals();
