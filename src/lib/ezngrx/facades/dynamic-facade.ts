import { HttpErrorResponse } from "@angular/common/http";
import { Dictionary } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ActionDispatcher } from "../actions/action-dispatcher";
import { ActionFactory } from "../actions/action-factory";
import { DynamicActions } from "../actions/dynamic.actions";
import { EntityConfig } from "../ezngrx.models";
import { getEntityError, getSelectedEntityId, isLoaded, isLoading, selectAllEntities, selectAllIds, selectEntityObjects, selectTotalCount } from "../selectors/dynamic.selectors";

export class DynamicFacade<T> {
    actions: ActionFactory<T>;
  
    objects$: Observable<Dictionary<T>>;
    // entities$: Observable<T[]>;
    entities$: BehaviorSubject<T[]> = new BehaviorSubject([] as T[]);
    ids$: Observable<string[]>;
    total$: Observable<number>;
    // selectedEntity$: BehaviorSubject<T> = new BehaviorSubject(undefined);
    selectedEntity$: BehaviorSubject<T> = new BehaviorSubject({} as T);
    selectedEntityId$: Observable<string>;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    error$: Observable<HttpErrorResponse>;

    dispatcher: ActionDispatcher<T>;
  
    constructor(
      private entityConfig: EntityConfig<T>,
      private store: Store<any>,
    ) {
      this.actions = new ActionFactory<T>(this.entityConfig.entity);

      this.dispatcher = new ActionDispatcher(this.store, this.entityConfig.entity);
      
  
      /**
       * I'd love to figure out how to resolve the types on these selectors, but I'm confounded. But I know
       * these work, so I'm going to leave it for now
       */
      this.objects$ = this.store.select(selectEntityObjects<T>(entityConfig) as any) as any;
      this.store.select(selectAllEntities<T>(entityConfig) as any)
        .subscribe((entities: any) => {
          this.entities$.next(entities);
        });
  
      // this.entities$ = this.store.select(selectAllEntities<T>(entityConfig) as any) as any;
      this.total$ = this.store.select(selectTotalCount<T>(entityConfig) as any) as any;
      this.ids$ = this.store.select(selectAllIds<T>(entityConfig) as any) as any;
      this.selectedEntityId$ = this.store.select(getSelectedEntityId<T>(entityConfig) as any) as any;
      this.loaded$ = this.store.select(isLoaded<T>(entityConfig) as any) as any;
      this.loading$ = this.store.select(isLoading<T>(entityConfig) as any) as any;
      this.error$ = this.store.select(getEntityError<T>(entityConfig)) as any;
  
      combineLatest([this.selectedEntityId$, this.objects$])
        .pipe(
          map(([selectedId, entities]: [string, Dictionary<T>]) => (entities || {} as any)[selectedId]),
          // distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y)),
        )
        // .subscribe((entity: T) => this.selectedEntity$.next(entity));
        .subscribe((entity: any) => this.selectedEntity$.next(entity));
    }
  
    // dispatcher(action: DynamicActions<T>): void {
    //   this.store.dispatch(action);
    // }
  
    get entities(): T[] { return this.entities$.getValue(); }
    get selectedEntity(): T { return this.selectedEntity$.getValue(); }
  }