type ApiErrorShape = {
  response?: {
    status?: number;
    data?: {
      detail?: unknown;
      message?: unknown;
    };
  };
  message?: string;
};

export type SendAdminInfluencerMessageInput = {
  threadId: string;
  message?: string | null;
  file?: File | null;
  negotiationId?: string | null;
};

export type SendAdminInfluencerMessageMutationInput = {
  message?: string | null;
  file?: File | null;
  negotiationId?: string | null;
};

const MAX_MEDIA_FILE_SIZE_BYTES = 25 * 1024 * 1024;

const ALLOWED_MIME_PREFIXES = ['image/', 'video/', 'audio/'];
const ALLOWED_EXACT_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
]);

export function normalizeAdminInfluencerMessageInput(
  input: SendAdminInfluencerMessageMutationInput,
  fallbackNegotiationId?: string | null,
): Omit<SendAdminInfluencerMessageInput, 'threadId'> {
  return {
    message: input.message,
    file: input.file ?? null,
    negotiationId: input.negotiationId ?? fallbackNegotiationId ?? null,
  };
}

function isAllowedFileType(file: File): boolean {
  const mime = (file.type || '').toLowerCase();
  if (!mime) return true;
  return (
    ALLOWED_MIME_PREFIXES.some((prefix) => mime.startsWith(prefix)) ||
    ALLOWED_EXACT_MIME_TYPES.has(mime)
  );
}

export function appendValidatedMediaFile(formData: FormData, file: File): void {
  if (!isAllowedFileType(file)) {
    throw new Error(
      'Unsupported media type. Allowed: image, video, audio, and common documents.',
    );
  }
  if (file.size <= 0) {
    throw new Error('Empty media file uploaded.');
  }
  if (file.size > MAX_MEDIA_FILE_SIZE_BYTES) {
    throw new Error('File is too large. Max allowed size is 25MB.');
  }
  formData.append('media_file', file);
}

export function buildAdminInfluencerMessageFormData(
  input: SendAdminInfluencerMessageInput,
): FormData {
  const message = (input.message ?? '').trim();
  const hasMessage = message.length > 0;
  const hasFile = Boolean(input.file);

  if (hasMessage === hasFile) {
    throw new Error('Send either message or one media file in a single request.');
  }

  const formData = new FormData();
  if (hasMessage) {
    formData.append('message', message);
  }
  if (input.file) {
    appendValidatedMediaFile(formData, input.file);
  }

  const negotiationId = (input.negotiationId ?? '').trim();
  if (negotiationId) {
    formData.append('negotiation_id', negotiationId);
  }

  return formData;
}

export function mapAdminInfluencerMessageError(error: unknown): string {
  const apiError = error as ApiErrorShape;
  const status = apiError?.response?.status;
  const detail = apiError?.response?.data?.detail;
  const backendMessage =
    typeof detail === 'string'
      ? detail
      : typeof apiError?.response?.data?.message === 'string'
        ? apiError.response.data.message
        : null;

  if (backendMessage) {
    return backendMessage;
  }

  if (status === 400) {
    return 'Invalid message payload. Send either text or one file.';
  }

  if (typeof apiError?.message === 'string' && apiError.message.trim()) {
    return apiError.message;
  }

  return 'Unable to send message right now. Please try again.';
}
