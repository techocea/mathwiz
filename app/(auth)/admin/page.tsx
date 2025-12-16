import BlurGradient from "@/components/shared/BlurGradient";
import AdminLoginForm from "@/components/dashboard/AdminLoginForm";

const AdminLoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BlurGradient />
      <div className="w-full">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLoginPage;
