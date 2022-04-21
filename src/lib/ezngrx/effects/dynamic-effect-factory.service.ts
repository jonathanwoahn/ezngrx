import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ActionFactoryService } from "../actions/action-factory.service";
import { EntityConfig } from "../ezngrx.models";
import { DynamicState } from "../reducers/dynamic.reducers";
import { DynamicDataFactoryService } from "../services/dynamic-data-factory.service";
import { DynamicEffect } from "./dynamic-effect";

@Injectable()
export class DynamicEffectFactoryService<T> {
  constructor(
    private actions$: Actions,
    private actionFactory: ActionFactoryService,
    private dataServiceFactory: DynamicDataFactoryService,
    private store: Store<DynamicState<T>>,
  ) { }

  getEntityEffects(entityConfig: EntityConfig<T>) {
    const dataService = this.dataServiceFactory.getDataService(entityConfig.entity);
    return new DynamicEffect<T>(
      entityConfig,
      this.actions$,
      dataService,
      this.actionFactory,
      this.store,
    );
  }
}