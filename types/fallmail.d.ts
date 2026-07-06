/**
 * fallmail — E2E encrypted mail addressed by DID. Offline queueable.
 * Source: https://sjgant80-hub.github.io/fallmail/fallmail.js
 */

export interface MailMessage {
  id: string;
  from: string;    // DID
  to: string[];    // DIDs
  subject?: string;
  body: string;
  attachments?: Array<{ name: string; cid: string; mime?: string }>;
  ts: number;
  sig?: string;
  encrypted?: boolean;
}

export interface MailOptions {
  did?: string;
  carrier?: any;
  pod?: any;
}

export class FallMail {
  constructor(opts?: MailOptions);
  send(to: string | string[], subject: string, body: string, opts?: { attachments?: any[] }): Promise<MailMessage>;
  inbox(): Promise<MailMessage[]>;
  outbox(): Promise<MailMessage[]>;
  read(id: string): Promise<MailMessage | null>;
  markRead(id: string): Promise<void>;
  delete(id: string): Promise<boolean>;
  on(event: 'incoming' | 'sent' | 'fail', handler: (msg: MailMessage) => void): this;
}

export function openMail(opts?: MailOptions): Promise<FallMail>;
