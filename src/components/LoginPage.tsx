import { FlipWords } from "./ui/FlipWords";
import GradientText from "./ui/GradientText";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
const words = [
  "Explore the world with ease!",
  "Ask questions about countries",
  "Get travel recommendations ",
];

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center p-6 mx-auto h-screen lg:py-0">
        <div className="pb-5">
          <GradientText className="text-5xl pointer-events-none">
            <h1>GlobeData</h1>
          </GradientText>
          <FlipWords
            words={words}
            className="text-lg text-center font-semibold"
          />
        </div>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <GoogleLogin
              onSuccess={(credentialResponse) => {
                localStorage.setItem(
                  "authToken",
                  JSON.stringify(credentialResponse.credential)
                );
                navigate("/");
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
