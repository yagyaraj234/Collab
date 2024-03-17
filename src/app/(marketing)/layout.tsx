import Header from "./_components/Header/Header";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Header */}
      <Header />
      {children}

      {/* Footer */}
    </div>
  );
};

export default MarketingLayout;
