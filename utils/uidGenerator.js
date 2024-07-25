// const crypto = require('crypto');
import crypto from "crypto"
async function generateUniqueUID(model) {
  let uid;
  let isUnique = false;

  while (!isUnique) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    uid = 'B2';

    for (let i = 0; i < 5; i++) {
      const randomIndex = crypto.randomInt(0, characters.length);
      uid += characters[randomIndex];
    }

    // Check if UID is unique
    const existingUser = await model.findOne({ uid });
    if (!existingUser) {
      isUnique = true;
    }
  }

  return uid;
}


export default generateUniqueUID