function HistoryCard({ history }) {
  return (
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
  );
}

export default HistoryCard;