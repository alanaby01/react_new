import React from "react";
import axios from 'axios';

const PostComponent = (props) => {

    axios.post("http://localhost:4000/students/create-student", props)
        .then(res => {
            if (res.status === 200) console.log("Successful POST")
        })
        .catch(err => console.log(err))
    return(
        <div>
            <text>Completed</text>  
        </div>
    );
}
export default PostComponent;