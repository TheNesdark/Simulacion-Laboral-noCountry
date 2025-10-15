const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4 text-blue-500 m-auto gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <span className="ml-2">Cargando...</span>
    </div>
  );
};

export default LoadingSpinner;
