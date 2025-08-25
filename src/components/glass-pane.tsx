import clsx from "clsx";

const GlassPane = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-solid border-gray-200/50 dark:border-gray-700/50 ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
