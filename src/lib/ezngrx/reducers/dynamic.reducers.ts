import { HttpErrorResponse } from '@angular/common/http';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { DynamicActions, getDynamicActionType } from '../actions/dynamic.actions';
import { DynamicActionResults, DynamicActionTypes, EntityConfig } from '../ezngrx.models';

export interface DynamicState<T> extends EntityState<T> {
    selectedId?: string;
    loaded: boolean;
    loading: boolean;
    error?: HttpErrorResponse;
  }
  
  export function getEntityAdapter<T>(entityConfig: EntityConfig<T>) {
    const key = entityConfig.entityKey || 'id';
    const selectId = (entity: { [x: string]: any; }) => entity[key];
  
    return createEntityAdapter<any>({
      selectId,
      sortComparer: false,
    });
  }
  
  export const initialState: DynamicState<any> = {
    ids: [],
    entities: {},
    loaded: false,
    loading: false,
  };
  
  export function reducerWrapper<T>(entityConfig: EntityConfig<T>) {
    const entity = entityConfig.entity;
    const adapter = getEntityAdapter(entityConfig);
  
    return function reducer(state = initialState, action: DynamicActions<T>): DynamicState<T> {
      switch (action.type) {
        // Add a single entity
        case (getDynamicActionType(entity, DynamicActionTypes.addOne)):
          return {
            ...state,
            error: undefined,
            loading: true,
          };
  
        // Single entity added successfully
        case (getDynamicActionType(entity, DynamicActionTypes.addOne, DynamicActionResults.success)):
          return {
            ...adapter.addOne(action.payload, state),
            loading: false,
          };
  
        // Single entity add failed
        case (getDynamicActionType(entity, DynamicActionTypes.addOne, DynamicActionResults.fail)):
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
  
        // Add a many entities
        case (getDynamicActionType(entity, DynamicActionTypes.addMany)):
          return {
            ...state,
            error: undefined,
            loading: true,
          };
  
        // many entities added successfully
        case (getDynamicActionType(entity, DynamicActionTypes.addMany, DynamicActionResults.success)):
          return {
            ...adapter.addMany(action.payload, state),
            loading: false,
          };
  
        // many entities add failed
        case (getDynamicActionType(entity, DynamicActionTypes.addMany, DynamicActionResults.fail)):
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
  
        //  Set all entities. Load everything from the server, pass in a query
        case (getDynamicActionType(entity, DynamicActionTypes.setAll)):
          return {
            ...state,
            loading: true,
            error: undefined,
          };
  
        // Set all entities success
        case (getDynamicActionType(entity, DynamicActionTypes.setAll, DynamicActionResults.success)):
          return {
            ...adapter.setAll(action.payload, state),
            loading: false,
          };
  
        // Set all entities fail
        case (getDynamicActionType(entity, DynamicActionTypes.setAll, DynamicActionResults.fail)):
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
  
        // //  Add all entities. Load everything from the server, pass in a query
        // case (getDynamicActionType(entity, DynamicActionTypes.addAll)):
        //   return {
        //     ...state,
        //     loading: true,
        //     error: undefined,
        //   };
  
        // // Add all entities success
        // case (getDynamicActionType(entity, DynamicActionTypes.addAll, DynamicActionResults.success)):
        //   return {
        //     ...adapter.addAll(action.payload, state),
        //     loading: false,
        //   };
  
        // // Add all entities fail
        // case (getDynamicActionType(entity, DynamicActionTypes.addAll, DynamicActionResults.fail)):
        //   return {
        //     ...state,
        //     loading: false,
        //     error: action.payload,
        //   };
  
        // Update one entity
        case (getDynamicActionType(entity, DynamicActionTypes.updateOne)):
          return {
            ...state,
            loading: true,
          };
  
        // Update one entity success
        case (getDynamicActionType(entity, DynamicActionTypes.updateOne, DynamicActionResults.success)):
          return {
            ...adapter.updateOne(action.payload, state),
            loading: false,
          };
  
        // Update one entity fail
        case (getDynamicActionType(entity, DynamicActionTypes.updateOne, DynamicActionResults.fail)):
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
  
        // Upsert one entity
        case (getDynamicActionType(entity, DynamicActionTypes.upsertOne)):
          return {
            ...state,
            loading: true,
          };
  
        // Upsert one entity success
        case (getDynamicActionType(entity, DynamicActionTypes.upsertOne, DynamicActionResults.success)):
          return {
            ...adapter.upsertOne(action.payload, state),
            loading: false,
          };
  
        // Upsert one entity fail
        case (getDynamicActionType(entity, DynamicActionTypes.upsertOne, DynamicActionResults.fail)):
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
  
        // Upsert many entities
        case (getDynamicActionType(entity, DynamicActionTypes.upsertMany)):
          return {
            ...state,
            loading: true,
          };
  
        // Upsert many entities success
        case (getDynamicActionType(entity, DynamicActionTypes.upsertMany, DynamicActionResults.success)):
          return {
            ...adapter.upsertMany(action.payload, state),
            loading: false,
          };
  
        // Upsert many entities fail
        case (getDynamicActionType(entity, DynamicActionTypes.upsertMany, DynamicActionResults.fail)):
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
  
        // Remove a single entity
        case (getDynamicActionType(entity, DynamicActionTypes.removeOne)):
          return {
            ...state,
            error: undefined,
            loading: true,
          };
  
        // Single entity removed successfully
        case (getDynamicActionType(entity, DynamicActionTypes.removeOne, DynamicActionResults.success)):
          return {
            ...adapter.removeOne(action.payload, state),
            loading: false,
          };
  
        // Single entity remove failed
        case (getDynamicActionType(entity, DynamicActionTypes.removeOne, DynamicActionResults.fail)):
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
  
        // Remove multiple entities
        case (getDynamicActionType(entity, DynamicActionTypes.removeMany)):
          return {
            ...state,
            error: undefined,
            loading: true,
          };
  
        // Remove multiple entities successfully
        case (getDynamicActionType(entity, DynamicActionTypes.removeMany, DynamicActionResults.success)):
          return {
            ...adapter.removeMany(action.payload, state),
            loading: false,
          };
  
        // Remove multiple entities failed
        case (getDynamicActionType(entity, DynamicActionTypes.removeMany, DynamicActionResults.fail)):
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
  
        // Remove all entities
        case (getDynamicActionType(entity, DynamicActionTypes.removeAll)):
          return {
            ...state,
            error: undefined,
            loading: true,
          };
  
        // Remove all entities successfully
        case (getDynamicActionType(entity, DynamicActionTypes.removeAll, DynamicActionResults.success)):
          return {
            ...adapter.removeAll(state),
            selectedId: undefined,
            loading: false,
          };
  
        // Remove all entities failed
        case (getDynamicActionType(entity, DynamicActionTypes.removeAll, DynamicActionResults.fail)):
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
  
  
        // Select an entity ID
        case (getDynamicActionType(entity, DynamicActionTypes.selectId)):
          return {
            ...state,
            selectedId: action.payload as string,
          };
  
        // Clear the selected ID for the current entity
        case (getDynamicActionType(entity, DynamicActionTypes.selectId, DynamicActionResults.clear)):
          return {
            ...state,
            selectedId: undefined,
          };
  
        // Clear the error the current entity
        case (getDynamicActionType(entity, DynamicActionTypes.clearError, DynamicActionResults.clear)):
          return {
            ...state,
            error: undefined,
          };
  
        // Reset the entity state
        case (getDynamicActionType(entity, DynamicActionTypes.resetState)):
          return {
            ...initialState,
          };
  
        // Load entities
        case (getDynamicActionType(entity, DynamicActionTypes.load)):
          return {
            ...state,
            loading: true,
          };
  
        // Entities loaded successfully
        case (getDynamicActionType(entity, DynamicActionTypes.load, DynamicActionResults.success)):
          return {
            ...adapter.setAll(action.payload, state),
            // ...adapter.addAll(action.payload, state),
            loading: false,
            loaded: true,
          };
  
        // Load entities fail
        case (getDynamicActionType(entity, DynamicActionTypes.load, DynamicActionResults.fail)):
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
  
  
        // Load entities already called, resolving current state
        case (getDynamicActionType(entity, DynamicActionTypes.load, DynamicActionResults.resolved)):
          return {
            ...state,
            loading: false,
            error: undefined,
          };
  
          /**
         * Add in other reducer actions here
         */
        default:
          return state;
      }
    };
  }
  
  export const selectedEntityId = (state: DynamicState<any>) => state.selectedId;
  export const entityError = (state: DynamicState<any>) => state.error;