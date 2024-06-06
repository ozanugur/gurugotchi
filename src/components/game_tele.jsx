import React, { useState, useEffect, useRef } from 'react';
import { db } from './Firebase';  // Assuming firebase is already configured properly
import { doc, setDoc, getDoc } from "firebase/firestore";

// Function to get query parameter
const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

const useGameLogic = () => {
  //const userId = getQueryParam('user_id');
  const userId = "user_id";
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState(100);
  const [hunger, setHunger] = useState(100);
  const [serenity, setSerenity] = useState(100);
  const [points, setPoints] = useState(0);
  const [healthUpgrade, setHealthUpgrade] = useState(1);
  const [hungerUpgrade, setHungerUpgrade] = useState(1);
  const [serenityUpgrade, setSerenityUpgrade] = useState(1);

  const upgradePrices = [100, 200, 300, 400, 500, 600];
  const initialLoad = useRef(true);

  const defaultGameState = {
    health: 100,
    hunger: 100,
    serenity: 100,
    points: 0,
    healthUpgrade: 1,
    hungerUpgrade: 1,
    serenityUpgrade: 1,
  };

  const calculateDecreaseAmount = (level) => {
    const decreaseRatePerHour = 25; // 25 points per hour
    const decreaseRate = decreaseRatePerHour / (level * 3600000); // level * (3600000 ms per hour)
    return decreaseRate;
  };

  // Load game state from Firestore when the component mounts
  useEffect(() => {
    if (!userId) {
      console.error("Invalid userId");
      return;
    }

    const loadState = async () => {
      console.log("Loading game state...");
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const gameState = docSnap.data();
          setHealth(gameState.health);
          setHunger(gameState.hunger);
          setSerenity(gameState.serenity);
          setPoints(gameState.points);
          setHealthUpgrade(gameState.healthUpgrade);
          setHungerUpgrade(gameState.hungerUpgrade);
          setSerenityUpgrade(gameState.serenityUpgrade);
          console.log("Game state loaded:", gameState);
        } else {
          console.log("No game state found for user:", userId);
          // Initialize new state
          await setDoc(docRef, defaultGameState);
          console.log("New game state created for user:", userId);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading game state:", error);
        setLoading(false);
      }
    };
    loadState();
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHealth((prev) => Math.max(prev - calculateDecreaseAmount(healthUpgrade), 0));
      setHunger((prev) => Math.max(prev - calculateDecreaseAmount(hungerUpgrade), 0));
      setSerenity((prev) => Math.max(prev - calculateDecreaseAmount(serenityUpgrade), 0));
    }, 1000); // Reduce the frequency to once per second

    return () => clearInterval(interval);
  }, [healthUpgrade, hungerUpgrade, serenityUpgrade]);

  useEffect(() => {
    const pointsInterval = setInterval(() => {
      const basePoints = 60;
      let newPoints = 0;
      if (health >= 75) newPoints += basePoints * 3;
      else if (health >= 50) newPoints += basePoints * 2;
      else if (health >= 25) newPoints += basePoints;

      if (hunger >= 75) newPoints += basePoints * 3;
      else if (hunger >= 50) newPoints += basePoints * 2;
      else if (hunger >= 25) newPoints += basePoints;

      if (serenity >= 75) newPoints += basePoints * 3;
      else if (serenity >= 50) newPoints += basePoints * 2;
      else if (serenity >= 25) newPoints += basePoints;

      setPoints((prev) => prev + newPoints / 600); // convert to points per second
    }, 1000); // Reduce the frequency to once per second

    return () => clearInterval(pointsInterval);
  }, [health, hunger, serenity]);

  const increaseStat = (stat) => {
    if (stat === 'health') setHealth((prev) => Math.min(prev + 10, 100));
    if (stat === 'hunger') setHunger((prev) => Math.min(prev + 10, 100));
    if (stat === 'serenity') setSerenity((prev) => Math.min(prev + 10, 100));
  };

  const buyUpgrade = (upgrade) => {
    const upgradeLevel = (upgrade === 'Cat Bed' ? healthUpgrade : upgrade === 'Snacks' ? hungerUpgrade : serenityUpgrade);
    const price = upgradePrices[upgradeLevel - 1];

    if (points >= price) {
      setPoints((prev) => prev - price);
      if (upgrade === 'Cat Bed') setHealthUpgrade((prev) => Math.min(prev + 1, 6));
      if (upgrade === 'Snacks') setHungerUpgrade((prev) => Math.min(prev + 1, 6));
      if (upgrade === 'Candle') setSerenityUpgrade((prev) => Math.min(prev + 1, 6));
    }
  };

  const saveGameState = async () => {
    if (!userId || loading) {
      return;
    }

    const gameState = {
      health: Math.floor(health),
      hunger: Math.floor(hunger),
      serenity: Math.floor(serenity),
      points: Math.floor(points),
      healthUpgrade: Math.floor(healthUpgrade),
      hungerUpgrade: Math.floor(hungerUpgrade),
      serenityUpgrade: Math.floor(serenityUpgrade),
    };

    try {
      console.log("Saving game state...", gameState);
      const docRef = doc(db, "users", userId);
      await setDoc(docRef, gameState, { merge: true });
      console.log("Game state saved successfully.");
    } catch (error) {
      console.error("Error saving game state:", error);
    }
  };

  // Save state using fetch when the user leaves the page
  useEffect(() => {
    const handleUnload = (event) => {
      console.log("User is leaving the page, saving game state...");

      const gameState = {
        health: Math.floor(health),
        hunger: Math.floor(hunger),
        serenity: Math.floor(serenity),
        points: Math.floor(points),
        healthUpgrade: Math.floor(healthUpgrade),
        hungerUpgrade: Math.floor(hungerUpgrade),
        serenityUpgrade: Math.floor(serenityUpgrade),
      };

      const payload = JSON.stringify({
        fields: {
          health: { integerValue: gameState.health },
          hunger: { integerValue: gameState.hunger },
          serenity: { integerValue: gameState.serenity },
          points: { integerValue: gameState.points },
          healthUpgrade: { integerValue: gameState.healthUpgrade },
          hungerUpgrade: { integerValue: gameState.hungerUpgrade },
          serenityUpgrade: { integerValue: gameState.serenityUpgrade }
        }
      });

      const blob = new Blob([payload], { type: 'application/json' });

      // Send the Blob using fetch
      const url = `https://firestore.googleapis.com/v1/projects/testlebi-96680/databases/(default)/documents/users/${userId}`;

      const headers = new Headers();
      headers.append("Authorization", `Bearer ya29.c.c0AY_VpZhannH4tu6SMCMV5SwEMe-R6G4whrQ06O_89GeE8GYeRdeic3RCZ-QvSrh8ML7LIE-yAXYdg_KGjvutsU13QeIShJMt6cbfx5CORtFj2oe5VI8H8OgztEHapdQK2ZsGyg10V_npVnAfj5VDL8XC9flYDnGaMbFXgFXPVs1uyJIc-CQJI6esLPhuWfxvfDRkrcZ8YrGKoFqC8eFBkBoA0wnxn5zp0nljgLrKXjIRLQcznf2oe2IdCOAp2bZXjJ0UnIxzgZhjqPmdMiYW_NWRncBL3ZXjra4ylIDAgCsnDAe8R0O3ZJXdhTphMhuUmswh91wm2iW5s0W_Uvppx-zM40h_mPO4gWjPeunYkRZe7EPoV9M5XjEE384Cy8FlBui-BVYvStr1X2-_dxy1hMx373qIa-i0t7eyejYBjRdZYJWV_bIYuu6Jh3r80dZ7B391n6fIrkkWJ0FXm0QZyIkxy8hrY_cI9qRdm5X6uOXuxk_Ixj_2kB9-9by-47Ih2v1xnMryiukdX5sIIw3VZ1glYozt0nltyc0y5WpiaoW5i5XX-V_fgdi_alngOl-Fc8Xk42yucFraFUM9MQv6YRQIjvzJidOfYj_Zv6FhajuOdMvs4bx9f1729QoromqdcQjikSSc-uS6z015dc42Vw7Sa3axUVkpw3OFqV8sdQYZqf8d2BFs28FQOW8UUg2cRFpxVVagvOs_uv0I5hj-58ycr5oiMmBYjcSSikJlbQzOqsWnBoqmv2f4ytfWl8mrqUabWUofUvhUge9_XW-w3_2fqumQx3m6Fok7I9aqFQjlmaIkFZkv_be24pYkJj4BoxM0rb1if6vsBZnz-g1zocuk5ZrZVr6bkv8ljc_3xrdYoOWyOUbWVvRBm8uIU8fvwwm-ouaqrZsyptufZtnVXvWkkQjZ_8OukB08z6crMjxanf1dfX98xn9MvMldJ7WVqYvwtz1o_ez2ut8ZruWOX5BZyY-fs5xjpjIlVnl1mi7eaQXyfcak8lq`);

      const options = {
        method: 'PATCH',
        headers: headers,
        body: blob,
        keepalive: true // Ensure the request is made even if the page is closing
      };

      fetch(url, options).then(response => {
        if (!response.ok) {
          response.json().then(error => {
            console.error('Error saving game state:', error);
          });
        }
      }).catch(error => {
        console.error('Error saving game state:', error);
      });

      // Trigger the prompt
      event.returnValue = 'You might have some unsaved progress...';
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [health, hunger, serenity, points, healthUpgrade, hungerUpgrade, serenityUpgrade, userId, loading]);

  return {
    loading,
    health,
    hunger,
    serenity,
    points,
    healthUpgrade,
    hungerUpgrade,
    serenityUpgrade,
    upgradePrices,
    increaseStat,
    buyUpgrade,
  };
};

export default useGameLogic;
