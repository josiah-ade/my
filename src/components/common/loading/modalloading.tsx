interface IProps {
    size?: string
  }
  
  export function LoadingIndicator({ size = 'size-9' }: IProps) {
  
    return (
      <>
        <div className={`loader ${size}`}></div>
        <style jsx>{`
          .loader {
            border: 4px solid #e7f6ec;
            border-radius: 50%;
            border-left-color: #09f;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </>
    )
  }