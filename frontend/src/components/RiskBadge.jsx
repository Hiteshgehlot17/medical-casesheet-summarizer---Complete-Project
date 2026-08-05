function RiskBadge({ risk }) {

  const color =
    risk === "High"
      ? "bg-red-500"
      : risk === "Medium"
      ? "bg-yellow-400"
      : "bg-green-500";

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-4">
        Risk Level
      </h2>

      <span
        className={`${color} text-white px-5 py-2 rounded-full font-bold`}
      >
        {risk}
      </span>

    </div>
  );
}

export default RiskBadge;