import React from 'react';
import { useParams } from 'react-router-dom';

function AdminApplicationEditPage() {
  const { basvuruNo } = useParams();

  return <div>AdminApplicationEditPage {basvuruNo} </div>;
}

export default AdminApplicationEditPage;
