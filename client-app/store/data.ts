import {create} from 'zustand';

// Define a state
type State = {
    table:any,
    setTable: (table:any) => void;
};

const useStore = create<State>(set => ({
    table: null,
    setTable: (table:any) => set({table}),
}));

export default useStore;