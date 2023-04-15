export interface IRegimesState {
    newsRegime: boolean,
    headlinesRegime: boolean,
}

interface IBotState {
    botLastMessageId: number,
}

interface IState extends IRegimesState, IBotState { }

const initState: IRegimesState = {
    newsRegime: false,
    headlinesRegime: false,
}

export type stateParameters = Partial<IState>

export let currentState: Readonly<IState> = initState as IState;

export const setState = (newState: stateParameters) => {
    currentState = { ...currentState, ...newState };
}

