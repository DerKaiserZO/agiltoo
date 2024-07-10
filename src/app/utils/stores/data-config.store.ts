import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { debounceTime, distinctUntilChanged, pipe, retry, switchMap, tap } from "rxjs";
import { AuthService } from "../auth.service";
import { tapResponse } from "@ngrx/operators";


export const localStorageDataConfigKey = 'AppStateDataConfig'

export interface DataConfigType {
    id:number; 
    name: string;
}

type DataConfig = {
    projects: DataConfigType [];
    types: DataConfigType [];
    priorities: DataConfigType [];
    status: DataConfigType [];
    tags: DataConfigType [];
    epics: DataConfigType [];
    isLoading: boolean;
}

const initialDataConfigState: DataConfig = {
    projects: [],
    types: [],
    status: [],
    priorities: [],
    tags: [],
    epics: [],
    isLoading: false,
}


export const dataConfigStore = signalStore(
    { providedIn: 'root'},
    withState(initialDataConfigState),
    withComputed((store) => ({
        getProjects: computed(() => store.projects),
        getTypes: computed(() => store.types),
        getStatus: computed(() => store.status),
        getPriorities: computed(() => store.priorities),
        getTags: computed(() => store.tags),
        getEpics: computed(() => store.epics),
    })),
    withMethods((store) => {
        const authService = inject(AuthService);
        return {
            loadDataConfig: rxMethod<void>(
                pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    tap(() => patchState(store, {isLoading: true})),
                    switchMap(() => {
                        return authService.getDataConfig().pipe(
                            tapResponse({
                                next: ([projects, types, priorities, status, tags, epics]) => {
                                    patchState(store, {
                                        projects,
                                        types,
                                        priorities,
                                        status,
                                        tags,
                                        epics,
                                        isLoading: false
                                    })
                                },
                                error: (error) => patchState(store, {isLoading: false})
                            }),
                            retry(3)
                        )
                    }),
                )
            ),
            persistStore(): void {
                const storeObjectToPersist: DataConfig = {
                    projects: store.projects(),
                    types: store.types(),
                    priorities: store.priorities(),
                    status: store.status(),
                    tags: store.tags(),
                    epics: store.epics(),
                    isLoading: store.isLoading()
                };
                localStorage.setItem(localStorageDataConfigKey, JSON.stringify(storeObjectToPersist));
            },
            clearDataConfigStore() : void {
                patchState(store, initialDataConfigState);
                const persitedStore = localStorage.getItem(localStorageDataConfigKey);
                if(persitedStore) localStorage.removeItem(localStorageDataConfigKey);
            }
        }
    }),
    withHooks({
        onInit(store) {
            const persitedStore = localStorage.getItem(localStorageDataConfigKey);
          if(persitedStore) {
            patchState(store, JSON.parse(persitedStore));
          } else {
            patchState(store, initialDataConfigState);
          }
        },
    }),
)