export default function DoctorList({ doctors, isLoading }) {
  if (isLoading) {
    return <div className="flex-1 p-6">Loading...</div>;
  }

  if (!doctors || doctors.length === 0) {
    return <div className="flex-1 p-6">No doctors found matching your criteria.</div>;
  }

  return (
    <div className="flex-1 space-y-4">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          data-testid="doctor-card"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              {doctor.photo && (
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <h2 data-testid="doctor-name" className="text-xl font-semibold text-gray-900">
                {doctor.name}
              </h2>
              <p className="text-gray-600 mt-1">{doctor.specialities?.[0]?.name || 'General Physician'}</p>
              <p className="text-sm text-gray-500 mt-1">{doctor.doctor_introduction || `${doctor.specialities?.[0]?.name || 'General Physician'}`}</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{doctor.experience} yrs exp.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{doctor.clinic_name || 'Clinic'}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <div className="text-lg font-semibold text-gray-900">₹{doctor.fees}</div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}