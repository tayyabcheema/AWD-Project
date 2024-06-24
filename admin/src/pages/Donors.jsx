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

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    nationality: 'Pakistani',
    medicalFit: '',
    email: '',
    phone: '',
    address: '',
    area: '',
    city: '',
  });
  const [dialogContent, setDialogContent] = useState('Are you sure you want to delete this donor?');
  const [showSuccess, setShowSuccess] = useState(false);
  const accessToken = localStorage.getItem('accessToken');

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const nationalities = ["Pakistani"];
  const medicalFits = ["Yes", "No"];
  const areas = ["Downtown", "Uptown"];

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/donors', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setDonors(response.data.data); // Adjusted to access the 'data' object
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    fetchDonors();
  }, [accessToken]);

  const handleDeleteClickOpen = (donor) => {
    setSelectedDonor(donor);
    setDialogContent('Are you sure you want to delete this donor?');
    setShowSuccess(false);
    setOpenDeleteDialog(true);
  };

  const handleUpdateClickOpen = (donor) => {
    setSelectedDonor(donor);
    setFormData({
      name: donor.name,
      age: donor.age,
      bloodGroup: donor.bloodGroup,
      nationality: donor.nationality,
      medicalFit: donor.medicalFit,
      email: donor.email,
      phone: donor.phone,
      address: donor.address,
      area: donor.area,
      city: donor.city,
    });
    setOpenUpdateDialog(true);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
    setOpenUpdateDialog(false);
    setSelectedDonor(null);
    setDialogContent('Are you sure you want to delete this donor?');
    setShowSuccess(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/auth/donors/${selectedDonor._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDialogContent('Donor deleted successfully');
      setShowSuccess(true);
      // Fetch the updated list of donors
      const response = await axios.get('http://localhost:8000/api/auth/donors', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDonors(response.data.data);
    } catch (error) {
      console.error('Error deleting donor:', error);
      setDialogContent('Failed to delete donor');
      setShowSuccess(true);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/auth/donors/${selectedDonor._id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setOpenUpdateDialog(false);
      // Fetch the updated list of donors
      const response = await axios.get('http://localhost:8000/api/auth/donors', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDonors(response.data.data);
    } catch (error) {
      console.error('Error updating donor:', error);
      alert('Failed to update donor');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Blood Donors</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Blood Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Medically Fit</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>City</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donors.map((donor, index) => (
              <TableRow key={donor._id}>
                <TableCell>{index + 1}</TableCell> {/* Display index + 1 */}
                <TableCell>{donor.name}</TableCell>
                <TableCell>{donor.bloodGroup}</TableCell>
                <TableCell>{donor.age}</TableCell>
                <TableCell>{donor.phone}</TableCell>
                <TableCell>{donor.medicalFit}</TableCell>
                <TableCell>{donor.city}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="edit" onClick={() => handleUpdateClickOpen(donor)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete" onClick={() => handleDeleteClickOpen(donor)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog} onClose={handleClose}>
        <DialogTitle>Delete Donor</DialogTitle>
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
        <DialogTitle>Update Donor</DialogTitle>
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
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Blood Group</InputLabel>
            <Select
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              {bloodGroups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Nationality</InputLabel>
            <Select
              label="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            >
              {nationalities.map((nationality) => (
                <MenuItem key={nationality} value={nationality}>
                  {nationality}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Medically Fit</InputLabel>
            <Select
              label="Medically Fit"
              name="medicalFit"
              value={formData.medicalFit}
              onChange={handleChange}
            >
              {medicalFits.map((fit) => (
                <MenuItem key={fit} value={fit}>
                  {fit}
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

export default Donors;
