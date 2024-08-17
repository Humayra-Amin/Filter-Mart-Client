import { FaGoogle} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SocialLogin = () => {

    const { googleLogin} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const from = location?.state || "/";


    const handleSocialLogin = socialProvider => {
        socialProvider()
            .then((result) => {
                if (result.user) {
                    navigate(from);
                }
            });
    };

    return (
        <div className="font-roboto">
            <div className="divider font-sedan text-xl">OR</div>

            <div className="mt-6 text-2xl">

                <h1 onClick={() => handleSocialLogin(googleLogin)} className="border-2 flex flex-row lg:flex-row md:flex-row justify-center items-center gap-10 p-1 rounded-md bg-blue-300 text-black border-blue-600 cursor-pointer"><FaGoogle></FaGoogle>Continue with Google</h1>

            </div>

        </div>
    );
};

export default SocialLogin;