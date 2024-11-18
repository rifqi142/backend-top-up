const request = require("supertest");
const app = require("@/index");

const admin = require("@/controllers/firebaseController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { user, token } = require("@/models");
const { generateToken, sendEmail } = require("@/controllers/tokenController");
const generateRandomCharacter = require("@/helpers/generateRandomCharacter");


jest.mock("@/models")