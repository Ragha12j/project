import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  IconButton
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const AddDecoration = () => {
  const [name, setName] = useState('');
  const [classification, setClassification] = useState('');
  const [status, setStatus] = useState('active');
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // تحقق من صحة المدخلات
    if (!name || !classification || pictures.length === 0) {
      setError('الرجاء إدخال جميع الحقول المطلوبة');
      return;
    }

    // يمكن هنا إرسال البيانات إلى الخادم
    const decorationData = {
      name,
      classification,
      status,
      pictures,
    };

    console.log('Decoration Data:', decorationData);

    // Reset form
    setName('');
    setClassification('');
    setStatus('active');
    setPictures([]);
    setError('');
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPictures(files.map((file) => URL.createObjectURL(file)));
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
          إضافة ديكور جديد
        </Typography>

        {/* اسم الديكور */}
        <TextField
          label="اسم الديكور"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* تصنيف الديكور */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="classification-label">تصنيف الديكور</InputLabel>
          <Select
            labelId="classification-label"
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            label="تصنيف الديكور"
          >
            <MenuItem value="birth">ميلاد</MenuItem>
            <MenuItem value="graduation">تخرج</MenuItem>
            <MenuItem value="wedding">زفاف</MenuItem>
          </Select>
        </FormControl>

        {/* حالة الديكور */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">حالة الديكور</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="حالة الديكور"
          >
            <MenuItem value="active">نشط</MenuItem>
            <MenuItem value="inactive">غير نشط</MenuItem>
          </Select>
        </FormControl>

        {/* تحميل الصور */}
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" multiple onChange={handleFileChange} />
          <IconButton color="primary" aria-label="upload pictures" component="span">
            <PhotoCamera />
          </IconButton>
          <Typography variant="body2" gutterBottom>
            تحميل صور الديكور
          </Typography>
        </label>

        {/* عرض الصور المحملة */}
        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
          {pictures.map((src, index) => (
            <img key={index} src={src} alt={`Decoration ${index}`} style={{ width: '100px', height: '100px' }} />
          ))}
        </Box>

        {/* رسالة خطأ */}
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        {/* زر الإرسال */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{ marginTop: '20px' }}
        >
          إضافة الديكور
        </Button>
      </Box>
    </Container>
  );
};

export default AddDecoration;
