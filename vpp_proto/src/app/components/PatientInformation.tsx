"use client"

import { useEffect, useState } from "react";

interface Props {
    patientId: string | null;
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

const PatientInformation = ({ patientId, isOpen, onClose }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);

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
        <li><strong>Name:</strong> {patient?.name}</li>
        <li><strong>Sex:</strong> {patient?.sex}</li>
        <li><strong>Age:</strong> {patient?.age}</li>
        <li><strong>Medical History:</strong> {patient?.medical_history}</li>
        <li><strong>Current Medications:</strong> {patient?.current_medication}</li>
        <li><strong>Symptoms:</strong> {patient?.symptoms}</li>
        <li><strong>Lifestyle:</strong> {patient?.lifestyle}</li>
      </ul>

      <button
        onClick={onClose}
        className="btn btn-primary translate-y-40"
      >
        Close
      </button>
    </div>
  );
};

export default PatientInformation;