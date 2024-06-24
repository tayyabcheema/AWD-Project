import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    email: '',
    phone: '',
    address: '',
    area: '',
    city: '',
  });
  const [dialogContent, setDialogContent] = useState('Are you sure you want to delete this hospital?');
  const [showSuccess, setShowSuccess] = useState(false);
  const accessToken = localStorage.getItem('accessToken');

  const types = ["hospital", "organization"];
  const areas = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "GB"];

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/hospitals', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setHospitals(response.data.data); // Adjusted to access the 'data' object
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, [accessToken]);

  const handleDeleteClickOpen = (hospital) => {
    setSelectedHospital(hospital);
    setDialogContent('Are you sure you want to delete this hospital?');
    setShowSuccess(false);
    setOpenDeleteDialog(true);
  };

  const handleUpdateClickOpen = (hospital) => {
    setSelectedHospital(hospital);
    setFormData({
      name: hospital.name,
      type: hospital.type,
      email: hospital.email,
      phone: hospital.phone,
      address: hospital.address,
      area: hospital.area,
      city: hospital.city,
    });
    setOpenUpdateDialog(true);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
    setOpenUpdateDialog(false);
    setSelectedHospital(null);
    setDialogContent('Are you sure you want to delete this hospital?');
    setShowSuccess(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/auth/hospitals/${selectedHospital._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDialogContent('Hospital deleted successfully');
      setShowSuccess(true);
      // Fetch the updated list of hospitals
      const response = await axios.get('http://localhost:8000/api/auth/hospitals', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setHospitals(response.data.data);
    } catch (error) {
      console.error('Error deleting hospital:', error);
      setDialogContent('Failed to delete hospital');
      setShowSuccess(true);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/auth/hospitals/${selectedHospital._id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setOpenUpdateDialog(false);
      // Fetch the updated list of hospitals
      const response = await axios.get('http://localhost:8000/api/auth/hospitals', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setHospitals(response.data.data);
    } catch (error) {
      console.error('Error updating hospital:', error);
      alert('Failed to update hospital');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hospitals</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Area</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>City</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hospitals.map((hospital, index) => (
              <TableRow key={hospital._id}>
                <TableCell>{index + 1}</TableCell> {/* Display index + 1 */}
                <TableCell>{hospital.name}</TableCell>
                <TableCell>{hospital.type}</TableCell>
                <TableCell>{hospital.email}</TableCell>
                <TableCell>{hospital.phone}</TableCell>
                <TableCell>{hospital.address}</TableCell>
                <TableCell>{hospital.area}</TableCell>
                <TableCell>{hospital.city}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="edit" onClick={() => handleUpdateClickOpen(hospital)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete" onClick={() => handleDeleteClickOpen(hospital)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog} onClose={handleClose}>
        <DialogTitle>Delete Hospital</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!showSuccess ? (
            <>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="secondary">
                Delete
              </Button>
            </>
          ) : (
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={openUpdateDialog} onClose={handleClose}>
        <DialogTitle>Update Hospital</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Area</InputLabel>
            <Select
              label="Area"
              name="area"
              value={formData.area}
              onChange={handleChange}
            >
              {areas.map((area) => (
                <MenuItem key={area} value={area}>
                  {area}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="City"
            type="text"
            fullWidth
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Hospitals;
