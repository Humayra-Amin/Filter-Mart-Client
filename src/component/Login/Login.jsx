import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import useAuth from "../hooks/useAuth";


const Login = () => {

    const { signInUser } = useAuth();

    const [showLoginPass, setShowLoginPass] = useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/root';


    const onSubmit = (data) => {
        const { email, password } = data;


        signInUser(email, password)
            .then((result) => {
                if (result.user) {
                    toast.success('Login successfully!!!')
                    setTimeout(() => {
                        navigate(from);
                    }, 1000);
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Invalid Email or Password!!!");
            })
    }

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content">
                    <div className="card shrink-0 mb-14 md:w-[500px] lg:w-[500px] border-2 border-blue-400 rounded-none bg-blue-100">

                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            <h1 className="flex justify-center text-xl lg:text-5xl text-blue-700">Login</h1>

                            <div className="form-control">

                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>

                                <div className="relative">
                                    <input type="email" placeholder="email" {...register("email", { required: true })} className="input input-bordered pl-10 w-full" />
                                    <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 h-6 text-blue-200"></FaEnvelope>
                                </div>

                                {errors.Email && <span className="text-red-500">This field is required</span>}

                            </div>

                            <div className="form-control">

                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>

                                <div className="relative">
                                    <input type={showLoginPass ? "text" : "password"}
                                        placeholder="password"
                                        {...register("password", { required: true })}
                                        className="input input-bordered pl-10 w-full" />
                                    <span onClick={() => setShowLoginPass(!showLoginPass)} className="absolute top-7 right-3 transform -translate-y-1/2 h-6 text-xl text-blue-200">
                                        {
                                            showLoginPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                        }
                                    </span>
                                    <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 h-6 text-blue-200"></FaLock>
                                </div>

                                {errors.Password && <span className="text-red-500">This field is required</span>}

                            </div>


                            <div className="form-control mt-6">
                                <button className="btn bg-blue-400 border-blue-800 text-black text-xl hover:bg-white hover:text-black hover:border-blue-700">Login</button>
                            </div>

                            <SocialLogin></SocialLogin>

                            <label className="label text-[16px] font-medium text-gray-400">
                                Don’t have an account? <Link to="/register" className="label-text-alt link link-hover text-[18px] font-medium text-blue-600 underline">Sign Up</Link>
                            </label>

                        </form>

                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;