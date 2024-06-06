const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.saveGameState = functions.https.onRequest(async (req, res) => {
  const {userId, gameState} = req.body;

  if (!userId || !gameState) {
    res.status(400).send("Invalid request");
    return;
  }

  try {
    await admin.firestore().collection("users").doc(userId).set(gameState);
    res.status(200).send("Game state saved successfully");
  } catch (error) {
    res.status(500).send("Error saving game state: " + error.message);
  }
});
