import { IRegimesState, setState } from "."

const initRegimesState: IRegimesState = {
    newsRegime: false,
    headlinesRegime: false,
}

export const setNewsRegime = (): void => {
    setState(initRegimesState);
    setState({ newsRegime: true });
}

export const setHeadlinesRegime = (): void => {
    setState(initRegimesState);
    setState({ headlinesRegime: true });
}

export const setBotLastMessage = (botLastMessageId: number): void => {
    setState({ botLastMessageId });
}