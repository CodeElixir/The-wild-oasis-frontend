function Badge({ children, className, ...rest }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}

export default Badge;
