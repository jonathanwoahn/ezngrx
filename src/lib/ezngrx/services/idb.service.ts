// import { Inject, Injectable } from "@angular/core";
// import { DynamicStoreConfig, DYNAMIC_STORE_CONFIG, EntityConfig } from "../ezngrx.models";

// @Injectable()
// export class IDBService {
	
// 	private openRequest: IDBOpenDBRequest;
// 	private db: any;
// 	private dbName: string = 'ezngrx_db';
// 	private storeName: string = 'ezngrx_store';
// 	private entities: EntityConfig<any>[] = [];

// 	constructor(
// 		// @Inject(DYNAMIC_STORE_CONFIG) private config: DynamicStoreConfig,
// 		@Inject(DYNAMIC_STORE_CONFIG) private config: DynamicStoreConfig,
// 	) {
// 		if(!!this.config.enableOfflineSync) {
// 			this.entities = config.entities.reduce((result: EntityConfig<any>[], entity: EntityConfig<any>) => {
// 				if(!entity.persist && entity.persist === false) return result;
// 				result.push(entity);
// 				return result;
// 			}, [] as EntityConfig<any>[]);
// 		}

// 		window.indexedDB.deleteDatabase(this.dbName);
// 		this.openRequest = window.indexedDB.open(this.dbName, 1);

		
		
// 	}

// 	async init(): Promise<void> {
// 		return new Promise((resolve, reject) => {
// 			this.openRequest.onupgradeneeded = (ev: IDBVersionChangeEvent) => {
// 				const db = (ev.target as IDBOpenDBRequest).result;
// 				if (!db.objectStoreNames.contains(this.storeName)) {
// 					db.createObjectStore(this.storeName, { keyPath: 'id' })
// 				}
// 			}
	
// 			this.openRequest.onerror = (ev) => {
// 				console.log('indexeddb error');
// 				return reject(ev);
// 			}
	
// 			this.openRequest.onsuccess = (ev) => {
// 				this.db = this.openRequest.result;
// 				return resolve(this.db);
// 			}
// 		});
		
		
// 		// let tx = this.db.transaction(this.storeName, 'readwrite');
// 		// let store = tx.objectStore(this.storeName);
// 		// let todos = {
// 		// 	id: 'Todos',
// 		// 	isLoaded: false,
// 		// 	isLoading: false,
// 		// 	entities: [],
// 		// };
// 		// let stores = [
// 		// 	{
// 		// 		id: 'Todos',
// 		// 		entities: [],
// 		// 		isLoaded: false,
// 		// 		isLoading: false,
// 		// 	},
// 		// 	{
// 		// 		id: 'Users',
// 		// 		entities: [],
// 		// 		isLoaded: false,
// 		// 		isLoading: false,
// 		// 	},
// 		// ];
// 		// store.put(stores[0]);
// 		// store.put(stores[1]);
// 		// const request = store.getAll();
// 		// // let todo = {
// 		// // 	id: '1s',
// 		// // 	text: 'Make stuff',
// 		// // };
// 		// // let req = todos.add(todo);
// 		// // console.log(this.db);
// 		// // console.log(todos);
// 		// // const temp = await this.tryCreateStore();
// 		// // console.log(temp, this.db);

// 		// request.onsuccess = () => {
// 		// 	console.log(request.result);

// 		// }
		
		
// 		// const initialState = await this.getInitialStateFromDb();
// 		// console.log(initialState);
// 	}

// 	async getStoreState(store: string): Promise<any> {
// 		console.log(this.db);
// 		return new Promise((resolve, reject) => {
// 			let tx = this.db.transaction(this.storeName, 'readwrite');
// 			let objectStore = tx.objectStore(this.storeName);
// 			const request = objectStore.get(store);

// 			request.onerror = reject;
// 			request.onsuccess = () => {
// 				resolve(request.result);
// 			}
// 		});
// 	}
	

// 	async getInitialStateFromDb(): Promise<any> {
// 		return new Promise((resolve, reject) => {

// 			let tx = this.db.transaction(this.storeName, 'readwrite');
// 			let store = tx.objectStore(this.storeName);
// 			const request = store.getAll();

// 			request.onerror = reject;
// 			request.onsuccess = () => {
// 				resolve(request.result);
// 			}
// 		});
// 	}

// }