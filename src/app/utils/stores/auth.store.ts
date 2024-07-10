import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { UserInfos } from '../models/user-connected.model';
import { LoginUser, SignupUser } from '../models/auth.model';
import { debounceTime, filter, pipe, switchMap, tap } from 'rxjs';
import { computed, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


export const localStorageKey = 'AppSate';

type UserAuth = {
    userAuth: UserInfos | undefined;
    accessToken: string;
    isLoading: boolean;
    isLoggedIn: boolean;
    isAdmin: boolean;
    roles: string[];
}

const initialState: UserAuth = {
    userAuth: undefined,
    accessToken: '',
    isLoading: false,
    isLoggedIn: false,
    isAdmin: false,
    roles: []
}

export const UserAuthStore = signalStore(
    { providedIn: 'root'},
    withState(initialState),
    withComputed(({ accessToken, userAuth, isLoggedIn, isAdmin, roles }) => ({
        getAccesToken: computed(() => accessToken()),
        getUserConnectedName: computed(() => userAuth()!.name),
        getUserConnected: computed(() => userAuth()),
        getUserConnectedRole: computed(() => roles()),
        checkIfIsUserConnected: computed(() => isLoggedIn()),
        checkIfIsUserIsAdmin: computed(() => isAdmin()),
    })),
    withMethods((store) => {
        const authService = inject(AuthService);
        const router = inject(Router);
        return {
            login: rxMethod<LoginUser>(
                pipe(
                    debounceTime(300),
                    tap(() => patchState(store,  {isLoading : true})),
                    switchMap((loginUser) => {
                        return authService.login(loginUser).pipe(
                            tapResponse({
                                next: (userConnected) => {
                                    patchState(store, {
                                        isLoggedIn: true, 
                                        accessToken: userConnected.accessToken, 
                                        isLoading: false,
                                        roles: userConnected.roles
                                    });
                                    if(userConnected.roles.includes('admin') || (userConnected.roles.includes('user') && userConnected.roles.includes('admin'))) {
                                        patchState(store, {isAdmin : true});
                                        router.navigate(['/home/admin'], { replaceUrl: true });
                                    }
                                },
                                error: (err) => {
                                    patchState(store, {isLoading: false});
                                }
                            }),
                            filter((userConnected) => {
                                return userConnected.roles.includes('user');
                            }),
                            switchMap(() => {
                                return authService.getCurrentUserInfos().pipe(
                                    tapResponse({
                                        next: (userInfo) => {
                                            patchState(store, { userAuth: userInfo });
                                            router.navigate(['/home'], { replaceUrl: true });
                                        },
                                        error: () => { }
                                    })
                                );
                            }),
                        )
                    }),
                )
            ),
            persistStore(): void {
                const storeObjectToPersist: UserAuth = {
                    userAuth: store.userAuth(),
                    accessToken: store.accessToken(),
                    isLoading: store.isLoading(),
                    isLoggedIn: store.isLoggedIn(),
                    isAdmin: store.isAdmin(),
                    roles: store.roles()
                }
                localStorage.setItem(localStorageKey, JSON.stringify(storeObjectToPersist));
            },
            logout(): void {
                patchState(store, initialState);
                const persitedStore = localStorage.getItem(localStorageKey);
                if(persitedStore) localStorage.removeItem(localStorageKey);
                setTimeout(() => {
                    router.navigate(['/login'], { replaceUrl: true });
                }, 2000)
            },
            upDateUserAuth(userAuthNewData : UserInfos): void {
                patchState(store, {userAuth : userAuthNewData});
                this.persistStore();
            },
            signup: rxMethod<SignupUser>(
                pipe(
                    debounceTime(300),
                    tap(() => patchState(store,  {isLoading : true})),
                    switchMap((signupUser) => {
                        return authService.signup(signupUser).pipe(
                            tapResponse({
                                next: (userConnected) => {
                                    patchState(store, {
                                        isLoggedIn: true, 
                                        accessToken: userConnected.accessToken, 
                                        isLoading: false,
                                        roles: userConnected.roles
                                    });
                                },
                                error: (err) => {
                                    patchState(store, {isLoading: false});
                                },
                                complete: () => patchState(store, {isLoading: false})
                            }),
                            filter((userConnected) => {
                                return userConnected.roles.includes('user');
                            }),
                            debounceTime(800),
                            switchMap(() => {
                                return authService.getCurrentUserInfos().pipe(
                                    tapResponse({
                                        next: (userInfo) => {
                                            patchState(store, { userAuth: userInfo });
                                            router.navigate(['/home'], { replaceUrl: true });
                                        },
                                        error: () => { }
                                    })
                                );
                            }),
                        )
                    }),
                )
            ),
        }
    }),
    withHooks({
        onInit(store) {
            const persitedStore = localStorage.getItem(localStorageKey);
          if(persitedStore) {
            patchState(store, JSON.parse(persitedStore));
          } else {
            patchState(store, initialState);
          }
        },
    }),
);