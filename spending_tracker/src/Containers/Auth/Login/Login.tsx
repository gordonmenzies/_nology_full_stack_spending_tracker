import "./Login.scss";
import Register from "../../../Components/Register/Register";
import SignIn from "../../../Components/SignIn/SignIn";

const Login = () => {
  return (
    <div>
      <Register></Register>
      <SignIn></SignIn>
    </div>
  );
};

export default Login;

//type User = {
//   id: string;
//   name: string;
//   password: string;
//   email: string;
// };

// type LogInProps = {
//   userId: string;
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyBZzJFtpB1asMpp6ZFow-1D52ucP-jsEH4",
//   authDomain: "spending-tracker-584a8.firebaseapp.com",
//   projectId: "spending-tracker-584a8",
//   storageBucket: "spending-tracker-584a8.appspot.com",
//   messagingSenderId: "351908282910",
//   appId: "1:351908282910:web:cb9b93634596da6d7de40f",
//   measurementId: "G-5S0XFW511L",
// };

// const app = initializeApp(firebaseConfig);
// // const firestore = getFirestore(app);
// // const auth = getAuth(app);
