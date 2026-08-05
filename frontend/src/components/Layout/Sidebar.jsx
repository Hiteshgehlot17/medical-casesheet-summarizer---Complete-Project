import {
  FaHome,
  FaUpload,
  FaHistory,
  FaCog
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 bg-blue-700 text-white min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-10">
        🏥 MedAI
      </h1>

      <div className="space-y-5">

        <button className="flex items-center gap-3 hover:text-gray-200">
          <FaHome />
          Dashboard
        </button>

        <button className="flex items-center gap-3 hover:text-gray-200">
          <FaUpload />
          Upload
        </button>

        <button className="flex items-center gap-3 hover:text-gray-200">
          <FaHistory />
          Reports
        </button>

        <button className="flex items-center gap-3 hover:text-gray-200">
          <FaCog />
          Settings
        </button>

      </div>

    </div>
  );
}

export default Sidebar;