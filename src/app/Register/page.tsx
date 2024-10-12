'use client';
import { TextField, Button, Grid, Typography, Container, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { FormikSignUpValues } from '../../interfaces/formikSignupValues';
import Link from 'next/link';

// Validation schema using Yup
const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Password must has both lowercase and uppercase letters , special character and a number'),
  rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match'),
  gender: Yup.string().required('You must choose a gender'),
  dateOfBirth: Yup.date().required('Please choose your date of birth').nullable(),
});

const SignUp = () => {
  const signUp = async (values: FormikSignUpValues) => {
    try {
      const response = await axios.post('https://linked-posts.routemisr.com/users/signup', values);
      console.log(response); // Log the response data
    } catch (error) {
      if (error.response) {
        console.error('API Error:', error.response.data); // Log the error response
      } else {
        console.error('Unexpected Error:', error.message); // Log unexpected errors
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
          Sign Up
        </Typography>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            rePassword: '',
            gender: '',
            dateOfBirth: {}, // Initialize as null
          }}
          validationSchema={SignUpSchema}
          onSubmit={signUp}
        >
          {({ errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                {/* Name Field */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                {/* Email Field */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                {/* Password Field */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>

                {/* Confirm Password Field */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="rePassword"
                    label="Confirm Password"
                    name="rePassword"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.rePassword && Boolean(errors.rePassword)}
                    helperText={touched.rePassword && errors.rePassword}
                  />
                </Grid>

                {/* Gender Field */}
                <Grid item xs={12}>
                  <FormControl fullWidth >
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      name="gender"
                      label="Gender"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.gender && Boolean(errors.gender)}
                      defaultValue={''}
                    >
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                    </Select>
                    {touched.gender && errors.gender && <Typography color="error">{errors.gender}</Typography>}
                  </FormControl>
                </Grid>

                {/* Date of Birth Field */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of Birth"
                        value={null}
                        onChange={(newDate) => setFieldValue('dateOfBirth', newDate)}
                        renderInput={(params:any) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                            helperText={touched.dateOfBirth && errors.dateOfBirth}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
              <Link style={{color:'black'}} href={'/login'} >Already have an account? Signin</Link>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignUp;
