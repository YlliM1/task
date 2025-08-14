export const Loading = ({ text = "Loading…" }) => (
  <p className="animate-pulse opacity-70">{text}</p>
);
export const ErrorMsg = ({ text = "Something went wrong." }) => (
  <p className="text-red-600">{text}</p>
);