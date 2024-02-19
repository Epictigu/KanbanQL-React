import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import TicketServices from '../services/ticketServices.ts'
import {Ticket} from "../model/ticket.ts";
import {TicketDetails} from "../model/ticketDetails.ts";
import {Priority} from "../enum/priority.ts";
import {TicketStatus} from "../enum/ticketStatus.ts";
import {Comment} from "../model/comment.ts";

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
        deselectTicket: (state)  => {
            state.selectedTicket = null;
        },
        moveTicketToTheTop: (state, action: PayloadAction<Ticket>) =>{
            let index = state.tickets.findIndex((ticket) => ticket.id === action.payload.id);
            state.tickets.splice(index,1);
            state.tickets.unshift(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeTicketsAsync.fulfilled, (state, action:PayloadAction<Ticket[]|null>) => {
                if(action.payload === null) return;
                const tickets : Ticket[] = structuredClone(action.payload);
                tickets.forEach(ticket => TicketServices.fixTicket(ticket));

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
                    TicketServices.fixTicket(ticket);
                    state.tickets.push(ticket);
                }
            })
            .addCase(selectTicketAsync.fulfilled, (state, action: PayloadAction<TicketDetails|null>) => {
                 if(action.payload !== null){
                     const ticketDetails: TicketDetails = structuredClone(action.payload);
                     TicketServices.fixTicketDetails(ticketDetails);

                     state.selectedTicket = ticketDetails;
                 }
            })
            .addCase(updatePriorityAsync.fulfilled, (state, action: PayloadAction<Ticket|null>) => {
                if(action.payload !== null){
                    const ticket: Ticket= structuredClone(action.payload);
                    TicketServices.fixTicket(ticket);

                    const index = state.tickets.findIndex((ticket) => ticket.id === action.payload?.id);
                    if(index !== -1){
                       state.tickets[index].priority = ticket.priority;
                    }

                    if(state.selectedTicket !== null){
                        state.selectedTicket.priority = ticket.priority;
                    }
                }
            })
            .addCase(updateStatusAsync.fulfilled, (state, action: PayloadAction<Ticket|null>) => {
                if(action.payload !== null){
                    const ticket: Ticket = structuredClone(action.payload);
                    TicketServices.fixTicket(ticket);

                    const index = state.tickets.findIndex((ticket) => ticket.id === action.payload?.id);
                    if(index !== -1){
                        state.tickets[index].status = ticket.status;
                    }

                    if(state.selectedTicket !== null){
                        state.selectedTicket.status = ticket.status;
                    }
                }
            })
            .addCase(updateTitleAsync.fulfilled, (state, action: PayloadAction<Ticket|null>) => {
                if(action.payload !== null){
                    const ticket: Ticket= structuredClone(action.payload);
                    TicketServices.fixTicket(ticket);

                    const index = state.tickets.findIndex((ticket) => ticket.id === action.payload?.id);
                    if(index !== -1){
                        state.tickets[index].title = ticket.title;
                    }

                    if(state.selectedTicket !== null){
                        state.selectedTicket.title = ticket.title;
                    }
                }
            })
            .addCase(updateDescriptionAsync.fulfilled, (state, action: PayloadAction<TicketDetails|null>) => {
                if(action.payload !== null){
                    const ticket: TicketDetails = structuredClone(action.payload);

                    if(state.selectedTicket !== null){
                        state.selectedTicket.description = ticket.description;
                    }
                }
            })
            .addCase(updateTagsAsync.fulfilled, (state, action: PayloadAction<Ticket|null>) => {
                if(action.payload !== null){
                    const index = state.tickets.findIndex((ticket) => ticket.id === action.payload?.id);
                    state.tickets[index].tags = action.payload.tags;

                }
            })
            .addCase(createCommentAsync.fulfilled, (state, action:PayloadAction<Comment|null>) => {
                if(action.payload !== null){
                    if(state.selectedTicket !== null){
                        state.selectedTicket.comments.push(action.payload);
                    }

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
            console.error(error);
            return null;
        })

)

export const deleteTicketAsync = createAsyncThunk(
    "tickets/deleteTicketAsync",
    async (id: string) =>
        await TicketServices.deleteTicket(id).then((value) => {
            const id: string = value.data.deleteTicket.id;
            return id;
        }, (error) => {
            console.error(error);
            return null;
        })

)

export const selectTicketAsync = createAsyncThunk(
    "tickets/selectTicketAsync",
    async (id: string) =>
        await TicketServices.fetchTicketDetails(id).then((value) => {
            const ticketDetails: TicketDetails= value.data.getTicketById;
            return ticketDetails;
        }, (error) => {
            console.error(error);
            return null;
        })
)
export const updateTitleAsync = createAsyncThunk(
    "tickets/updateTitleAsync",
    async (payload: {id: string, title: string}) =>
        await TicketServices.updateTitle(payload.id, payload.title).then((value) => {
            const ticket: Ticket = value.data.updateTicket;
            return ticket;
        }, (error) => {
            console.error(error);
            return null;
        })
)

export const updateDescriptionAsync = createAsyncThunk(
    "tickets/updateDescriptionAsync",
    async (payload: {id: string, description: string}) =>
        await TicketServices.updateDescription(payload.id, payload.description).then((value) => {
            const ticket: TicketDetails = value.data.updateTicket;
            return ticket;
        }, (error) => {
            console.error(error);
            return null;
        })
)

export const updatePriorityAsync = createAsyncThunk(
    "tickets/updatePriorityAsync",
    async (payload: {id: string, priority: Priority}) =>
        await TicketServices.updatePriority(payload.id, payload.priority).then((value) => {
            const ticket: Ticket = value.data.updateTicket;
            return ticket;
        }, (error) => {
            console.error(error);
            return null;
        })
)

export const updateStatusAsync = createAsyncThunk(
    "tickets/updateStatusAsync",
    async (payload: {id: string, status: TicketStatus}) =>
        await TicketServices.updateStatus(payload.id, payload.status).then((value) => {
            const ticket: Ticket = value.data.updateTicket;
            return ticket;
        }, (error) => {
            console.error(error);
            return null;
        })
)

export const updateTagsAsync = createAsyncThunk(
    "tickets/updateTagsAsync",
    async (payload: Ticket) =>
        await TicketServices.updateTags(payload).then((value) => {
            const ticket: Ticket = value.data.updateTicket;
            return ticket;
        }, (error) => {
            console.error(error);
            return null;
        })
)

export const createCommentAsync = createAsyncThunk(
    "tickets/createCommentAsync",
    async (payload: { ticket: TicketDetails, commentText: string }) =>
        await TicketServices.createComment(payload.ticket, payload.commentText).then((value) => {
            const comment: Comment = value.data.createComment;
            return comment;
        }, (error) => {
            console.error(error);
            return null;
        })
)

export const {moveTicketToTheTop, deselectTicket} = ticketsSlice.actions;
export default ticketsSlice.reducer;
