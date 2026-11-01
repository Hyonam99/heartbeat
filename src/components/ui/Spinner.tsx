import CircularProgress from "@mui/material/CircularProgress";

const Spinner = ({ full }: { full?: boolean }) =>
  full ? (
    <div className="flex min-h-dvh items-center justify-center">
      <CircularProgress size={24} color="inherit" />
    </div>
  ) : (
    <CircularProgress size={16} color="inherit" />
  );

export default Spinner;
