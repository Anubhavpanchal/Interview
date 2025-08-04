import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';

const AllUsers = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/api/quizzes/${quizId}`).then(res => setQuiz(res.data));
    axios.get(`/api/quizzes/responses/${quizId}`).then(res => setData(res.data));
  }, [quizId]);

  return (
    <Box className="px-4 sm:px-8 py-6">
      <Typography
        variant="h4"
        className="mb-6 text-center font-bold text-blue-900"
      >
        🧾 User Responses
      </Typography>
      {data.length === 0 ? (
        <Typography className="text-center text-gray-600">
          No users have attempted this quiz yet.
        </Typography>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <DataTable
            value={data}
            paginator
            rows={5}
            sortMode="multiple"
            className="p-datatable-sm"
            dataKey="_id"
            responsiveLayout="scroll"
          >
            <Column
              field="username"
              header="Username"
              sortable
              headerStyle={{ minWidth: '140px' }}
            />
            <Column
              field="email"
              header="Email"
              sortable
              headerStyle={{ minWidth: '180px' }}
            />
            <Column
              field="attempted"
              header="Attempted"
              sortable
              bodyStyle={{ textAlign: 'center' }}
              headerStyle={{ textAlign: 'center', minWidth: '100px' }}
            />
            <Column
              field="score"
              header="Score"
              sortable
              bodyStyle={{ textAlign: 'center' }}
              headerStyle={{ textAlign: 'center', minWidth: '100px' }}
            />
            <Column
              header="Actions"
              body={(rowData) => (
                <Button
                  label="See Response"
                  className="p-button-outlined p-button-sm"
                  onClick={() =>
                    navigate(`/result/${quizId}?user=${rowData.email}`)
                  }
                />
              )}
              style={{ textAlign: 'center', minWidth: '150px' }}
            />
          </DataTable>
        </div>
      )}
    </Box>
  );
};

export default AllUsers;