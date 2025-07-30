const ProgressBar = ({
  completedCredits,
  totalCredits,
}: {
  completedCredits: number;
  totalCredits: number;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full h-3 bg-grey overflow-hidden flex-9">
        <div
          className="bg-[#64C57D] h-full transition-all"
          style={{ width: `${(completedCredits / totalCredits) * 100}%` }}
        />
      </div>
      <p className="text-xs flex-1">
        {completedCredits}/{totalCredits} Credits
      </p>
    </div>
  );
};

export default ProgressBar;
