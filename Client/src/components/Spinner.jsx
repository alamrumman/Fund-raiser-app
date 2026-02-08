function Spinner() {
  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
      <p className="text-sm text-gray-600 text-center">
        Redirecting to secure payment window…
        <br />
        Please do not refresh.
      </p>
    </div>
  );
}
export default Spinner;
