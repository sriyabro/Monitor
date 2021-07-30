// import Axios from "axios";
// import {BACKEND_URL} from "./constants";
// import jwtDecode from "jwt-decode";
//
// const jwt = localStorage.getItem("token");
// let userID = jwtDecode(jwt)._id;
// console.log(userID);
//
// const addDataAuto = async (sensor_id) => {
//     await Axios.post(BACKEND_URL + "/sensors/data/",
//         {
//             "_id": sensor_id.toString(),
//             "values": "67",
//             "date_time": "2021-04-21 11:24:30"
//         }
//     ).then((res) => console.log(res))
//         .catch((err) => console.log("Error adding data: ",err));
//
// }
//
