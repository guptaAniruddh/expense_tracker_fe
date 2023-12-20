
import {expense} from "../model/expense"
import { User } from "../model/user";
export async function fetchData(input:RequestInfo,init?:RequestInit) {
    const response = await fetch(input,init);
    if(response.ok)
    return response
else{
    const errorBody = await response.json();
    const errorMsg = errorBody.error;
    throw Error(errorMsg)

}
    
}
export async function fetchExpenses():Promise<expense[]>{
const response =await fetchData("/api/external/expenses",{method:"GET"});
return response.json();


}
export interface ExpenseInput{
    title:string,
    amount:number,
    date:Date,
    category:string
}
export async function createExpense(expense:ExpenseInput):Promise<expense[]>{
const response = fetchData('/api/external/expenses',{
    method:"post",
    headers:{
        "Content-Type":"application/json"
    },
    
    body:JSON.stringify(expense),
});

return (await response).json()
}
export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}

export async function fetchExpense(): Promise<expense[]> {
    const response = await fetchData("http:/localhost/api/external/expenses", { method: "GET" });
    return response.json();
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote(note: NoteInput): Promise<expense> {
    const response = await fetchData("/api/notes",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
    return response.json();
}

export async function updateNote(noteId: string, note: NoteInput): Promise<expense> {
    const response = await fetchData("/api/notes/" + noteId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
    return response.json();
}

export async function deleteNote(noteId: string) {
    await fetchData("/api/notes/" + noteId, { method: "DELETE" });
}