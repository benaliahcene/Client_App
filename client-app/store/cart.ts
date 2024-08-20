import {create} from 'zustand';

// Define a state
type State = {
    items: {
        [key: string]: {
            name: string;
            price: number;
            quantity: number;
        };
    };
    orderId: string | null;
    setOrderId: (orderId: string) => void;
    addItem: (id: string, name: string, price: number) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
};

const useStore = create<State>(set => ({
    items: {},
    orderId: null,
    setOrderId: orderId => set({orderId}),
    addItem: (id, name, price) => set(state => ({
        items: {
            ...state.items,
            [id]: {
                name,
                price,
                quantity: state.items[id] ? state.items[id].quantity + 1 : 1,
            },
        },
    })),
    removeItem: id => set(state => {
        const {[id]: _, ...items} = state.items;
        return {items};
    }),
    clearCart: () => set({items: {}}),
}));

export default useStore;