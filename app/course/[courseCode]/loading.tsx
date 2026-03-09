const loading = () => {
  return (
    <div className="sm:w-4/5 w-full pt-10 pb-20 sm:px-10 px-5 box-border">
      <div className="mb-3 w-50 h-8 bg-light-grey rounded-full "></div>
      <div className="w-170 h-10 bg-light-grey rounded-full mb-3"></div>
      <span className="flex sm:flex-row flex-col gap-2 mb-5">
        <div className="rounded-full px-2 py-1 bg-light-grey w-20 h-8"></div>
        <div className="rounded-full px-2 py-1 bg-light-grey w-70 h-8"></div>
      </span>
      <div className="w-100 h-8 mt-8 mb-4 bg-light-grey rounded-full"></div>
      <p className="w-280 h-40 bg-light-grey rounded-4xl"></p>
    </div>
  );
};

export default loading;
