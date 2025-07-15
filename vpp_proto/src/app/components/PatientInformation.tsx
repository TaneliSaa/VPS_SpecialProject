"use client"

import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface Props {
  patientId: string | null;
  simulationId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

interface Patient {
  id: string;
  name: string;
  sex: string;
  age: string;
  medical_history: string;
  current_medication: string;
  symptoms: string;
  lifestyle: string;

}

const PatientInformation = ({ patientId, simulationId, isOpen, onClose }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [currentMedication, setCurrentMedication] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const {user} = useAuth();


  const saveData = async () => {

    const res = await fetch("/api/userPatientInformationInputs", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          user_id: user?.id,
          simulation_id: simulationId,
          name: name,
          sex: sex,
          age: age,
          medical_history: medicalHistory,
          current_medication: currentMedication,
          symptoms: symptoms,
          lifestyle: lifestyle 
        })
    });

    if (res.ok) {
      alert("Patient data saved!")
    } else {
      alert("Something went wrong.")
      console.log("DATA: ", res);
    }

    
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientId) return;

      try {
        const res = await fetch(`/api/patientInformation?id=${patientId}`);
        const result = await res.json();

        if (res.ok) {
          setPatient(result.data[0]);
        } else {
          console.error("Error:", result.message);
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    };

    fetchPatient();
  }, [patientId]);

  
  

  if (!isOpen) return null;

  return (
    <div>
      <h2 className="text-lg font-bold">Patient Information</h2>
      <ul className="text-md space-y-1">
        <li>
          <strong>Name: </strong>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Patient name"
          >
          </input>
        </li>

        <li>
          <strong>Sex: </strong>
          <input
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            placeholder="Patient gender"
          >
          </input>
        </li>

        <li>
          <strong>Age: </strong>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Patient age"
          >
          </input>
        </li>

        <li>
          <strong>Medical history: </strong>
          <input
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            placeholder="Patient medical history"
          >
          </input>
        </li>

        <li>
          <strong>Current Medications: </strong>
          <input
            value={currentMedication}
            onChange={(e) => setCurrentMedication(e.target.value)}
            placeholder="Patient current medication"
          >
          </input>
        </li>

        <li>
          <strong>Symptoms: </strong>
          <input
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Patient symptoms"
          >
          </input>
        </li>

        <li>
          <strong>Lifestyle: </strong>
          <input
            value={lifestyle}
            onChange={(e) => setLifestyle(e.target.value)}
            placeholder="Patient lifestyle"
          >
          </input>
        </li>
      </ul>

      <button
        onClick={onClose}
        className="btn btn-primary translate-y-40"
      >
        Close
      </button>

      <button
        onClick={saveData}
        className="btn btn-primary translate-y-40 translate-x-5"
      >
        Save
      </button>
    </div>
  );
};

export default PatientInformation;