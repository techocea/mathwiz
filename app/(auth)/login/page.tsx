
import BlurGradient from "@/components/BlurGradient";
import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BlurGradient />
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
