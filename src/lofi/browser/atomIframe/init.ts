import '../webpackPublicPath';
import { startup } from '@root/src/lofi/browser/startup';
import { atomIframe } from './atomIframe';

startup('atomIframe', null, atomIframe);
