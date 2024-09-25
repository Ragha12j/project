import React, { useState } from 'react';
import {
  Button,
  Typography,
  Container,
  Box,
  IconButton,
  Alert
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Header from '../../../components/admin/Header';
import { textAlign } from '@mui/system';

const Input = styled('input')({
  display: 'none',
});

const AddAdvertisement = () => {
  const [adImage, setAdImage] = useState('');
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // حالة لتخزين رسالة النجاح

  const handleSubmit = () => {
    // تحقق من صحة المدخلات
    if (!adImage) {
      setError('الرجاء تحميل صورة للإعلان');
      return;
    }

    // يمكن هنا إرسال البيانات إلى الخادم
    const advertisementData = {
      adImage,
    };

    console.log('Advertisement Data:', advertisementData);

    // قم بتحديث حالة الرسالة لإظهار النجاح
    setSuccessMessage('تم إضافة الإعلان بنجاح!');
    setError(''); // إعادة تعيين أي أخطاء حالية

    // Reset form
    setAdImage('');
    setPreview('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdImage(file);
      setPreview(URL.createObjectURL(file)); // عرض الصورة المحملة قبل الإرسال
    }
  };

  return (

    <Container maxWidth="sm">

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          marginTop: '50px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" gutterBottom>
          إضافة إعلان جديد
        </Typography>

        {/* تحميل صورة الإعلان */}
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" onChange={handleFileChange} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10px', // لإضافة مسافة علوية
            }}
          >
            <IconButton color="primary" aria-label="upload advertisement image" component="span">
              <PhotoCamera />
            </IconButton>
          </Box>
          <Typography variant="body2" gutterBottom style={{ textAlign: 'center' }}>
            تحميل صورة الإعلان
          </Typography>
        </label>


        {/* عرض الصورة المحملة */}
        {preview && (
          <Box sx={{ marginTop: '10px' }}>
            <img src={preview} alt="Preview" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
          </Box>
        )}

        {/* رسالة خطأ */}
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        {/* رسالة نجاح */}
        {successMessage && (
          <Alert severity="success" sx={{ marginTop: '20px', width: '100%' }}>
            {successMessage}
          </Alert>
        )}

        {/* زر الإرسال */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{ marginTop: '20px' }}
        >
          إضافة الإعلان
        </Button>
      </Box>
    </Container>
  );
};

export default AddAdvertisement;
