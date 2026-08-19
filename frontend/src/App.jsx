import { useState } from "react";
import api from "./services/api";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");

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
      setActivePage("Summary");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please check that the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const summary = result?.summary?.[0];

  const patient = summary?.patient_information;
  const diagnosis = summary?.diagnosis;
  const risk = summary?.risk_level;
  const symptoms = summary?.symptoms || [];
  const history = summary?.medical_history || [];
  const medicines = summary?.medicines || [];
  const investigations = summary?.investigations || [];
  const patientSummary = summary?.patient_summary;

  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Upload Case Sheet", icon: "⬆️" },
    { name: "My Summaries", icon: "📄" },
    { name: "Patients", icon: "👤" },
    { name: "Reports", icon: "📊" },
    { name: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7ff] text-[#102a56] flex">

      {/* ================= SIDEBAR ================= */}

      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#082653] text-white shadow-xl z-50">

        <div className="h-20 flex items-center px-7 border-b border-blue-900">
          <div className="text-3xl mr-3">🏥</div>

          <div>
            <h1 className="text-2xl font-bold">MedAI</h1>
            <p className="text-xs text-blue-200">
              Medical Intelligence
            </p>
          </div>
        </div>

        <nav className="p-4 mt-5 space-y-2">

          {menuItems.map((item) => (

            <button
              key={item.name}
              onClick={() => {
                setActivePage(item.name);

                if (item.name === "Upload Case Sheet") {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }
              }}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-left transition ${
                activePage === item.name
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-blue-900"
              }`}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>
            </button>

          ))}

        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-blue-900">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-blue-200 flex items-center justify-center text-xl">
              👨‍⚕️
            </div>

            <div>
              <p className="font-semibold">Doctor</p>
              <p className="text-xs text-blue-200">
                Medical Professional
              </p>
            </div>

          </div>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="ml-64 flex-1 min-h-screen">

        {/* ================= TOP BAR ================= */}

        <header className="h-20 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-40">

          <div className="relative w-[430px]">

            <span className="absolute left-4 top-3 text-xl">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search anything..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#082653] text-white placeholder-blue-200 rounded-xl py-3 pl-12 pr-5 outline-none focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div className="flex items-center gap-7">

            <button className="text-2xl">
              🔔
            </button>

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                👨‍⚕️
              </div>

              <div>
                <p className="font-semibold text-sm">
                  Doctor
                </p>
                <p className="text-xs text-gray-500">
                  Medical Professional
                </p>
              </div>

              <span>⌄</span>

            </div>

          </div>

        </header>


        {/* ================= DASHBOARD ================= */}

        {activePage === "Dashboard" && (

          <div className="p-8">

            {/* Welcome */}

            <section className="flex justify-between items-start mb-8">

              <div>

                <h2 className="text-4xl font-bold mb-3">
                  Welcome back, Doctor! 👋
                </h2>

                <p className="text-gray-500 text-lg">
                  Here's what's happening with your medical summaries today.
                </p>

              </div>

              <div className="hidden lg:flex items-center gap-4">

                <div className="bg-white rounded-xl px-5 py-3 shadow-sm">
                  <span className="text-2xl">📊</span>
                  <p className="text-xs text-gray-500">
                    Summary
                  </p>
                  <p className="font-bold">
                    Generated
                  </p>
                </div>

                <div className="text-7xl">
                  🤖
                </div>

              </div>

            </section>


            {/* Statistics */}

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

              <StatCard
                icon="📋"
                value={result ? "1" : "0"}
                title="Case Sheets"
                subtitle="Uploaded"
                color="blue"
              />

              <StatCard
                icon="✓"
                value={result ? "1" : "0"}
                title="Summaries"
                subtitle="Generated"
                color="green"
              />

              <StatCard
                icon="✣"
                value={result ? "AI" : "—"}
                title="AI Analysis"
                subtitle="Model Powered"
                color="purple"
              />

              <StatCard
                icon="◷"
                value={loading ? "..." : result ? "Done" : "—"}
                title="Processing"
                subtitle="Current Status"
                color="orange"
              />

            </section>


            {/* AI Banner */}

            <section className="bg-gradient-to-r from-[#eef5ff] to-[#f6f9ff] border border-blue-100 rounded-3xl p-9 mb-8">

              <div className="grid lg:grid-cols-2 gap-10 items-center">

                <div>

                  <h2 className="text-3xl font-bold mb-4">
                    AI-Powered Medical Summaries
                  </h2>

                  <p className="text-gray-600 leading-7 mb-6 max-w-xl">
                    Our AI analyzes medical case sheets and generates
                    accurate, structured summaries in seconds.
                  </p>

                  <button
                    onClick={() => setActivePage("Upload Case Sheet")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
                  >
                    Upload Case Sheet →
                  </button>

                </div>


                <div className="flex justify-center items-center gap-5">

                  <ProcessCard
                    icon="📄"
                    title="Case Sheet"
                  />

                  <span className="text-4xl text-blue-500">
                    →
                  </span>

                  <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex flex-col items-center justify-center shadow-xl">
                    <span className="text-3xl font-bold">
                      AI
                    </span>
                    <span className="text-xs">
                      Analysis
                    </span>
                  </div>

                  <span className="text-4xl text-blue-500">
                    →
                  </span>

                  <ProcessCard
                    icon="📋"
                    title="Summary"
                  />

                </div>

              </div>

            </section>


            {/* Quick Actions */}

            <section>

              <h2 className="text-2xl font-bold mb-5">
                Quick Actions
              </h2>

              <div className="grid md:grid-cols-3 gap-5">

                <ActionCard
                  icon="⬆️"
                  title="Upload Case Sheet"
                  description="Upload a medical PDF for AI analysis"
                  onClick={() => setActivePage("Upload Case Sheet")}
                />

                <ActionCard
                  icon="📄"
                  title="View Summaries"
                  description="View your generated medical summaries"
                  onClick={() => setActivePage("My Summaries")}
                />

                <ActionCard
                  icon="📊"
                  title="View Reports"
                  description="Review your medical analysis reports"
                  onClick={() => setActivePage("Reports")}
                />

              </div>

            </section>

          </div>

        )}


        {/* ================= UPLOAD ================= */}

        {activePage === "Upload Case Sheet" && (

          <div className="p-8 max-w-5xl mx-auto">

            <PageHeader
              title="Upload Medical Case Sheet"
              description="Upload a PDF case sheet and let MedAI generate a structured summary."
            />

            <div className="bg-white rounded-3xl shadow-sm border p-10">

              <div className="border-2 border-dashed border-blue-200 rounded-2xl p-12 text-center bg-blue-50">

                <div className="text-6xl mb-5">
                  📄
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  Upload your case sheet
                </h3>

                <p className="text-gray-500 mb-7">
                  Supported format: PDF
                </p>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full max-w-lg mx-auto bg-white border rounded-xl p-3 mb-5"
                />

                {file && (
                  <p className="text-blue-600 font-medium mb-5">
                    Selected: {file.name}
                  </p>
                )}

                <button
                  onClick={uploadFile}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-10 py-3 rounded-xl font-bold shadow-lg"
                >
                  {loading ? "Processing with AI..." : "Analyze Case Sheet →"}
                </button>

              </div>

            </div>

          </div>

        )}


        {/* ================= SUMMARY ================= */}

        {activePage === "Summary" && result && (

          <div className="p-8 max-w-7xl mx-auto">

            <PageHeader
              title="AI Medical Summary"
              description="Structured information extracted from the uploaded case sheet."
            />

            <div className="grid lg:grid-cols-3 gap-6 mb-6">

              <InfoCard
                title="Diagnosis"
                value={diagnosis || "Not Mentioned"}
                accent="red"
              />

              <InfoCard
                title="Risk Level"
                value={risk || "Not Mentioned"}
                accent="yellow"
              />

              <InfoCard
                title="Patient"
                value={patient?.name || "Not Mentioned"}
                accent="blue"
              />

            </div>


            <div className="grid lg:grid-cols-2 gap-6">

              <SummarySection title="Patient Information">

                <InfoRow label="Name" value={patient?.name} />
                <InfoRow label="Age" value={patient?.age} />
                <InfoRow label="Gender" value={patient?.gender} />
                <InfoRow label="Hospital" value={patient?.hospital} />
                <InfoRow label="Doctor" value={patient?.doctor} />
                <InfoRow label="Admission" value={patient?.admission_date} />
                <InfoRow label="Discharge" value={patient?.discharge_date} />

              </SummarySection>


              <SummarySection title="AI Patient Summary">

                <p className="text-gray-600 leading-8">
                  {patientSummary || "Not Mentioned"}
                </p>

              </SummarySection>


              <SummarySection title="Symptoms">

                <List items={symptoms} />

              </SummarySection>


              <SummarySection title="Medical History">

                <List items={history} />

              </SummarySection>


              <SummarySection title="Investigations">

                <List items={investigations} />

              </SummarySection>


              <SummarySection title="Medicines">

                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead>
                      <tr className="border-b text-left">
                        <th className="py-3">Medicine</th>
                        <th className="py-3">Dosage</th>
                        <th className="py-3">Frequency</th>
                        <th className="py-3">Purpose</th>
                      </tr>
                    </thead>

                    <tbody>

                      {medicines.map((med, index) => (

                        <tr
                          key={index}
                          className="border-b last:border-0"
                        >
                          <td className="py-3 font-medium">
                            {med.name}
                          </td>

                          <td className="py-3">
                            {med.dosage}
                          </td>

                          <td className="py-3">
                            {med.frequency}
                          </td>

                          <td className="py-3">
                            {med.purpose}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </SummarySection>

            </div>

          </div>

        )}


        {/* ================= NO SUMMARY ================= */}

        {activePage === "My Summaries" && (

          <div className="p-8">

            <PageHeader
              title="My Summaries"
              description="Your previously generated AI medical summaries."
            />

            {result ? (

              <div className="bg-white rounded-2xl border shadow-sm p-6">

                <div className="flex justify-between items-center">

                  <div>
                    <h3 className="font-bold text-xl">
                      {patient?.name || "Medical Case Sheet"}
                    </h3>

                    <p className="text-gray-500">
                      {diagnosis || "Medical summary generated"}
                    </p>
                  </div>

                  <button
                    onClick={() => setActivePage("Summary")}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                  >
                    View Summary
                  </button>

                </div>

              </div>

            ) : (

              <EmptyState
                icon="📄"
                title="No summaries yet"
                description="Upload your first case sheet to generate an AI summary."
              />

            )}

          </div>

        )}


        {/* ================= OTHER PAGES ================= */}

        {(activePage === "Patients" ||
          activePage === "Reports" ||
          activePage === "Settings") && (

          <div className="p-8">

            <PageHeader
              title={activePage}
              description={`Manage your ${activePage.toLowerCase()} here.`}
            />

            <EmptyState
              icon={
                activePage === "Patients"
                  ? "👤"
                  : activePage === "Reports"
                  ? "📊"
                  : "⚙️"
              }
              title={`${activePage} section`}
              description="This section is ready for future features."
            />

          </div>

        )}

      </main>

    </div>
  );
}


/* ================= COMPONENTS ================= */

function StatCard({
  icon,
  value,
  title,
  subtitle,
  color,
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <div className="flex items-center gap-5">

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${colors[color]}`}
        >
          {icon}
        </div>

        <div>

          <p className="text-3xl font-bold">
            {value}
          </p>

          <p className="font-bold">
            {title}
          </p>

          <p className="text-sm text-gray-500">
            {subtitle}
          </p>

        </div>

      </div>

    </div>
  );
}


function ProcessCard({ icon, title }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 text-center w-28">
      <div className="text-3xl mb-2">
        {icon}
      </div>

      <p className="text-sm font-semibold">
        {title}
      </p>
    </div>
  );
}


function ActionCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white border rounded-2xl p-6 text-left hover:-translate-y-1 hover:shadow-lg transition"
    >

      <div className="text-3xl mb-4">
        {icon}
      </div>

      <h3 className="font-bold text-lg mb-2">
        {title}
      </h3>

      <p className="text-gray-500 text-sm">
        {description}
      </p>

      <p className="text-blue-600 font-semibold mt-4">
        Open →
      </p>

    </button>
  );
}


function PageHeader({ title, description }) {
  return (
    <div className="mb-8">

      <h2 className="text-4xl font-bold mb-2">
        {title}
      </h2>

      <p className="text-gray-500 text-lg">
        {description}
      </p>

    </div>
  );
}


function InfoCard({ title, value, accent }) {
  const styles = {
    red: "bg-red-50 text-red-600",
    yellow: "bg-yellow-50 text-yellow-700",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <p className="text-gray-500 mb-2">
        {title}
      </p>

      <div
        className={`inline-block px-4 py-2 rounded-xl font-bold ${styles[accent]}`}
      >
        {value}
      </div>

    </div>
  );
}


function SummarySection({ title, children }) {
  return (
    <section className="bg-white rounded-2xl border shadow-sm p-6">

      <h3 className="text-xl font-bold mb-5">
        {title}
      </h3>

      {children}

    </section>
  );
}


function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between gap-5 py-3 border-b last:border-0">

      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-semibold text-right">
        {value || "Not Mentioned"}
      </span>

    </div>
  );
}


function List({ items }) {
  if (!items.length) {
    return (
      <p className="text-gray-500">
        Not Mentioned
      </p>
    );
  }

  return (
    <ul className="space-y-3">

      {items.map((item, index) => (

        <li
          key={index}
          className="flex gap-3 text-gray-600"
        >
          <span className="text-blue-600">
            •
          </span>

          <span>
            {item}
          </span>
        </li>

      ))}

    </ul>
  );
}


function EmptyState({
  icon,
  title,
  description,
}) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-16 text-center">

      <div className="text-6xl mb-5">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-2">
        {title}
      </h3>

      <p className="text-gray-500">
        {description}
      </p>

    </div>
  );
}

export default App;