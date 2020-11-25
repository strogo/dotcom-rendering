import '../webpackPublicPath';
import { startup } from '@root/src/lofi/browser/startup';
import { embedIframe } from './embedIframe';

startup('embedIframe', null, embedIframe);
