import { FormikLogin } from "@/interfaces/formikLoginValues";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const handleLogin = createAsyncThunk('userSlice/handleLogin', async (formikValues: FormikLogin) => {
    try {
      // Step 1: Send login request to external API to get the token
      const Response = await axios.post('https://linked-posts.routemisr.com/users/signin', formikValues);
      const token = Response.data.token;
  
      console.log('Login successful:', Response.data);
  
      // Step 2: Send the token to the Next.js API to set it in cookies (server-side)
      await axios.post('/api/set-cookie', { token });
  
      // Optionally: return the user data
      return Response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // You can handle this in your component by using `rejected` state
    }
  });

const userSlice = createSlice({
    name:'userSlice' ,
    reducers:{
        getPhoto:(state,action)=>{
            state.photoHref = action.payload;
            console.log(action.payload)
        },


    },
    initialState:{
            name:'',
            age:'',
            isLoggedIn:false,
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjcwYTE1Nzg4MDNmNzZiZjAwN2E5Njc4IiwiaWF0IjoxNzI4NzE0MTQ2fQ.zwFjFIzOlvXLbzNeswtOjh07gbmjBCA5_rrWcNVJEaE",
            id:'',
            photoHref:'',
            email:'',
            gender:'',
            allPosts:[],
            isLoading:false,
            Error:'',
    },
    
    extraReducers:(builder)=>{
        builder.addCase(handleLogin.fulfilled , (state , action )=>{
            console.log(action);
                state.token = action.payload.token;
               
                localStorage.setItem('AuthinticationToken',state.token)
                if(localStorage.getItem('AuthinticationToken')){
                    state.isLoggedIn = true;
                    state.isLoading = false;
                    console.log(state)
                }
                
        })
        builder.addCase(handleLogin.pending,(state,action)=>{
            state.isLoading = true
        })

        builder.addCase(handleLogin.rejected,(state,action)=>{
            state.Error = action.payload.message
        })

        

    }
})
export const userSliceReducer = userSlice.reducer;
export const userSliceActions = userSlice.actions;