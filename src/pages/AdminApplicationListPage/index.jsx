import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/Button';
import Spinner from '../../components/Spinner';
import Wrapper from '../../components/Wrapper';
import db from '../../firebase';
import { logout, setApplications } from '../../redux/adminSlice';
import './index.css';

function AdminApplicationListPage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { applications } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    const applicationList = [];
    const querySnapshot = await getDocs(collection(db, 'applications'));
    querySnapshot.forEach((doc) => {
      applicationList.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    dispatch(setApplications(applicationList));
    setLoading(false);
  };

  const onViewClick = (id) => {
    navigate(`/admin/basvuru/${id}`);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const sortedApplications = [...applications]?.sort(
    (a, b) => b.createdAt - a.createdAt
  );

  return (
    <div>
      <CustomButton
        className="logout"
        type="button"
        onClick={() => dispatch(logout())}
      >
        Logout
      </CustomButton>
      <Wrapper className="list-wrapper">
        {loading && <Spinner />}

        {sortedApplications.length < 1 ? (
          <div>Hiçbir Başvuru Bulunamadı</div>
        ) : (
          sortedApplications.map((item) => (
            <div key={item.id} className="app-list">
              <p className="app-baslik">
                {item.isim} {item.soyisim}
              </p>
              <div className="app-list-right">
                <p className="app-tarih">
                  {moment(item.createdAt).format('DD/MM/YYYY')}
                </p>
                <CustomButton
                  type="button"
                  className="listBtn"
                  onClick={() => onViewClick(item.id)}
                >
                  Görüntüle
                </CustomButton>
              </div>
            </div>
          ))
        )}
      </Wrapper>
    </div>
  );
}

export default AdminApplicationListPage;
