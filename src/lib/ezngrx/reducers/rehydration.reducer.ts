import { Injectable } from "@angular/core";
import { Action, ActionReducer, INIT, ReducerManager, on, createAction, createReducer } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { DynamicStoreConfig } from "../ezngrx.models";
import { IDBService } from "../services/idb.service";
import { DynamicState } from "./dynamic.reducers";
import { empty } from "./meta.reducers";

// export const rehydrationReducerFactory = (config?: DynamicStoreConfig): ActionReducer<any> => {
//     return (reducer: ActionReducer<any>) => {
//         return (state: any, action: Action) => {
//             if(action.type === INIT) {
//                 console.log('INITIATION');
//             }
//             // console.log(state, action);
//             return reducer(state, action);
//         };
//     };

// };

// const tryCreateStore = async (request: IDBOpenDBRequest, reducerKey: string): Promise<IDBDatabase> => {
// 	return new Promise((resolve, reject) => {
// 		request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
// 			const db =  request.result;
// 			if(!db.objectStoreNames.contains(reducerKey)) {
// 				db.createObjectStore(reducerKey);
// 			}
// 		}
// 		request.onsuccess = () => {
// 			// console.log(request.result);
// 			resolve(request.result);
// 		};
// 		request.onerror = reject;
// 	});
// }

// const saveState = async (db: IDBDatabase, newState: any, reducerKey: string, version: number): Promise<any> => {
// 	return new Promise((resolve, reject) => {
// 		const stateObjectStore = db
// 			.transaction(reducerKey, 'readwrite')
// 			.objectStore(reducerKey);
		
// 			const request = stateObjectStore.put(newState, version);
// 			request.onerror = reject;
// 			request.onsuccess = resolve;
// 	});
// }

// const getInitialStateFromDb = async (db: IDBDatabase, reducerKey: string, version: number): Promise<any> => {
// 	return new Promise((resolve, reject) => {
// 		const stateObjectStore = db
// 			.transaction(reducerKey, 'readonly')
// 			.objectStore(reducerKey);
// 		const request = stateObjectStore.get(version);
// 		request.onerror = reject;
// 		request.onsuccess = () => {
// 			resolve(request.result);
// 		}
// 	});
// }

// const initializeDb = async (reducerKey: string, version: number): Promise<IDBDatabase> => {
// 	const request: IDBOpenDBRequest = window.indexedDB.open(reducerKey, version);
// 	let db;
// 	request.onerror = (event) => {
// 		console.log(event);
// 	}
// 	request.onsuccess = (event: any) => {
// 		console.log('ok');
// 		db = event.target.result;
// 	}
// 	console.log(request);
// 	return await tryCreateStore(request, reducerKey);
// }

// export const createIndexedDBRehydrateReducer = async (initialState: any): Promise<ActionReducer<S, A>> => {

// 	return Promise.resolve(createReducer(initialState, (state, action) => {
// 		return state;
// 	}));
// 	// const request = window.indexedDB.open('EZNGRX_Database');
// 	// let db: any;
// 	// let newInitialState;

// 	// try {
// 	// 	db = await tryCreateStore(request, reducerKey);
// 	// } catch(err) {
// 	// 	console.log(err);
// 	// }

// 	// newInitialState = ((await getInitialStateFromDb(db, reducerKey, 1))) ?? initialState;

// }

// const simpleAction = createAction('Simple Action');

// export const addIndexedDBRehydratedReducer = (reducerManager: ReducerManager, config: DynamicStoreConfig) => {
// 	const dbService = new IDBService(config);
// 	// console.log(dbService);
	
	
// 	return async () => {
// 		// const temp = await idbService.getState();
// 		// console.log(temp);
// 	// 	const reducerKey = 'EZNGRX';
// 	// 	const indexedDBRehydrateReducer: any = await createIndexedDBRehydrateReducer(
// 	// 		reducerKey,
// 	// 		{},
// 	// 		on(simpleAction, (state: any) => {
// 	// 			return {
// 	// 				...state,
// 	// 				modifiableField: state.modifiableField + 1,
// 	// 			};
// 	// 		})
// 	// 	);
// 	// 	reducerManager.addReducer(
// 	// 		'indexedDBRehydratereducer',
// 	// 		indexedDBRehydrateReducer
// 	// 	);
// 	}
// }


// @Injectable()
// export class RehydrationReducer {
// 	// private initialState: DynamicState<any>;
	
	
// 	private key: string;
// 	private version: number;
	
// 	constructor() { 
// 		this.key = 'Ezngrx';
// 		this.version = 1;
// 		// console.log(simpleAction)
// 		// this.initDb();
// 	}

// 	// async saveState(db: IDBDatabase, newState: any, reducerKey: string): Promise<any> {
// 	// 	return new Promise((resolve, reject) => {
// 	// 		const stateObjectStore = db
// 	// 			.transaction(reducerKey, 'readwrite')
// 	// 			.objectStore(reducerKey);
			
// 	// 			const request = stateObjectStore.put(newState, this.version);
// 	// 			request.onerror = reject;
// 	// 			request.onsuccess = resolve;
// 	// 	});
// 	// }

// 	// async getInitialStateFromDb(db: IDBDatabase, reducerKey: string): Promise<any> {
// 	// 	return new Promise((resolve, reject) => {
// 	// 		console.log(db)
// 	// 		const stateObjectStore = db
// 	// 			.transaction(reducerKey, 'readonly')
// 	// 			.objectStore(reducerKey);
// 	// 		const request = stateObjectStore.get(this.version);
// 	// 		request.onerror = reject;
// 	// 		request.onsuccess = () => {
// 	// 			resolve(request.result);
// 	// 		}
// 	// 	});
// 	// }

// 	// async initDb(): Promise<IDBDatabase> {
// 	// 	const request = window.indexedDB.open(this.key, this.version);
// 	// 	return await tryCreateStore(request, this.key)
// 	// }

// 	bootstrap(): Promise<DynamicState<any>> {
// 			return new Promise(resolve => {
// 				const database = initializeDb(this.key, this.version);
// 				database
// 					.then((db: IDBDatabase) => getInitialStateFromDb(db, this.key, this.version))
// 					.then(res => console.log(res))
// 				// const db = this.initDb();
// 				// db
// 				// .then((db: IDBDatabase) => getInitialStateFromDb(db, this.key, this.version))
// 				// .then(res => console.log(res));
// 				// console.log(db);
// 					// this.rehydrate(this.storage).subscribe((initialState: DynamicState<any>) => {
// 					//     this.initialState = initialState;
// 					//     resolve(void);
// 					// })
// 					// console.log('bootstrap');
// 			})
// 	}
// }


// // export function empty(reducer: ActionReducer<any>): ActionReducer<any> {
// //     return (state, action) => reducer(state, action);
// //   }