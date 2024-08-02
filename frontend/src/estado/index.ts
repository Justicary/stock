import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEstadoInicialProps {
  barraColpsada: boolean;
  modoOscuro: boolean;
}

const estadoInicial: IEstadoInicialProps = {
  barraColpsada: false,
  modoOscuro: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState: estadoInicial,
  reducers: {
    setBarraColapsada: (state, action: PayloadAction<boolean>) => {
      state.barraColpsada = action.payload;
    },
    setModoOscuro: (state, action: PayloadAction<boolean>) => {
      state.modoOscuro = action.payload;
    },
  },
});

export const { setBarraColapsada, setModoOscuro } = globalSlice.actions;

export default globalSlice.reducer;
