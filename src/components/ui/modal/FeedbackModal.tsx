'use client';

import type React from 'react';
import Image from 'next/image';
import { useGlobal } from '@/contexts/global.context';
import { ErrorImage, SuccessImage } from '@/libs/constants/assets.const';
import Button from '../button/ButtonPrimary';
import XMarkIcon from '../../icons/XMark';
import Square2StackIcon from '../../icons/Square2Stack';

const icons = {
  success: {
    icon: SuccessImage,
  },
  error: {
    icon: ErrorImage,
  },
};

const FeedbackModal: React.FC = () => {
  const { feedbackModal, closeFeedbackModal, copyClipboard } = useGlobal();

  if (!feedbackModal.open) return null;

  const config = icons[feedbackModal.type] || icons.success;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-ui-900/50 backdrop-blur-sm" />

      {/* MODAL */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm px-6 py-8 rounded-2xl bg-ui-800">
        <div className="flex flex-col items-center space-y-8">
          <Image src={config.icon} alt="Icon" />
          <div className="space-y-2">
            <h2 className={`text-md text-center font-semibold`}>{feedbackModal.message}</h2>
            {feedbackModal.traceId && (
              <div className="flex item-center justify-center gap-2">
                <span
                  className="flex items-center gap-2 text-xs font-semibold cursor-pointer"
                  onClick={() => copyClipboard(feedbackModal.traceId as string)}
                >
                  <Square2StackIcon className="h-6 w-6" />
                  Report ID
                </span>
              </div>
            )}
          </div>
          <Button onClick={closeFeedbackModal}>Close</Button>
        </div>
        <button onClick={closeFeedbackModal} className="absolute top-3 right-3">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
