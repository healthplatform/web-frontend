import {Auth} from './auth/auth.service';

/** @ngInject */
export function runBlock(Auth: Auth) {
  Auth.redirUnlessAuth();
}
