import { HttpErrorResponse } from "@angular/common/http";
import { Actions, createEffect, ofType, OnIdentifyEffects, OnInitEffects, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { Action, createAction, Store } from "@ngrx/store";
import { from, of } from "rxjs";
import { map, catchError, withLatestFrom, switchMap } from 'rxjs/operators';
import { ActionFactory } from "../actions/action-factory";
import { ActionFactoryService } from "../actions/action-factory.service";
import { DynamicActions, getDynamicActionType } from "../actions/dynamic.actions";
import { DynamicActionTypes, EntityConfig } from "../ezngrx.models";
import { DynamicState } from "../reducers/dynamic.reducers";
import { isLoaded } from "../selectors/dynamic.selectors";
import { IDynamicDataService } from "../services/default-data.service";

export class DynamicEffect<T> implements OnIdentifyEffects, OnInitEffects {
    private entityActions: ActionFactory<T>;
  
    addOne$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.addOne) as any),
          switchMap((action: DynamicActions<T>) => {
            return this.dataService.addOneEntity(action.payload)
              .pipe(
                map((entity: T) => this.entityActions.addOneSuccess(entity)),
                catchError((error: HttpErrorResponse) => of(this.entityActions.addOneFail(error)))
              );
          })
        );
    });
  
    addMany$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.addMany) as any),
          switchMap((action: DynamicActions<T>) => {
            return this.dataService.addManyEntities(action.payload)
              .pipe(
                map((entities: T[]) => this.entityActions.addManySuccess(entities)),
                catchError((error: HttpErrorResponse) => of(this.entityActions.addManyFail(error))),
              );
          }),
        );
    });
    
  
    addAll$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.addAll) as any),
          switchMap((action: DynamicActions<T>) => {
            return this.dataService.addAllEntities(action.payload)
              .pipe(
                map((entities: T[]) => this.entityActions.addAllSuccess(entities)),
                catchError((error: HttpErrorResponse) => of(this.entityActions.addAllFail(error))),
              );
          }),
        );
    });
  
    removeOne$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.removeOne) as any),
          switchMap((action: DynamicActions<T>) => {
            return this.dataService.removeOneEntity(action.payload)
              .pipe(
                map((entity: string) => this.entityActions.removeOneSuccess(entity)),
                catchError((error: HttpErrorResponse) => of(this.entityActions.removeOneFail(error))),
              );
          }),
        );
    });
  
    removeMany$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.removeMany) as any),
          switchMap((action: DynamicActions<T>) => {
            return this.dataService.removeManyEntities(action.payload)
              .pipe(
                map((entity: string[]) => this.entityActions.removeManySuccess(entity)),
                catchError((error: HttpErrorResponse) => of(this.entityActions.removeManyFail(error))),
              );
          }),
        );
    });
  
    removeAll$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.removeAll) as any),
          switchMap((action: DynamicActions<T>) => {
            return this.dataService.removeAllEntities()
              .pipe(
                map(() => this.entityActions.removeAllSuccess()),
                catchError((error: HttpErrorResponse) => of(this.entityActions.removeAllFail(error))),
              );
          }),
        );
    });
  
    updateOne$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.updateOne) as any),
          switchMap((action: DynamicActions<T>) => {
            return this.dataService.updateOneEntity(action.payload)
              .pipe(
                map((entity: T) => this.entityActions.updateOneSuccess(entity)),
                catchError((error: HttpErrorResponse) => of(this.entityActions.updateOneFail(error))),
              );
          }),
        );
    });
  
    updateMany$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.updateMany) as any),
          switchMap((action: DynamicActions<T>) => {
            return this.dataService.updateManyEntities(action.payload)
              .pipe(
                map((entities: T[]) => this.entityActions.updateManySuccess(entities)),
                catchError((error: HttpErrorResponse) => of(this.entityActions.updateManyFail(error))),
              );
          }),
        );
    });
  
    upsertOne$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.upsertOne) as any),
          switchMap((action: DynamicActions<T>) => {
            return this.dataService.upsertOneEntity(action.payload)
              .pipe(
                map((entity: T) => this.entityActions.upsertOneSuccess(entity)),
                catchError((error: HttpErrorResponse) => of(this.entityActions.upsertOneFail(error))),
              );
          }),
        );
    });
  
    upsertMany$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.upsertMany) as any),
          switchMap((action: DynamicActions<T>) => {
            return this.dataService.upsertManyEntities(action.payload)
              .pipe(
                map((entities: T[]) => this.entityActions.upsertManySuccess(entities)),
                catchError((error: HttpErrorResponse) => of(this.entityActions.upsertManyFail(error))),
              );
          }),
        );
    });
  
    load$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.load) as any),
          withLatestFrom(this.store.select(isLoaded<T>(this.entityConfig) as any)),
          switchMap(([action, entitiesLoaded]: [DynamicActions<T>, boolean]) => {
            if (action.payload.force || !entitiesLoaded) {
              return this.dataService.load(action.payload.query)
                .pipe(
                  map((entities: T[]) => this.entityActions.loadSuccess(entities)),
                  catchError((error: HttpErrorResponse) => of(this.entityActions.loadFail(error))),
                );
            }
            return of(this.entityActions.loadResolved());
          }),
        );

    });
  
    constructor(
      private entityConfig: EntityConfig<T>,
      private actions$: Actions,
      private dataService: IDynamicDataService<T>,
      private actionFactory: ActionFactoryService,
      private store: Store<DynamicState<T>>,
    ) {
      this.entityActions = this.actionFactory.getEntityActions<T>(this.entityConfig.entity);
      // console.log(this.idb);
    }
  
    // This method is used by the parent class to differentiate between
    // the different classes that are calling on the exact same effects
    ngrxOnIdentifyEffects(): string {
      return this.entityConfig.entity;
    }

    ngrxOnInitEffects(): Action {
      return createAction(ROOT_EFFECTS_INIT)();
    }
  }

// function switchMap(arg0: (action: any) => any): any {
//     throw new Error("Function not implemented.");
// }
