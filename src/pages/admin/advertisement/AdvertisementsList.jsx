import React, { useEffect, useState } from 'react';
import { Button, Typography, Container, Box, IconButton, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { advertisements } from './data'; // استيراد البيانات الافتراضية
import Header from '../../../components/admin/Header';

const AdvertisementsList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب الإعلانات من البيانات الافتراضية
  useEffect(() => {
    // استخدام البيانات الافتراضية بدلاً من جلب البيانات من API
    setAds(advertisements);
    setLoading(false); // تعيين الحالة إلى false عند الانتهاء
  }, []);

  // دالة لحذف الإعلان
  const handleDelete = (id) => {
    setAds(ads.filter((ad) => ad._id !== id));
  };

  return (
    <Container maxWidth="md">
      <Header /> {/* عرض الهيدر */}
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px', textAlign: 'center' }}>
        قائمة الإعلانات
      </Typography>

      {/* عرض الـ loading */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ marginTop: '20px' }}>
          {ads.map((ad) => (
            <Box
              key={ad._id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
              }}
            >
              {/* صورة الإعلان */}
              <img
                src={`/${ad.adImage}`} // تأكد من صحة المسار حسب تخزين الصور لديك
                alt="Advertisement"
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
              />

              {/* معلومات الإعلان */}
              <Box sx={{ flexGrow: 1, marginLeft: '20px' }}>
                <Typography variant="h6">مدير الإعلان: {ad.admin_id.name}</Typography>
              </Box>

              {/* أزرار التعديل والحذف والعرض */}
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <IconButton
                  color="primary"
                  onClick={() => console.log('عرض الإعلان', ad._id)} // تعديل هذه الدالة لاحقًا لعرض إعلان محدد
                >
                  <VisibilityIcon />
                </IconButton>

                <IconButton
                  color="secondary"
                  onClick={() => console.log('تعديل الإعلان', ad._id)} // تعديل هذه الدالة لاحقًا لتوجيه إلى صفحة التعديل
                >
                  <EditIcon />
                </IconButton>

                <IconButton color="error" onClick={() => handleDelete(ad._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default AdvertisementsList;
