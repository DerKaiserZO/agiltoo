import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { UserInfos } from '../models/user-connected.model';
import { LoginUser } from '../models/auth.model';
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
}

const initialState: UserAuth = {
    userAuth: undefined,
    accessToken: '',
    isLoading: false,
    isLoggedIn: false
}

export const UserAuthStore = signalStore(
    { providedIn: 'root'},
    withState(initialState),
    withComputed(({ accessToken, userAuth }) => ({
        getAccesToken: computed(() => accessToken()),
        getUserConnectedName: computed(() => userAuth()!.name),
        getUserConnectedRole: computed(() => userAuth()!.roles)
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
                                next: (userConnectd) => {
                                    patchState(store, {
                                        isLoggedIn: true, accessToken: userConnectd.accessToken, isLoading: false
                                    });

                                    if(userConnectd.roles.includes('admin')) {
                                        router.navigate(['/home/admin'], { replaceUrl: true });
                                    }
                                },
                                error: (err) => {
                                    patchState(store, {isLoading: false});
                                }
                            }),
                            filter((userConnectd) => {
                                return userConnectd.roles.includes('user');
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
                    isLoggedIn: store.isLoggedIn()
                }
                localStorage.setItem(localStorageKey, JSON.stringify(storeObjectToPersist));
            },
            logout(): void {
                patchState(store, initialState);
                const persitedStore = localStorage.getItem(localStorageKey);
                if(persitedStore) localStorage.removeItem(localStorageKey);
                router.navigate(['/login'], { replaceUrl: true });
            },
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
    // withHooks( (store) => {
    //     const router = inject(Router)
    //     return {
    //         onInit() {
    //             const savedStore = localStorage.getItem(localStorageKey);
    //             if(savedStore){
    //                 patchState(store, JSON.parse(savedStore))
    //             } else {
    //                 patchState(store, initialState);
    //                 router.navigate(['/login'], { replaceUrl: true });
    //             }
    //         }
    //     }
    // })
);