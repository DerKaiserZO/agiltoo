import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { UserAuthStore } from '../stores/auth.store';
import { dataConfigStore } from '../stores/data-config.store';

export const connectedUserGuard: CanMatchFn = (route, state) => {
  const router = inject(Router);
  const authUserStore = inject(UserAuthStore);
  const dataConfStore = inject(dataConfigStore);
  if(authUserStore.checkIfIsUserConnected()) {
    return true;
  }
  authUserStore.logout();
  dataConfStore.clearDataConfigStore();
  return new RedirectCommand(router.parseUrl('/login'))
};


export const connectedWithUserRoleGuard: CanMatchFn = (route, state) => {
  const router = inject(Router);
  const authUserStore = inject(UserAuthStore);
  if(authUserStore.getUserConnectedRole().includes('user')) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/not-authorized'))
};

export const connectedWithAdminRoleGuard: CanMatchFn = (route, state) => {
  const router = inject(Router);
  const authUserStore = inject(UserAuthStore);
  if(authUserStore.getUserConnectedRole().includes('admin')) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/not-authorized'))
};
