
import axios from 'axios';

export const setAuthToken =(token) =>{

  if(token){
    //set to every requests 
    axios.defaults.headers.common["Authorization"] = token;

  }else{
    //delete auth headers
    delete axios.defaults.headers.common["Authorization"];
  }
};

