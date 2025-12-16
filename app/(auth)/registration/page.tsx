import BlurGradient from "@/components/shared/BlurGradient";
import RegisterForm from "@/components/shared/RegisterForm";

const RegistrationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BlurGradient />
      <div className="w-full">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
