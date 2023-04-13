interface IState {
    newsRegime: boolean,
    headlinesRegime: boolean,
}

const initState: IState = {
    newsRegime: false,
    headlinesRegime: false,
}

export type stateParameters = Partial<IState>

export let currentState: IState = initState

export const setState = (newState: stateParameters) => {
    currentState = { ...initState, ...newState } as IState;
}