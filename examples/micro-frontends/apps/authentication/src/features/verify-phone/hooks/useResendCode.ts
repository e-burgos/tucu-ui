import { useState, useEffect, useCallback } from 'react';

interface UseResendCodeOptions {
  initialCountdown?: number;
  onResend?: () => void;
}

export const useResendCode = ({
  initialCountdown = 60,
  onResend,
}: UseResendCodeOptions = {}) => {
  const [countdown, setCountdown] = useState(initialCountdown);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = useCallback(() => {
    if (countdown > 0 || isResending) {
      return;
    }

    setIsResending(true);
    if (onResend) {
      onResend();
    }
    setCountdown(initialCountdown);
    setIsResending(false);
  }, [countdown, isResending, initialCountdown, onResend]);

  const canResend = countdown === 0 && !isResending;

  return {
    countdown,
    canResend,
    handleResend,
    isResending,
  };
};

