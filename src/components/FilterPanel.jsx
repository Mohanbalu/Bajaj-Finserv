import { useState } from 'react';

export default function FilterPanel({ filters, setFilters, doctors }) {
  const [specialtySearch, setSpecialtySearch] = useState('');

  if (!doctors) {
    return null;
  }

  const specialties = [...new Set(doctors.flatMap(doctor => 
    doctor.specialities?.map(s => s.name) || []
  ))].sort();

  const filteredSpecialties = specialties.filter(specialty =>
    specialty.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  const handleConsultationChange = (type) => {
    setFilters(prev => ({
      ...prev,
      consultationType: prev.consultationType === type ? '' : type
    }));
  };

  const handleSpecialtyChange = (specialty) => {
    setFilters(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({
      ...prev,
      sortBy: prev.sortBy === sortBy ? '' : sortBy
    }));
  };

  return (
    <div className="w-72 bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">Filters</h3>
          <button
            onClick={() => setFilters({ consultationType: '', specialties: [], sortBy: '' })}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="p-4 border-b">
        <h3 className="font-medium text-gray-900 mb-3">Sort by</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              checked={filters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Price: Low-High</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={filters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Experience - Most Experience first</span>
          </label>
        </div>
      </div>

      <div className="p-4 border-b">
        <h3 className="font-medium text-gray-900 mb-3">Specialities</h3>
        <div className="relative">
          <input
            type="text"
            value={specialtySearch}
            onChange={(e) => setSpecialtySearch(e.target.value)}
            placeholder="Search Speciality"
            className="w-full p-2 pr-8 border rounded-lg text-sm"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
          {filteredSpecialties.map(specialty => (
            <label key={specialty} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="ml-2 text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-3">Mode of consultation</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              checked={filters.consultationType === 'Video Consult'}
              onChange={() => handleConsultationChange('Video Consult')}
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Video Consultation</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={filters.consultationType === 'In Clinic'}
              onChange={() => handleConsultationChange('In Clinic')}
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">In-clinic Consultation</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={!filters.consultationType}
              onChange={() => handleConsultationChange('')}
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">All</span>
          </label>
        </div>
      </div>
    </div>
  );
}