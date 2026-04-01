import { useCallback, useEffect, useState } from 'react';

export default function useFeedbackIdMap(storageKey: string) {
  const [feedbackIdMap, setFeedbackIdMap] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {};
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return {};
    try {
      return JSON.parse(raw) as Record<string, string>;
    } catch {
      return {};
    }
  });

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(feedbackIdMap));
  }, [storageKey, feedbackIdMap]);

  const getFeedbackKey = useCallback(
    (negotiationId: string, contentUrl: string | null) =>
      negotiationId && contentUrl ? `${negotiationId}::${contentUrl}` : '',
    [],
  );

  const getFeedbackId = useCallback(
    (negotiationId: string, contentUrl: string | null) => {
      const key = getFeedbackKey(negotiationId, contentUrl);
      return key ? feedbackIdMap[key] ?? '' : '';
    },
    [feedbackIdMap, getFeedbackKey],
  );

  const setFeedbackId = useCallback(
    (negotiationId: string, contentUrl: string | null, feedbackId: string) => {
      const key = getFeedbackKey(negotiationId, contentUrl);
      if (!key || !feedbackId) return;
      setFeedbackIdMap((prev) => ({ ...prev, [key]: feedbackId }));
    },
    [getFeedbackKey],
  );

  return { feedbackIdMap, getFeedbackKey, getFeedbackId, setFeedbackId };
}
