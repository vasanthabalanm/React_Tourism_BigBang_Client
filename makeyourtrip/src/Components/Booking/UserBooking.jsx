import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  TextField,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, useNavigate } from 'react-router-dom';
import { toPdf } from '@react-pdf/renderer';
import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import './Userbooking.css'
import { FaUnlock } from 'react-icons/fa'

import { ToastContainer, toast } from 'react-toastify';
import bannerigs from '../../images/hurryup.jpg'
import image1 from '../../images/logo1.png'
import Footer from '../Footer/Footer';

const validationSchema = yup.object().shape({
  id: yup.number().required('User ID is required'),
  name: yup.string().required('Name is required'),
  startDate: yup.date().required('Start Date is required'),
  count: yup.number().required('Total Count is required'),
  packageID: yup.number().required('Package ID is required'),
});

const PdfDocument = ({ formData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>

          {/* <Text>Name: {formData.name}</Text> */}
          <Text>Start Date: {formData.startDate}</Text>
          <Text>Total Count: {formData.childCount}</Text>
          <Text>Total Count: {formData.adultCount}</Text>
          <Text>Package ID: {formData.packageID}</Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const UserBooking = () => {
  const [showLinks, setShowLinks] = useState(false);
  const userid = sessionStorage.getItem('Id')
  const newpackageid = sessionStorage.getItem('PackageID')
  const [formData, setFormData] = useState({
    id: userid,
    startDate: '',
    childCount: '',
    adultCount: '',
    packageID: newpackageid,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [invoicechange, setinvoicechange] = useState(1000)


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:7117/api/UserBook', formData);
      console.log(response.data);
      toast.success('Happy journey!');
      setinvoicechange(invoicechange + 1);
      const pdfData = (
        <PdfDocument formData={formData} />
      );
      const doc = new jsPDF();
      const logoImage = new Image();
      logoImage.src = image1;
      doc.addImage(logoImage, 'JPEG', 10, 10, 40, 40);
      doc.setFontSize(18);
      doc.text('MakeTrip', 60, 25);
      doc.setFontSize(14);
      doc.text('Computer bill', 60, 40);
      doc.setFontSize(12);
      doc.text(`Start Date: ${formData.startDate}`, 20, 60);
      doc.text(`Total childCount: ${formData.childCount}`, 20, 70);
      doc.text(`Total adultCount: ${formData.adultCount}`, 20, 80);
      doc.text(`Package ID: ${formData.packageID}`, 20, 90);
      doc.text(`Booking Number: ${invoicechange}`, 20, 100);

      // Stylish separator line
      doc.setLineWidth(0.5);
      doc.line(10, 100, 200, 100);

      // Success message
      doc.setFontSize(16);
      doc.text('Your Package Booked Successfully!Happy Journey', 20, 120);

      // Save the PDF
      doc.save('Computer Bill.pdf');

      // Clear the form data
      setFormData({
        startDate: '',
        childCount: '',
        adultCount: '',

      });

      alert("Now Pay Advance and take a screenshot of it");
      navigate('/getallpacks');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Error submitting form:', error);
        toast.error("Wrong Data");
      }
    }
  };



  const Logout = () => {
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('accesstoken')
    sessionStorage.removeItem('refreshtoken')
  }

  const [showLink, setShowLink] = useState(false);


  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <div className='combine'>
            <div><img src={image1} alt="" className='logo' /></div>
            <div className="brandname">MakeTrip</div>
          </div>
        </div>
        <div className={`navbar-toggle ${showLink ? 'active' : ''}`} onClick={toggleLinks}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`navbar-links ${showLink ? 'active' : ''}`}>
          <li>
            <Link to={'/'}><p className="fedbck" style={{ color: 'black' }}>Home</p></Link>
          </li>
          <li>
            <Link to={'/getallpacks'}><p className="fedbck" style={{ color: 'black' }}>Packages</p></Link>
          </li>
          <li>
            <Link to={'/feedback'}><p className="fedbck" style={{ color: 'black' }}>Feedback</p></Link>
          </li>
          <li>
            <Link to={'/'}><button className='login' onClick={Logout}><FaUnlock /> Logout</button></Link>
          </li>
        </ul>
      </nav>

      <p className='packhead text-center' >Book your slot! Hurry up!</p>

      <div className='container' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div>
          <img src={bannerigs} alt="" style={{ width: '400px', height: '500px' }} />
        </div>
        <div>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Book and Pay
              </Typography>
              <form onSubmit={handleSubmit}>

                {/* <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
              /> */}
                <TextField
                  fullWidth
                  margin="normal"
                  label=""
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  error={!!errors.startDate}
                  helperText={errors.startDate}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Total adultCount"
                  name="adultCount"
                  type="number"
                  value={formData.adultCount}
                  onChange={handleChange}
                  required
                  error={!!errors.adultCount}
                  helperText={errors.adultCount}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Total childCount"
                  name="childCount"
                  type="number"
                  value={formData.childCount}
                  onChange={handleChange}
                  required
                  error={!!errors.childCount}
                  helperText={errors.childCount}
                />

                <Button type="submit" variant="contained" color="primary" >
                  Submit
                </Button>
              </form>
            </Container>
            <ToastContainer />
          </Box>
        </div>
      </div>

      <Footer />
    </div>


  );
};

export default UserBooking;