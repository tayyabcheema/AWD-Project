import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BusinessIcon from '@mui/icons-material/Business';
import axios from 'axios';

const Dashboard = () => {
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalHospitals, setTotalHospitals] = useState(0);
  const [totalOrganizations, setTotalOrganizations] = useState(0);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donorsResponse = await axios.get('http://localhost:8000/api/auth/donors', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const hospitalsResponse = await axios.get('http://localhost:8000/api/auth/hospitals', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const organizationsResponse = await axios.get('http://localhost:8000/api/auth/organizations', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setTotalDonors(donorsResponse.data.data.length);
        setTotalHospitals(hospitalsResponse.data.data.length);
        setTotalOrganizations(organizationsResponse.data.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="flex items-center">
            <PeopleIcon fontSize="large" className="mr-4" />
            <div>
              <Typography variant="h5" component="div">
                Total Donors
              </Typography>
              <Typography variant="body2">
                {totalDonors}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center">
            <LocalHospitalIcon fontSize="large" className="mr-4" />
            <div>
              <Typography variant="h5" component="div">
                Total Hospitals
              </Typography>
              <Typography variant="body2">
                {totalHospitals}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center">
            <BusinessIcon fontSize="large" className="mr-4" />
            <div>
              <Typography variant="h5" component="div">
                Total Organizations
              </Typography>
              <Typography variant="body2">
                {totalOrganizations}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" className="mb-4">Blood Bank Statistics</Typography>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 mr-2" style={{ backgroundColor: '#1976d2' }}></div>
              <Typography variant="body2">Blood Donations</Typography>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 mr-2" style={{ backgroundColor: '#dc004e' }}></div>
              <Typography variant="body2">Blood Usage</Typography>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 mr-2" style={{ backgroundColor: '#ffa726' }}></div>
              <Typography variant="body2">Blood in Stock</Typography>
            </div>
          </div>
          <div className="h-72">
            <BarChart
              series={[
                { label: 'Blood Donations', data: [1200, 1500, 1000, 1100] },
                { label: 'Blood Usage', data: [900, 1200, 800, 1000] },
                { label: 'Blood in Stock', data: [300, 300, 200, 100] },
              ]}
              height={290}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
              margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
              grid={{ verticalLines: false, horizontalLines: true }}
              barSize={30}
              barSpacing={20}
              colors={['#1976d2', '#dc004e', '#ffa726']}
              legend={null} // Remove the legend inside the chart
              tooltip={{ show: false }} // Remove tooltips
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
