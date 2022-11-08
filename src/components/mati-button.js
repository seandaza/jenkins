import { createRef, useCallback, useEffect } from 'react';

export default function MatiButton({
  userId,
  onFinishedCallback,
  onLoadedCallback,
  onExitedCallback,
  className,
}) {
  const button = createRef(null);

  const handleLoaded = useCallback(() => {
    onLoadedCallback && onLoadedCallback();
  }, [onLoadedCallback]);

  const handleFinished = useCallback(
    ({ detail }) => {
      onFinishedCallback && onFinishedCallback(detail);
    },
    [onFinishedCallback]
  );

  const handleExited = useCallback(() => {
    onExitedCallback && onExitedCallback();
  }, [onExitedCallback]);

  useEffect(() => {
    const ref = button.current;
    if (ref) {
      ref.addEventListener('mati:loaded', handleLoaded);
      ref.addEventListener('mati:userFinishedSdk', handleFinished);
      ref.addEventListener('mati:exitedSdk', handleExited);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('mati:loaded', handleLoaded);
        ref.removeEventListener('mati:userFinishedSdk', handleFinished);
        ref.removeEventListener('mati:exitedSdk', handleExited);
      }
    };
  }, [button, handleLoaded, handleFinished, handleExited]);

  return (
    <mati-button
      class={className}
      ref={button}
      clientId={process.env.REACT_APP_MATI_CLIENT_ID}
      flowId={process.env.REACT_APP_MATI_FLOW_ID}
      metadata={`{"user_id":"BILL-${userId}"}`}
    />
  );
}
