import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { addDoctorData, deleteDoctor, getDoctor, upadateDoctor } from '../../Redux/Action/doctor.action';
import { useContext } from 'react';
import { TaskContext} from '../TaskOfContext/TaskContextProvider';
import '../../App.css'

function Doctor(props) {
    const theme = useContext(TaskContext);
    console.log(theme); 


    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState();
    const [Dopen, setDOpen] = React.useState(false);
    const [Did, setDid] = useState();

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate();
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate();
        formik.resetForm();
        setDOpen(false);
    };

    const handleClickDOpen = (id) => {
        setDOpen(true);
        setDid(id);
    };

    let doctor = {
        name: yup.string().required('Enter Doctor Name'),
        age: yup.string().required('Please Enter Doctor Age'),
        email: yup.string().required('Please Enter Doctor Email'),
        degree: yup.string().required('Please Enter Doctor Degree'),
    }

    let schema = yup.object().shape(doctor);

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            email: '',
            degree: ''
        },
        validationSchema: schema,
        onSubmit: (value, { resetForm }) => {

            if (update) {
                handleUpdate(value)
            } else {
                handleSubmitdata(value)
            }
            resetForm();

        }
    })

    const handleUpdate = (value) => {
        // let localData = JSON.parse(localStorage.getItem("doctor"))
        // let udata = localData.map((l, i) => {
        //     if (l.id === value.id) {
        //         return (value)
        //     } else {
        //         return l;
        //     }
        // })
        // localStorage.setItem("doctor", JSON.stringify(udata));
        dispatch(upadateDoctor(value))
        setOpen(false)
        setUpdate()
        // loadData()
        formik.setValues()
    }

    const handleSubmitdata = (value) => {
        let localdata = JSON.parse(localStorage.getItem("doctor"))

        let data = {
            id: Math.floor(Math.random() * 1000),
            ...value
        }

        if (localdata === null) {
            localStorage.setItem("doctor", JSON.stringify([data]))
        } else {
            localdata.push(data)
            localStorage.setItem("doctor", JSON.stringify(localdata))
        }
        setOpen(false);
        dispatch(addDoctorData(data))
        // loadData();
    }
    const columns = [

        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'age', headerName: ' Age', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'degree', headerName: 'Degree', width: 130 },
        {
            field: 'Delete', headerName: 'Delete', width: 130,
            renderCell: (params) => (
                <IconButton aria-label="delete" onClick={() => handleClickDOpen(params.id)}>
                    <DeleteIcon />
                </IconButton>
            )
        },
        {
            field: 'Edit', headerName: 'Edit', width: 130,
            renderCell: (params) => (
                <IconButton aria-label="Edit" onClick={() => handleEdit(params.row)}>
                    <EditIcon />
                </IconButton>
            )
        }
    ];
    const handleEdit = (data) => {
        setOpen(true)
        setUpdate(data)
        formik.setValues(data);
    }

    const handleDelete = (id) => {
        // let localData = JSON.parse(localStorage.getItem("doctor"))

        // let filterData = localData.filter((v, i) => v.id !== Did);

        // localStorage.setItem("doctor", JSON.stringify(filterData));
        dispatch(deleteDoctor(Did))
        // loadData();
        setDOpen();

    }

    // const loadData = () => {
    //     let localData = JSON.parse(localStorage.getItem("doctor"))

    //     if (localData !== null) {
    //         setData(localData)
    //     }
    // }

    const dispatch = useDispatch();
    const doctorname = useSelector(state => state.doctordata)

    useEffect(
        () => {
            // loadData();
            dispatch(getDoctor())
        },
        [])

    return (
    <div className={`${theme.theme}`}>
                
            {
                
                doctorname.isLoading ? (
                    <p style={{ fontSize: '25px', fontWeight: 'bold', margin: '50px' }}>Please Loading...</p>
                ):
                (doctorname.error !== '' ?
                <p style={{ fontSize: '25px', fontWeight: 'bold', margin: '50px' }}>{doctorname.error}</p>
                : <Box>
                <Container>
                    <div className={`d-flex align-items-center fixed-top ${theme.theme}`}>
    
                    
                        <center>
                            <h1 className='mb-5'>Doctor Data</h1>
                            <button className='mb-5'  onClick={() => theme.toogle_theme(theme.theme)}>Change</button>
                            <Button className='mt-5' variant="outlined" onClick={handleClickOpen}>
                                Add Doctor Data
                            </Button>
                           
                        </center>
    
                        <div style={{ height: 400, width: '100%', margin: '30px' }}>
                            <DataGrid
                                rows={doctorname.doctors}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                            />
                        </div>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Add Doctor Data</DialogTitle>
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
                                            error={formik.errors.name && formik.touched.name}
                                            onBlur={formik.handleBlur}
    
                                        />
    
                                        <TextField
                                            margin="dense"
                                            id="age"
                                            label="age"
                                            type="age"
                                            fullWidth
                                            variant="standard"
                                            onChange={formik.handleChange}
                                            defaultValue={formik.values.age}
                                            helperText={formik.errors.age}
                                            error={formik.errors.age && formik.touched.age}
                                            onBlur={formik.handleBlur}
                                        />
                                        <TextField
                                            margin="dense"
                                            id="email"
                                            label="email"
                                            fullWidth
                                            variant="standard"
                                            onChange={formik.handleChange}
                                            defaultValue={formik.values.email}
                                            helperText={formik.errors.email}
                                            error={formik.errors.email && formik.touched.email}
                                            onBlur={formik.handleBlur}
    
                                        />
                                        <TextField
                                            margin="dense"
                                            id="degree"
                                            label="degree"
                                            fullWidth
                                            variant="standard"
                                            onChange={formik.handleChange}
                                            defaultValue={formik.values.degree}
                                            helperText={formik.errors.degree}
                                            error={formik.errors.degree && formik.touched.degree}
                                            onBlur={formik.handleBlur}
                                        />
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            {
                                                update ? <Button type="submit">Update</Button> :
                                                    <Button type="submit">Submit</Button>
                                            }
                                        </DialogActions>
                                    </DialogContent>
                                </Form>
                            </Formik>
                        </Dialog>
    
    
                        <Dialog
                            open={Dopen}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Are You Sure Delete Data?"}
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={handleClose}>NO</Button>
                                <Button onClick={handleDelete}>
                                    YES
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Container>
            </Box>)
            }
       </div>
    );
}

export default Doctor;