// LoadingButton.jsx
export default function LoadingButton({ isLoading, children, ...props }) {
  return (
    <button
      {...props}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center w-full transition duration-200 disabled:opacity-50"
    >
      {isLoading && (
        <span className="loader mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></span>
      )}
      {children}
    </button>
  );
}
