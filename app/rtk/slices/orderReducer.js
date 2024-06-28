const { createSlice } = require("@reduxjs/toolkit");
const token =
  "6502ca8873b868b276695bc51552ae4f7ac9a30a18823a1798988250c68e4506128bc98e496d475e00283d1824fd882d3c5b76a4a838c06bb990ab0fac14c2da7a0e4b71cada751094d0d2841244faf2623247232b5365dbe3c201f0e214dcefc2920a83748a1c5844b0c83f5c43f1517c1fce39e10fa1a8e00744a47ce7fa1d";
const orderReducer = createSlice({
  initialState: [],
  name: "orderReducer",
  reducers: {
    addOrder: (state, action) => {
      console.log(action.payload);
      fetch("https://tremendous-peace-f46153071d.strapiapp.com/api/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: action.payload }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    },
  },
});

export const { addOrder } = orderReducer.actions;
export default orderReducer.reducer;
