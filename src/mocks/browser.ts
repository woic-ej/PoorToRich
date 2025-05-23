import { setupWorker } from 'msw/browser';
import { authHandlers } from '@/mocks/handler/authHandlers';
import { emailHandlers } from '@/mocks/handler/emailHandlers';
import { loginHandlers } from '@/mocks/handler/loginHandlers';
import { tokenHandlers } from '@/mocks/handler/tokenHandlers';
import { totalHandlers } from '@/mocks/handler/totalHandlers';
import { transactionHandlers } from '@/mocks/handler/transactionHandlers';
import { tokenVerifyHandlers } from '@/mocks/handler/tokenVerifyHandler';

export const worker = setupWorker(
  ...loginHandlers,
  ...tokenHandlers,
  ...authHandlers,
  ...tokenVerifyHandlers,
  ...emailHandlers,
  ...totalHandlers,
  ...transactionHandlers,
);
