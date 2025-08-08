const ProgressBar = ({
  completedCredits,
  totalCredits,
}: {
  completedCredits: number;
  totalCredits: number;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full sm:h-3 h-2 bg-grey overflow-hidden flex-9">
        <div
          className="bg-[#64C57D] h-full transition-all"
          style={{ width: `${(completedCredits / totalCredits) * 100}%` }}
        />
      </div>
      <p className="sm:text-xs text-[0.5rem] flex-1">
        {completedCredits}/{totalCredits} Credits
      </p>
    </div>
  );
};

export default ProgressBar;
