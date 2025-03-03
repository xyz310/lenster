import { useDisconnectXmtp } from '@components/utils/hooks/useXmtpClient';
import { LogoutIcon } from '@heroicons/react/outline';
import { PROFILE } from '@lenster/data/tracking';
import { PostHog } from '@lib/posthog';
import resetAuthData from '@lib/resetAuthData';
import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import type { FC } from 'react';
import { useAppPersistStore, useAppStore } from 'src/store/app';
import { useDisconnect } from 'wagmi';

interface LogoutProps {
  onClick?: () => void;
  className?: string;
}

const Logout: FC<LogoutProps> = ({ onClick, className = '' }) => {
  const { disconnect } = useDisconnect();
  const disconnectXmtp = useDisconnectXmtp();

  const setCurrentProfile = useAppStore((state) => state.setCurrentProfile);
  const setProfileId = useAppPersistStore((state) => state.setProfileId);

  const logout = () => {
    PostHog.track(PROFILE.LOGOUT);
    disconnectXmtp();
    setCurrentProfile(null);
    setProfileId(null);
    resetAuthData();
    disconnect?.();
  };

  return (
    <button
      type="button"
      onClick={() => {
        logout();
        onClick?.();
      }}
      className={clsx(
        'flex w-full px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200',
        className
      )}
    >
      <div className="flex items-center space-x-1.5">
        <LogoutIcon className="h-4 w-4" />
        <div>
          <Trans>Logout</Trans>
        </div>
      </div>
    </button>
  );
};

export default Logout;
