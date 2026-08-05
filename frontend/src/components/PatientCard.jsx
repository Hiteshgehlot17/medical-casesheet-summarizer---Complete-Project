function PatientCard({ patient }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Patient Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <p><strong>Name:</strong> {patient?.name}</p>
          <p><strong>Age:</strong> {patient?.age}</p>
          <p><strong>Gender:</strong> {patient?.gender}</p>
        </div>

        <div>
          <p><strong>Hospital:</strong> {patient?.hospital}</p>
          <p><strong>Doctor:</strong> {patient?.doctor}</p>
          <p><strong>Admission:</strong> {patient?.admission_date}</p>
        </div>

      </div>

    </div>
  );
}

export default PatientCard;