import { InjectionToken } from "@angular/core";
import { IDynamicDataService } from "./services/default-data.service";

export class DynamicActionTypes {
  static addOne = 'Add One'; // done
  static addMany = 'Add Many'; // done
  static addAll = 'Add All'; // done
  static setAll = 'Set All';
  static setOne = 'Set One';
  static setMany = 'Set Many';
  static removeOne = 'Remove One'; // done
  static removeMany = 'Remove Many'; // done
  static removeAll = 'Remove All'; // done
  static updateOne = 'Update One'; // done
  static updateMany = 'Update Many'; // done
  static upsertOne = 'Upsert One'; // done
  static upsertMany = 'Upsert Many'; // done
  static selectId = 'Select Id'; // done
  static resetState = 'Reset State'; // done
  static load = 'Load Entities';
  
  static clearError = 'Clear Error';
}

export class DynamicActionResults {
  static success = 'Success';
  static fail = 'Fail';
  static clear = 'Clear';
  static resolved = 'Resolved';
}

export interface EntityConfig<T> {
    /**
     * Array of the entities you use in your application. They should be spelled
     * and capitalized in the same way you have your interfaces defined
     * i.e. if you have an interface
     * Todo {
     *   id: number;
     *   text: string;
     * }
     * then you pass in your argument as: 'Todo'
     */
    entity: string;
    /**
     * If the key is something other than 'id'. Defaults to 'id' if left blank
     */
    entityKey?: string;
    /**
     * Persist to local storage. Defaults to true. If "enableOfflineSync" is not set to true,
     * this will not work
     */
    persist?: boolean;
  }
  
interface AngularMultiProvider {
  provide: InjectionToken<any>;
  useClass: any;
  multi: true;
}

export interface DynamicStoreConfig {
  entities: EntityConfig<any>[];
  // Additional entities to be synchronized with localStorageSync that are not entity entity array
  syncEntities?: string[];
  /**
   * Defaults to false. Set as true to enable syncing data offline
   */
  enableOfflineSync?: boolean;
  /**
   * Enable ngrx logging
   */
  enableLogging?: boolean;
  /**
   * Even if no providers are defined, provide and empty array to prevent build errors
   */
  providers: AngularMultiProvider[];
}

export const DYNAMIC_STORE_CONFIG = new InjectionToken<DynamicStoreConfig>('Dynamic Store Options');
export const DYNAMIC_STORE_ENTITIES = new InjectionToken('Dynamic Store Entities');
export const DYNAMIC_DATA_SERVICES = new InjectionToken<IDynamicDataService<any>[]>('Dynamic Data Services');
export const DYNAMIC_DATA_PROVIDER = new InjectionToken('Dynamic Data Provider');

