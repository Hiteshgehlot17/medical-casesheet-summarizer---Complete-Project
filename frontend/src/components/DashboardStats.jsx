import {
  FaUser,
  FaCapsules,
  FaNotesMedical,
  FaFileMedical
} from "react-icons/fa";

function DashboardStats({
  pages,
  medicines,
  investigations,
  symptoms
}) {
  const cards = [
    {
      title: "Pages",
      value: pages,
      icon: <FaFileMedical size={28} />,
      color: "bg-blue-500"
    },
    {
      title: "Medicines",
      value: medicines,
      icon: <FaCapsules size={28} />,
      color: "bg-green-500"
    },
    {
      title: "Investigations",
      value: investigations,
      icon: <FaNotesMedical size={28} />,
      color: "bg-purple-500"
    },
    {
      title: "Symptoms",
      value: symptoms,
      icon: <FaUser size={28} />,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

      {cards.map((card, index) => (

        <div
          key={index}
          className={`${card.color} text-white rounded-2xl p-6 shadow-xl`}
        >

          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm">{card.title}</p>

              <h2 className="text-3xl font-bold">
                {card.value}
              </h2>

            </div>

            {card.icon}

          </div>

        </div>

      ))}

    </div>
  );
}

export default DashboardStats;