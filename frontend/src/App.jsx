import { useState } from "react";
import api from "./services/api";
import PatientCard from "./components/PatientCard";
import DashboardStats from "./components/DashboardStats";
import { downloadJson } from "./utils/downloadJson";
import { downloadPdf } from "./utils/downloadPdf";
import DashboardLayout from "./components/Layout/DashboardLayout";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const uploadFile = async () => {
    if (!file) {
      alert("Please choose a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await api.post("/upload", formData);

      setResult(response.data);

    } catch (err) {
      console.error(err);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const patient = result?.summary?.[0]?.patient_information;
  const diagnosis = result?.summary?.[0]?.diagnosis;
  const risk = result?.summary?.[0]?.risk_level;
  const symptoms = result?.summary?.[0]?.symptoms || [];
  const history = result?.summary?.[0]?.medical_history || [];
  const medicines = result?.summary?.[0]?.medicines || [];
  const investigations = result?.summary?.[0]?.investigations || [];
  const patientSummary = result?.summary?.[0]?.patient_summary;
  const pageCount = result?.pages || 0;
  const medicineCount = medicines.length;
  const investigationCount = investigations.length;
  const symptomCount = symptoms.length;

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        AI Medical Case Sheet Summarizer
      </h1>

      {/* Upload Card */}

      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">

        <h2 className="text-2xl font-bold mb-5">
          Upload Medical Case Sheet
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={uploadFile}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Processing..." : "Upload PDF"}
        </button>

      </div>

      {result && (

        <div className="max-w-6xl mx-auto mt-10 space-y-6">

          {/* Patient Information */}
          <PatientCard patient={patient} />

          {/* Diagnosis */}

          <div className="bg-white rounded-2xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Diagnosis
            </h2>

            <p className="text-lg text-red-600 font-semibold">
              {diagnosis}
            </p>

          </div>

          {/* Risk Level */}

          <div className="bg-white rounded-2xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Risk Level
            </h2>

            <span className="bg-yellow-400 px-5 py-2 rounded-full font-bold">
              {risk}
            </span>

          </div>

          {/* Symptoms */}

          <div className="bg-white rounded-2xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Symptoms
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              {symptoms.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </div>

          {/* Medical History */}

          <div className="bg-white rounded-2xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Medical History
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              {history.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </div>

          {/* Medicines */}

          <div className="bg-white rounded-2xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Medicines
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full border border-gray-300">

                <thead className="bg-blue-600 text-white">

                  <tr>
                    <th className="p-3">Medicine</th>
                    <th className="p-3">Dosage</th>
                    <th className="p-3">Frequency</th>
                    <th className="p-3">Purpose</th>
                  </tr>

                </thead>

                <tbody>

                  {medicines.map((med, index) => (

                    <tr
                      key={index}
                      className="border-b hover:bg-gray-100"
                    >

                      <td className="p-3">{med.name}</td>
                      <td className="p-3">{med.dosage}</td>
                      <td className="p-3">{med.frequency}</td>
                      <td className="p-3">{med.purpose}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Investigations */}

          <div className="bg-white rounded-2xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Investigations
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              {investigations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </div>

          <DashboardStats
            pages={pageCount}
            medicines={medicineCount}
            investigations={investigationCount}
            symptoms={symptomCount}
            />

          {/* AI Patient Summary */}

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-10">

            <h2 className="text-2xl font-bold mb-4">
              AI Patient Summary
            </h2>

            <p className="leading-8 text-gray-700">
              {patientSummary}
            </p>

          </div>

          <div className="flex gap-4 mb-10">

  <button
    onClick={() => downloadJson(result.summary)}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
  >
    Download JSON
  </button>

  <button
    onClick={() => downloadPdf(result.summary)}
    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
  >
    Download PDF
  </button>

</div>

        </div>

      )}

    </DashboardLayout>
  );
}

export default App;