import { Store } from "@ngrx/store";
import { ActionFactory } from "./action-factory";


export class ActionDispatcher<T> {
    
    private actions: ActionFactory<T>;
    constructor(
        private store: Store<any>,
        private entity: string,
    ) {
        this.actions = new ActionFactory<T>(this.entity)
    }

    resetState(): void {
        this.store.dispatch(this.actions.resetState())
    }

    clearSelectedId(): void {
        this.store.dispatch(this.actions.clearSelectedId())
    }

    selectId(key: string): void {
        this.store.dispatch(this.actions.selectId(key));
    }

    clearError(): void {
        this.store.dispatch(this.actions.clearError());
    }

    /**
     * ADD ONE
     */
    addOne(entity: T): void {
        this.store.dispatch(this.actions.addOne(entity));
    }

    // addOneSuccess(entity: T): void {
    //     this.store.dispatch(this.actions.addOneSuccess(entity));
    // }

    // addOneFail(error: HttpErrorResponse): void {
    //     this.store.dispatch(this.actions.addOneFail(error));
    // }

    /**
     * ADD MANY
     */
    addMany(entities: T[]): void {
        this.store.dispatch(this.actions.addMany(entities));
    }

    // addManySuccess(entities: T[]): void {
    //     this.store.dispatch()
    //     // return new AddManyEntitiesSuccess<T>(this.entity, entities);
    // }

    // addManyFail(error: HttpErrorResponse): void {
    //     this.store.dispatch()
    //     // return new AddManyEntitiesFail<T>(this.entity, error);
    // }

    /**
     * ADD ALL
     */
    addAll(entities: T[]): void {
        this.store.dispatch(this.actions.addAll(entities));
    }

    // addAllSuccess(entities: T[]): void {
    //     this.store.dispatch()
    //     // return new AddAllEntitiesSuccess<T>(this.entity, entities);
    // }

    // addAllFail(error: HttpErrorResponse): void {
    //     this.store.dispatch()
    //     // return new AddAllEntitiesFail<T>(this.entity, error);
    // }

    /**
     * SET ONE
     */
    setOne(entity: T): void {
        this.store.dispatch(this.actions.setOne(entity));
        // return new SetOneEntity<T>(this.entity, entity);
    }

    // setOneSuccess(entity: T): void {
    //     this.store.dispatch()
    //     // return new SetOneEntitySuccess<T>(this.entity, entity);
    // }

    // setOneFail(error: HttpErrorResponse): void {
    //     this.store.dispatch()
    //     // return new SetOneEntityFail<T>(this.entity, error);
    // }

    /**
     * SET ALL
     */
    setAll(entities: T[]): void {
        this.store.dispatch(this.actions.setAll(entities));
        // return new SetAllEntities<T>(this.entity, entities);
    }

    // setAllSuccess(entities: T[]): void {
    //     this.store.dispatch()
    //     // return new SetAllEntitiesSuccess<T>(this.entity, entities);
    // }

    // setAllFail(error: HttpErrorResponse): void {
    //     this.store.dispatch()
    //     // return new SetAllEntitiesFail<T>(this.entity, error);
    // }

    /**
     * SET MANY
     */
    setMany(entities: T[]): void {
        this.store.dispatch(this.actions.setMany(entities));
    }

    // setManySuccess(entities: T[]): void {
    //     this.store.dispatch()
    //     // return new SetManyEntitiesSuccess<T>(this.entity, entities);
    // }

    // setManyFail(error: HttpErrorResponse): void {
    //     this.store.dispatch()
    //     // return new SetManyEntitiesFail<T>(this.entity, error);
    // }

    /**
     * REMOVE ONE
     */
    removeOne(entityId: string): void {
        this.store.dispatch(this.actions.removeOne(entityId));
    }

    // removeOneSuccess(entityId: string): void {
    //     this.store.dispatch()
    //     // return new RemoveOneEntitySuccess<T>(this.entity, entityId);
    // }

    // removeOneFail(error: HttpErrorResponse): void {
    //     this.store.dispatch()
    //     // return new RemoveOneEntityFail<T>(this.entity, error);
    // }

    // /**
    //  * REMOVE MANY
    //  */
    // removeMany(entityIds: string[]): void {
    //     this.store.dispatch()
    //     // return new RemoveManyEntities<T>(this.entity, entityIds);
    // }

    // removeManySuccess(entityIds: string[]): void {
    //     this.store.dispatch()
    //     // return new RemoveManyEntitiesSuccess<T>(this.entity, entityIds);
    // }

    // removeManyFail(error: HttpErrorResponse): void {
    //     this.store.dispatch()
    //     // return new RemoveManyEntitiesFail<T>(this.entity, error);
    // }

    // /**
    //  * REMOVE ALL
    //  */
    // removeAll(): void {
    //     this.store.dispatch()
    //     // return new RemoveAllEntities<T>(this.entity);
    // }

    // removeAllSuccess(): void {
    //     this.store.dispatch()
    //     // return new RemoveAllEntitiesSuccess<T>(this.entity);
    // }

    // removeAllFail(error: HttpErrorResponse): void {
    //     this.store.dispatch()
    //     // return new RemoveAllEntitiesFail<T>(this.entity, error);
    // }

    // /**
    //  * UPDATE ONE
    //  */
    // updateOne(entity: T): void {
    //     this.store.dispatch()
    //     // return new UpdateOneEntity<T>(this.entity, entity);
    // }

    // updateOneSuccess(entity: T): void {
    //     this.store.dispatch()
    //     // return new UpdateOneEntitySuccess<T>(this.entity, entity);
    // }

    // updateOneFail(error: HttpErrorResponse): void {
    //     this.store.dispatch()
    //     // return new UpdateOneEntityFail<T>(this.entity, error);
    // }

    // /**
    //  * UPDATE MANY
    //  */
    // updateMany(entities: T[]): void {
    //     this.store.dispatch()
    //     // return new UpdateManyEntities<T>(this.entity, entities);
    // }

    // updateManySuccess(entities: T[]): void {
    //     this.store.dispatch()
    //     // return new UpdateManyEntitiesSuccess<T>(this.entity, entities);
    // }

    // updateManyFail(error: HttpErrorResponse): void {
    //     this.store.dispatch()
    //     // return new UpdateManyEntitiesFail<T>(this.entity, error);
    // }

    // /**
    //  * UPSERT ONE
    //  */
    // upsertOne(entity: T): void {
    //     this.store.dispatch()
    //     // return new UpsertOneEntity<T>(this.entity, entity);
    // }

    // upsertOneSuccess(entity: T): void {
    //     this.store.dispatch()
    //     // return new UpsertOneEntitySuccess<T>(this.entity, entity);
    // }

    // upsertOneFail(error: HttpErrorResponse): void {
    //     this.store.dispatch()
    //     // return new UpsertOneEntityFail<T>(this.entity, error);
    // }

    // /**
    //  * UPSERT MANY
    //  */
    // upsertMany(entities: T[]): void {
    //     this.store.dispatch()
    //     // return new UpsertManyEntities<T>(this.entity, entities);
    // }

    // upsertManySuccess(entities: T[]): void {
    //     this.store.dispatch()
    //     // return new UpsertManyEntitiesSuccess<T>(this.entity, entities);
    // }

    // upsertManyFail(error: HttpErrorResponse): void {
    //     this.store.dispatch()
    //     // return new UpsertManyEntitiesFail<T>(this.entity, error);
    // }

    // /**
    //  * LOAD ENTITIES
    //  */

    // load(query: Object, force = false): void {
    //     this.store.dispatch()
    //     // return new LoadEntities<T>(this.entity, { query, force });
    // }

    // loadResolved(): void {
    //     this.store.dispatch()
    //     // return new LoadEntitiesResolved<T>(this.entity);
    // }

    // loadSuccess(entities: T[]): void {
    //     this.store.dispatch()
    //     // return new LoadEntitiesSuccess<T>(this.entity, entities);
    // }

    // loadFail(error: HttpErrorResponse): void {
    //     this.store.dispatch()
    //     // return new LoadEntitiesFail<T>(this.entity, error);
    // }
    

}