export const PrivacyPolicy = () => {
  return (
    <div className="mt-5 flex flex-col gap-y-5">
      <p className="text-xs">
        People who use our service may have uploaded your contact information to Facebook.{" "}
        <span className="text-blue-600 hover:underline cursor-pointer">Learn more.</span>
      </p>
      <p className="text-xs">
        By clicking Sign Up, you agree to our <span className="text-blue-600 hover:underline cursor-pointer">Terms</span>,{" "}
        <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span> and
        <span className="text-blue-600 hover:underline cursor-pointer">Cookies Policy</span>. You may receive SMS notifications from us and can opt
        out at any tim
      </p>
    </div>
  );
};
