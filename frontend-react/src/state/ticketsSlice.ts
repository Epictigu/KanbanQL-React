import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import TicketServices from '../services/ticketServices.ts'
import {Ticket} from "../model/ticket.ts";
import {TicketDetails} from "../model/ticketDetails.ts";

interface TicketsState{
    tickets: Ticket[],
    selectedTicket: TicketDetails | null
}

const initialState: TicketsState = {
    tickets: [],
    selectedTicket: null
} as TicketsState

const ticketsSlice = createSlice({
    name: "tickets",
    initialState: initialState,
    reducers: {
        moveTicketToTheTop: (state, action: PayloadAction<Ticket>) =>{
            let index = state.tickets.findIndex((ticket) => ticket.id === action.payload.id);
            state.tickets.splice(index,1);
            state.tickets.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(initializeTicketsAsync.fulfilled, (state, action:PayloadAction<Ticket[]|null>) => {
            if(action.payload === null) return;
            const tickets : Ticket[] = structuredClone(action.payload);
            tickets.forEach(ticket =>
                ticket.status = TicketServices.convertStatusToEnumValue(ticket.status));
            tickets.forEach(ticket =>
                ticket.priority = TicketServices.convertPriorityToEnumValue(ticket.priority));

            state.tickets = tickets;
        })
        .addCase(deleteTicketAsync.fulfilled, (state, action: PayloadAction<string|null>) => {
            if(action.payload !== null){
                const index = state.tickets.findIndex((ticket) => ticket.id === action.payload);
                if(index !== -1){
                    state.tickets.splice(index,1);
                }
            }
        })
        .addCase(addTicketAsync.fulfilled, (state, action: PayloadAction<Ticket|null>) => {
            if(action.payload !== null){
                const ticket: Ticket = structuredClone(action.payload);
                ticket.status = TicketServices.convertStatusToEnumValue(action.payload.status);
                ticket.priority = TicketServices.convertPriorityToEnumValue(action.payload.priority);
                state.tickets.push(ticket);
            }
        })

    }
});

export const initializeTicketsAsync = createAsyncThunk(
    "tickets/initializeAsync",
    async () =>
        await TicketServices.fetchAllTickets().then((value) => {
            const tickets: Ticket[] = value.data.getAllTickets;
            return tickets;
        }, (error) => {
            console.error(error);
            return null;
        })
);

export const addTicketAsync = createAsyncThunk(
    "tickets/addTicketAsync",
    async (name: string) =>
        await TicketServices.createNewTicketWithName(name).then((value) => {
            const ticket: Ticket = value.data.createTicket;
            return ticket;
        }, (error) =>{
            console.log(error);
            return null;
        })

)

export const updateTicketAsync = createAsyncThunk(
    "tickets/updateTicketAsync",
    async () => {}

)
export const deleteTicketAsync = createAsyncThunk(
    "tickets/deleteTicketAsync",
    async (id: string) =>
        await TicketServices.deleteTicket(id).then((value) => {
            const id: string = value.data.deleteTicket.id;
            return id;
        }, (error) => {
            console.log(error);
            return null;
        })

)
export const {moveTicketToTheTop} = ticketsSlice.actions;
export default ticketsSlice.reducer;
