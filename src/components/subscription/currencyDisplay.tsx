interface CurrencyDisplayProps {
    price?: number;
    currency?: string;
  }

  export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ price, currency }) => {
    return (
      <span className="text-secondary-400">
        {currency} {price}
      </span>
    );
  };
  
  