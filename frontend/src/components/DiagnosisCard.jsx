function DiagnosisCard({ diagnosis }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Diagnosis
      </h2>

      <p className="text-lg text-red-600 font-semibold">
        {diagnosis}
      </p>
    </div>
  );
}

export default DiagnosisCard;