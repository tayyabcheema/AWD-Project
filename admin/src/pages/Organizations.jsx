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

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    area: '',
    city: '',
  });
  const [dialogContent, setDialogContent] = useState('Are you sure you want to delete this organization?');
  const [showSuccess, setShowSuccess] = useState(false);
  const accessToken = localStorage.getItem('accessToken');

  const areas = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "GB"];

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/organizations', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setOrganizations(response.data.data); // Adjusted to access the 'data' object
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, [accessToken]);

  const handleDeleteClickOpen = (organization) => {
    setSelectedOrganization(organization);
    setDialogContent('Are you sure you want to delete this organization?');
    setShowSuccess(false);
    setOpenDeleteDialog(true);
  };

  const handleUpdateClickOpen = (organization) => {
    setSelectedOrganization(organization);
    setFormData({
      name: organization.name,
      email: organization.email,
      phone: organization.phone,
      address: organization.address,
      area: organization.area,
      city: organization.city,
    });
    setOpenUpdateDialog(true);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
    setOpenUpdateDialog(false);
    setSelectedOrganization(null);
    setDialogContent('Are you sure you want to delete this organization?');
    setShowSuccess(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/auth/organizations/${selectedOrganization._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDialogContent('Organization deleted successfully');
      setShowSuccess(true);
      // Fetch the updated list of organizations
      const response = await axios.get('http://localhost:8000/api/auth/organizations', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setOrganizations(response.data.data);
    } catch (error) {
      console.error('Error deleting organization:', error);
      setDialogContent('Failed to delete organization');
      setShowSuccess(true);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/auth/organizations/${selectedOrganization._id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setOpenUpdateDialog(false);
      // Fetch the updated list of organizations
      const response = await axios.get('http://localhost:8000/api/auth/organizations', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setOrganizations(response.data.data);
    } catch (error) {
      console.error('Error updating organization:', error);
      alert('Failed to update organization');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Organizations</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Area</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>City</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations.map((organization, index) => (
              <TableRow key={organization._id}>
                <TableCell>{index + 1}</TableCell> {/* Display index + 1 */}
                <TableCell>{organization.name}</TableCell>
                <TableCell>{organization.email}</TableCell>
                <TableCell>{organization.phone}</TableCell>
                <TableCell>{organization.address}</TableCell>
                <TableCell>{organization.area}</TableCell>
                <TableCell>{organization.city}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="edit" onClick={() => handleUpdateClickOpen(organization)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete" onClick={() => handleDeleteClickOpen(organization)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog} onClose={handleClose}>
        <DialogTitle>Delete Organization</DialogTitle>
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
        <DialogTitle>Update Organization</DialogTitle>
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

export default Organizations;
