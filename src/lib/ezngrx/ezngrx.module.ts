import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicStoreConfig, DYNAMIC_DATA_PROVIDER, DYNAMIC_STORE_CONFIG, EntityConfig } from './ezngrx.models';

import { META_REDUCERS, ReducerManager, StoreModule } from '@ngrx/store';

import { EffectsModule, EffectSources } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DynamicFacadeService } from './facades/dynamic-facade.service';
import { ActionFactoryService } from './actions/action-factory.service';
import { DefaultDataService } from './services/default-data.service';
import { DynamicEffectFactoryService } from './effects/dynamic-effect-factory.service';
import { DynamicDataFactoryService } from './services/dynamic-data-factory.service';
import { reducerWrapper } from './reducers/dynamic.reducers';
import { loggerReducer } from './reducers/store-logger';

const DEFAULT_CONFIG: DynamicStoreConfig = {
  entities: [],
  providers: [],
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
  ],
  providers: [
    DynamicFacadeService,
    ActionFactoryService,
    DefaultDataService,
    DynamicEffectFactoryService,
    DynamicDataFactoryService,
    {
      provide: DYNAMIC_DATA_PROVIDER,
      useValue: 'DYNAMIC_DATA_PROVIDER',
      multi: true,
    },
  ]
})
export class EzngrxModule { 
  static forRoot(config: DynamicStoreConfig = DEFAULT_CONFIG): ModuleWithProviders<EzngrxModule> {
    return {
      ngModule: EzngrxModule,
      providers: [
        {
          provide: DYNAMIC_STORE_CONFIG,
          useValue: config,
        },
        {
          provide: META_REDUCERS,
          deps: [DYNAMIC_STORE_CONFIG],
          multi: true,
          useFactory: loggerReducer,
        },
        ...config.providers,
      ],
    };
  }

  constructor(
    @Inject(DYNAMIC_STORE_CONFIG) private config: DynamicStoreConfig,
    private reducerManager: ReducerManager,
    private effectSources: EffectSources,
    private dynamicEffectFactoryService: DynamicEffectFactoryService<any>,
  ) {

    
    
    let effects: any[] = [];
    const reducers = this.config.entities.reduce((result: any, entityConfig: EntityConfig<any>) => {
      effects = [
        ...effects,
        this.dynamicEffectFactoryService.getEntityEffects(entityConfig),
      ];
      result[entityConfig.entity] = reducerWrapper(entityConfig);
      return result;
    }, {});
    this.reducerManager.addReducers(reducers);
    effects.forEach(effect => this.addEffects(effect));
  }

  private addEffects(effectSourceInstance: any): void {
    this.effectSources.addEffects(effectSourceInstance);
  }
  
}
