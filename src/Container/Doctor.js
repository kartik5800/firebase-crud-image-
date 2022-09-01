import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { Form, Formik, useFormik } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  doctordata,
  postdoctor,
  deletedoctor,
  updatedoctor,
} from "../redux/action/doctors.action";


export default function Doctor() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [Update, setUpdate] = useState();
  const dispatch = useDispatch();
  const [uid, setUid] = useState()

  const doctor = useSelector((state) => state.doctor);




  
  // for deletion
  const handleDelete = (id) => {
    dispatch(deletedoctor(id));
    loadData();
  };




  // for dialog box open
  const handleClickOpen = () => {
    setOpen(true);
  };




  //for dialog box close
  const handleClose = () => {
    setOpen(false);
  };








  //for form validation
  let Doctor = {
    name: yup.string().required("enter name"),
    designation: yup.string().required("please enter designation"),
    salary: yup.string().required("please enter salary"),
    file: yup.mixed().required("please select file"),
  };

  let schema = yup.object().shape(Doctor);




  //for  initial value
  const formik = useFormik({
    initialValues: {
      name: "",
      designation: "",
      salary: "",
      file: "",
    },




    validationSchema: schema,
    onSubmit: (value, { resetForm }) => {
      if (Update) {
        handleUpdateData(value);
      } else {
        handleSubmitdata(value);
      }
      resetForm();
    },
  });

  //for data update and dialog box close and new data set
  const handleUpdateData = (value) => {
    dispatch(updatedoctor(value));
    setOpen(false);
    setUpdate();
    loadData();
  };



  // data submit krva mate
  const handleSubmitdata = (value) => {
    // for rendom id
    // let data = {
    //   id: Math.floor(Math.random() * 1000),
    //   ...value,
    // };
    dispatch(postdoctor(value));
    setOpen(false);
    loadData();
  };

  const columns1 = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "designation", headerName: " designation", width: 130 },
    { field: "salary", headerName: "salary", width: 130 },
    {
      field: 'url', headerName: 'Image', width: 130,
      renderCell: (params) => (
        <>
          <img src={params.row.url} width={50} height={50}/>
        </>
      )
    },
    {
      field: "action",
      headerName: "acton",
      width: 260,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            onClick={() => handleDelete(params.row)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={() => handleEdit(params)}
            endIcon={<EditIcon />}
          >
            Update
          </Button>
        </>
      ),
    },
  ];

  const loadData = () => {
    setData(doctor.doctor);
  };

  useEffect(() => {
    dispatch(doctordata());
    loadData();
  },[]);

  const handleEdit = (params) => {
    setOpen(true);
    setUpdate(true);
    formik.setValues({
      id: params.id,
      name: params.row.name,
      designation: params.row.designation,
      salary: params.row.salary,
      file: params.row.url,
      fileName :params.row.fileName
    });
    setUid(params.row.id)
    console.log("deweewewewe",data,params);
  };

  return (
    <Box>
      <Container>
        {doctor.isLoading ? (
          <p>Loading..... </p>
        ) : doctor.error !== "" ? (
          <p>{doctor.error}</p>
        ) : (
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              Add Doctor
            </Button>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={doctor.doctor}
                columns={columns1}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Doctor</DialogTitle>
              <Formik value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                  <DialogContent>
                    <TextField
                      margin="dense"
                      id="name"
                      label="name"
                      type="name"
                      fullWidth
                      variant="standard"
                      onChange={formik.handleChange}
                      defaultValue={formik.values.name}
                      helperText={formik.errors.name}
                      error={formik.errors.name ? true : false}
                    />
                    <TextField
                      margin="dense"
                      id="designation"
                      label="designation"
                      type="designation"
                      fullWidth
                      variant="standard"
                      onChange={formik.handleChange}
                      defaultValue={formik.values.designation}
                      helperText={formik.errors.designation}
                      error={formik.errors.designation ? true : false}
                    />
                    <TextField
                      margin="dense"
                      id="salary"
                      label="salary"
                      fullWidth
                      variant="standard"
                      onChange={formik.handleChange}
                      defaultValue={formik.values.salary}
                      helperText={formik.errors.salary}
                      error={formik.errors.salary ? true : false}
                    />
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={(e) =>
                        formik.setFieldValue("file", e.target.files[0])
                      }
                    />
                    <p style={{ color: "red" }}>
                      {formik.errors.file && formik.errors.file}
                    </p>

                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      {Update ? (
                        <Button type="submit">Update</Button>
                      ) : (
                        <Button type="submit">Submit</Button>
                      )}
                    </DialogActions>
                  </DialogContent>
                </Form>
              </Formik>
            </Dialog>
          </div>
        )}
      </Container>
    </Box>
  );

}



