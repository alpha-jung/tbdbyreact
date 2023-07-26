import { configureStore, createSlice } from '@reduxjs/toolkit'



let items = createSlice({
    name : 'items',
    initialState : [
        { id : 0, name : 'White and Black', count : 2 },
        { id : 2, name : 'Grey Yordan', count : 1 }
    ],
    reducers : {
        increaseCount(state, action) {
            // state.forEach((a, i) => {
            //     if(state[i].id == action.payload) {
            //         state[i].count++;
            //     }
            // })

            let idx = state.findIndex((a) => { return a.id === action.payload })
            state[idx].count++;
    
            // console.log(action.payload)
        },
        addItem(state, action) {
            
            let data = action.payload;

            let idx = state.findIndex((a) => { return a.name === data.title })

            if(idx > -1) {
                alert('이미 장바구니에 있는 상품입니다.');
            } else {
                let obj :any = new Object();
                obj.id = state.length + 1;
                obj.name = data.title;
                obj.count = 1;

                state.push(obj);
            }
            
        },
        removeItem(state, action) {
            let idx = state.findIndex((a) => { return a.id === action.payload })
            state.splice(idx, 1);
        }
    }
    
})

export let { increaseCount, addItem, removeItem } = items.actions;

export default configureStore({
    reducer: {
        // createSlice 를 통해 생성한 state 등록
        items : items.reducer
    }
})