import express from "express";
import mongoose from "mongoose";
import {
  create_absence,
  getAllAbsences,
  getAbsenceById,
  updateAbsence,
  deleteAbsence
} from "./controllers/absence_controller.js";

const port = 7000;
const app = express();
app.use(express.json());

app.post("/absences", create_absence);
app.get("/absences", getAllAbsences);
app.get("/absences/:id", getAbsenceById);
app.put("/absences/:id", updateAbsence);
app.delete("/absences/:id", deleteAbsence);

const {
  MONGO_DB_NAME,
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
  MONGO_DB_PORT,
} = process.env;

const mongoUri = `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}?authSource=admin`;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("✅ Connexion MongoDB réussie");
    app.listen(port, () => {
      console.log(`API achats lancé sur http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Erreur de connexion MongoDB :", err.message);
  });

