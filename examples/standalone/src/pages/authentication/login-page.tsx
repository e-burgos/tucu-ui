import BrandingImage from '@/components/authentication/branding/branding-image';
import LoginForm from '@/components/authentication/login/forms/login-form';

const LoginPage = () => {
  return (
    <div className="flex lg:flex-row flex-col lg:items-center lg:justify-center w-full h-full mx-auto my-auto">
      <div className="w-full max-w-5xl">
        <div className="bg-light dark:bg-black rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Login Form */}
            <div className="flex items-center justify-center w-full p-3 lg:p-4">
              <LoginForm />
            </div>
            {/* Right Column - Promotional Section */}
            <div className="flex items-center justify-center w-full p-1 lg:p-4">
              <BrandingImage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
