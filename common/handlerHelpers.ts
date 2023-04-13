import { movingDirection } from "../keyboards/inline";

export enum CallbackParamsIndexes {
    commandTitle = 0,
    currentIndex,
    direction,
    query
}

export interface IMovingButtonCallback {
    current: number,
    direction: movingDirection
}

export interface INewsMovingButtonCallback extends IMovingButtonCallback {
    query: string,
}

const parseMovingButtonCallback = (callback: string): IMovingButtonCallback => {
    let params: string[]
    let current: number;
    let direction: movingDirection;

    try {
        params = callback.split(" ");
        current = parseInt(params[CallbackParamsIndexes.currentIndex]);
        direction = params[CallbackParamsIndexes.direction] as movingDirection;
    } catch (err) {
        throw new Error("Can't parse callback");
    }

    return {
        current: current,
        direction: direction
    }
}

const parseNewsMovingButtonCallback = (callback: string): INewsMovingButtonCallback => {
    const baseParams: IMovingButtonCallback = parseMovingButtonCallback(callback);
    let query;

    try {
        query = callback.split(" ").slice(CallbackParamsIndexes.query).join(" ");
    } catch (err) {
        throw new Error("Can't parse query from callback");
    }

    return {
        ...baseParams,
        query,
    };
}

const getValidatedIndex = (currentIndex: number, currentDirection: movingDirection, maxSize: number): number => {
    currentDirection == 'f' ? currentIndex++ : currentIndex--;

    if (currentIndex >= maxSize) currentIndex = 0;
    else if (currentIndex == -1) currentIndex = maxSize - 1;

    return currentIndex;
}

export default { parseMovingButtonCallback, parseNewsMovingButtonCallback, getValidatedIndex }