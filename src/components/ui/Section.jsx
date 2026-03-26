export const Section = ({ children, className = "" }) => {
  return (
    <section className={`mb-8 md:mb-10 ${className}`}>
      {children}
    </section>
  );
};

