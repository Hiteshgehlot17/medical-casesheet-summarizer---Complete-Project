function SummaryCard({ summary }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-10">

      <h2 className="text-2xl font-bold mb-4">
        AI Patient Summary
      </h2>

      <p className="leading-8 text-gray-700">
        {summary}
      </p>

    </div>
  );
}

export default SummaryCard;