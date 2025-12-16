
import BlurGradient from "@/components/shared/BlurGradient";
import LoginForm from "@/components/shared/LoginForm";

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
