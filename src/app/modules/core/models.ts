export interface Expense {
    id: number;
    date: Date;
    value: number;
    installments: Installment[];
}

export interface Installment {
    id: number;
    date: Date;
    value: number;
}

export type SortColumn = keyof Expense | '';
export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
    column: SortColumn;
    direction: SortDirection;
}
