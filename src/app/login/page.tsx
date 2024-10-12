'use client'
import { useFormik } from "formik";
import { handleLogin } from "@/lib/UserSlice";
import { Typography, TextField, Button, Container, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const dispatch = useDispatch()
    const router = useRouter()



    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit:(values)=>{
            dispatch(handleLogin(values))
            if(dispatch(handleLogin(values))) {
                router.push('/')
            }
            
        }
    });
  

    return (
        <>
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

            <form onSubmit={formik.handleSubmit}>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' , textAlign:'center' }}>
                Login
            </Typography>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin="normal"
                />

                <Button color="primary" variant="contained" fullWidth type="submit">
                    Login
                </Button>
                <Link style={{color:'black',marginTop:'5px'}} href={'/Register'} >Don't have an account? REGISTER NOW!</Link>

            </form>
            </Box>
            </Container>
        </>
    );
}
