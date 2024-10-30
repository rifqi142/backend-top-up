const generateRandomCharacter = (length) => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";

  const randomUppercase =
    uppercase[Math.floor(Math.random() * uppercase.length)];
  const randomLowercase =
    lowercase[Math.floor(Math.random() * lowercase.length)];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  const randomSpecialChar =
    specialChars[Math.floor(Math.random() * specialChars.length)];

  const allCharacters = uppercase + lowercase + numbers + specialChars;
  let password =
    randomUppercase + randomLowercase + randomNumber + randomSpecialChar;

  for (let i = password.length; i < length; i++) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
};

module.exports = generateRandomCharacter;
