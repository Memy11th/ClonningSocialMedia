export interface User 
{
    name:string,
    age:number,
    isLoggedIn:boolean,
    token:string,
    id:string,
    photoRef:string;
    email:string;
    gender:string;
    allPosts:[];
    isLoading:boolean;
    Error:string;
}