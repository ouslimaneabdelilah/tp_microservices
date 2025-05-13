import Absence from "../models/absences.js"
import axios from "axios"; 

export async function create_absence(req, res) {
  const { studentId, comment, date, status } = req.body;
  const absence = new Absence({ studentId, date, status, comment });
  try {
    await absence.save();

    const response = await axios.put(`http://api-students:9000/students/${studentId}/increment-absence`);
    if (response.status !== 200) {
      return res.status(500).json({ message: "Absence créée, mais échec de la mise à jour du total d'absences de l'étudiant." });
    }

    res.status(201).json({ message: "Absence created successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error: cannot add this absence! " + err.message });
  }
}

export function getAllAbsences(req, res) {
  Absence.find()
    .then(absences => res.json(absences))
    .catch(err => res.status(500).json({ message: "Error fetching absences: " + err.message }));
}

export function getAbsenceById(req, res) {
  Absence.findById(req.params.id)
    .then(absence => {
      if (absence) res.json(absence);
      else res.status(404).json({ message: "Absence not found" });
    })
    .catch(err => res.status(500).json({ message: "Error fetching absence: " + err.message }));
}

export function updateAbsence(req, res) {
  Absence.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .then(absence => {
      if (absence) res.json(absence);
      else res.status(404).json({ message: "Absence not found" });
    })
    .catch(err => res.status(500).json({ message: "Error updating absence: " + err.message }));
}

export function deleteAbsence(req, res) {
  Absence.findByIdAndDelete(req.params.id)
    .then(absence => {
      if (absence) res.json({ message: "Absence deleted successfully" });
      else res.status(404).json({ message: "Absence not found" });
    })
    .catch(err => res.status(500).json({ message: "Error deleting absence: " + err.message }));
}