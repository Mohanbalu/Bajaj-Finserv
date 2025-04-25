import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import DoctorList from './components/DoctorList';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    consultationType: '',
    specialties: [],
    sortBy: ''
  });

  const { data: doctors = [], isLoading } = useQuery('doctors', () =>
    fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json').then(res => res.json())
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlFilters = {
      consultationType: params.get('consultationType') || '',
      specialties: params.getAll('specialty') || [],
      sortBy: params.get('sortBy') || ''
    };
    setFilters(urlFilters);
    setSearchTerm(params.get('search') || '');
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (filters.consultationType) params.set('consultationType', filters.consultationType);
    filters.specialties.forEach(specialty => params.append('specialty', specialty));
    if (filters.sortBy) params.set('sortBy', filters.sortBy);
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({}, '', newUrl);
  }, [searchTerm, filters]);

  const filteredDoctors = doctors
    .filter(doctor => {
      const matchesSearch = !searchTerm || doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesConsultation = !filters.consultationType || doctor.consultationType === filters.consultationType;
      const matchesSpecialties = filters.specialties.length === 0 || 
        filters.specialties.some(specialty => doctor.specialities?.some(s => s.name === specialty));
      
      return matchesSearch && matchesConsultation && matchesSpecialties;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'fees') {
        // Extract numeric value from fees string and handle currency symbols
        const getFeeValue = (fee) => {
          const numericValue = parseFloat(fee?.replace(/[^0-9.-]+/g, '')) || 0;
          return numericValue;
        };
        return getFeeValue(a.fees) - getFeeValue(b.fees);
      }
      if (filters.sortBy === 'experience') {
        const aExp = parseFloat(a.experience) || 0;
        const bExp = parseFloat(b.experience) || 0;
        return bExp - aExp;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          doctors={doctors}
        />
        <div className="mt-8 flex gap-8">
          <FilterPanel 
            filters={filters}
            setFilters={setFilters}
            doctors={doctors}
          />
          <DoctorList 
            doctors={filteredDoctors}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;