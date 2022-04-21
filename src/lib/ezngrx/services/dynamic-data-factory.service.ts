import { Inject, Injectable } from "@angular/core";
import { DYNAMIC_DATA_PROVIDER } from "../ezngrx.models";
import { DefaultDataService, IDynamicDataService } from "./default-data.service";

@Injectable({
    providedIn: 'root',
  })
  export class DynamicDataFactoryService {
    constructor(
      private defaultDataService: DefaultDataService<any>,
      @Inject(DYNAMIC_DATA_PROVIDER) private dataServices: IDynamicDataService<any>[],
    ) { }
  
    getDataService(entity: string): IDynamicDataService<any> {
      const service: IDynamicDataService<any> = this.dataServices.find(dataService => dataService.entity === entity) as any;
      if (!service) {
        return this.defaultDataService;
      }
      return service;
    }
  }