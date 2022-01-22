import React from 'react';
import { useParams } from 'react-router-dom';

function ApplicationStatusPage() {
  const { basvuruNo } = useParams();

  return <div>ApplicationStatusPage {basvuruNo} </div>;
}

export default ApplicationStatusPage;
