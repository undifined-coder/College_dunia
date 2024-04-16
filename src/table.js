import React, { useState, useEffect, useRef } from 'react';
import './table.css';

// Dummy data
const dummyColleges = [
  { id: 1, name: 'IIT Delhi', featured: false, rating: 4.5, fees: 50000, userRating: 4.2, placementPackage: '12-30 LPA' },
  { id: 2, name: 'IIT Bomaby', featured: true, rating: 4.2, fees: 60000, userRating: 4.0, placementPackage: '15-40 LPA' },
 
  { id: 3, name: 'IIT kanpur', featured: true, rating: 4.0, fees: 55000, userRating: 4.1, placementPackage: '11-25 LPA' },
  { id: 4, name: 'IIT Rorkee', featured: false, rating: 4.1, fees: 52000, userRating: 4.3, placementPackage: '10-22 LPA' },
  { id: 5, name: 'NIT Jamsedhpur', featured: true, rating: 4.3, fees: 58000, userRating: 3.9, placementPackage: '7-9 LPA' },
  { id: 6, name: 'NIT Delhi', featured: false, rating: 4.4, fees: 53000, userRating: 4.2, placementPackage: '6-9 LPA' },
  { id: 7, name: 'DTU Delhi', featured: true, rating: 4.2, fees: 57000, userRating: 4.0, placementPackage: '5-12 LPA' },
  { id: 8, name: 'NSUT Delhi', featured: false, rating: 3.9, fees: 54000, userRating: 4.4, placementPackage: '4-12 LPA' },
  { id: 9, name: 'GGSIPU Delhi', featured: true, rating: 4.5, fees: 59000, userRating: 4.1, placementPackage: '6-10 LPA' },
  { id: 10, name: 'IGDTUW Delhi', featured: false, rating: 4.6, fees: 56000, userRating: 4.3, placementPackage: '3-7 LPA' }
];

const Table = () => {
  const [colleges, setColleges] = useState([]);
  const [sortBy, setSortBy] = useState({ key: null, order: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [loadedRows, setLoadedRows] = useState(10);
  const tableRef = useRef(null);

  useEffect(() => {
    
    const fetchData = () => {
      setTimeout(() => {
        setColleges(dummyColleges.slice(0, loadedRows));
      }, 1000);
    };

    fetchData();
  }, [loadedRows]);

  const handleScroll = () => {
    const bottom = tableRef.current.scrollHeight - tableRef.current.scrollTop <= tableRef.current.clientHeight + 1;
    if (bottom) {
      setLoadedRows(prev => prev + 10);
    }
  };

  const handleSort = (key) => {
    if (sortBy.key === key) {
      setSortBy({ ...sortBy, order: sortBy.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortBy({ key, order: 'asc' });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortedColleges = [...colleges].sort((a, b) => {
    const keyA = a[sortBy.key];
    const keyB = b[sortBy.key];
    if (sortBy.order === 'asc') {
      return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
    } else {
      return keyA > keyB ? -1 : keyA < keyB ? 1 : 0;
    }
  });

  const filteredColleges = sortedColleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input type="text" placeholder="Search by college name" onChange={handleSearch} />
      <table ref={tableRef} onScroll={handleScroll}>
        <thead>
          <tr>
            <th>Index</th>
            <th onClick={() => handleSort('name')}>College Name</th>
            <th onClick={() => handleSort('rating')}>CollegeDunia Rating</th>
            <th onClick={() => handleSort('fees')}>Fees</th>
            <th onClick={() => handleSort('userRating')}>User Review Rating</th>
            <th onClick={() => handleSort('placementPackage')}>Placement Package</th>
            <th>Featured</th>
          </tr>
        </thead>
        <tbody>
          {filteredColleges.map((college, index) => (
            <tr key={college.id}>
              <td>{index + 1}</td>
              <td>{college.name}</td>
              <td>{college.rating}</td>
              <td>{college.fees}</td>
              <td>{college.userRating}</td>
              <td>{college.placementPackage}</td>
              <td>{college.featured ? 'Featured' : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
