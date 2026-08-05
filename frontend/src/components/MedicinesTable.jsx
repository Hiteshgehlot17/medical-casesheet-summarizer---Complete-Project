function MedicinesTable({ medicines }) {
  return (
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
  );
}

export default MedicinesTable;