import React, { useState, useEffect, useRef } from 'react';
import { db } from './Firebase';  // Assuming firebase is already configured properly
import { doc, setDoc, getDoc } from "firebase/firestore";

const useGameLogic = (userId) => {
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
      headers.append("Authorization", `Bearer ya29.c.c0AY_VpZglbMOmlfvn1IzoIues8UMBKXb1tQq5wtubawsI2TA0Zmr1TMHJQOaNaQ2Qr3yed4O2ImQE-s_uY3u9kKp40s3ZMT_PZwiIlSbUIkr6jacOknW62_AyoBxC7poSG1pjDV247N2RyPBFuOU1Gb4GrltggHXKmA1uYn3aUDTvq8ncz4tHo-9an42qTq9rb69zIY97YsT-7IN4kZQ0q6xUxmJQ7bJJAqFKR7XDhybj_8DJ4Rz6P5Xi0oBRkZMGNQkNV-hafhusIgLKB8HXqot_lBuKus3oMWtzA6YtPulu_0glNfdUOAzCpK_KoYvObPdXE_Bu9bZwH4ZoxX6IA7BTo73SK8dHNf-ImaqVeq46xcfCdi2iTdoAL385CZ19bow9tc_svk2tjrhxdZcWUYSnQi59lJcwxj1vmFsc9xbbZJWh0cvbbalRUae596Ux7y2qOitre-JMvl5uB6--oOiWptoFilX9jZq4Iqj1zv7BhsXBuxXuM0BRbdYUWvUblX8k4sZo6SFj-SibYIf0kftgqah4M_8ySIjUS859sd773nFXceSdaVp6vruxJYWubkR796i2lFR-_R_UiFa2kQ5l68k3Y5i3gYm4OvViv9r0ldX9YMdjmF231UZvO0QVhqnSelBathVoYt7d9h0UW4Yk04blhh4nX8FR_5Jx2cwV8wW_zpgUiRfUxMySxRjue7nz_qJ3ijhre_MJ7x0rBgm4FUOMt9af2_BvnfscnRqn_si8qk0n3btOvMQn8uOmQ-6zpyhVlobRgOU5OFQ7Mn_BVlnbksyVU0YWvjdInxVaWZRVd9h7c-k7J84Qxcqczmp_hf8uSwVWXh66_eXn-rbVzQcU8mqddVjj8Qxmr2JmbtQVOmOrapkphYuezIm0UZzI1aRitM8y_u_ZMS3ymJVWOekumXnU78R7Y_6qWJiOSzVaYjynzss-Z4o6arJ_ZR4dbBRvkne4jju0aa_BbZMkfZnQbqRk557rvjo31U9gQVMRcX4c7h_`);

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
