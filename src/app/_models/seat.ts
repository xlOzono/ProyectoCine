export interface Seat{
    row: string;
    column: number;
    state: 'available' | 'reserved' | 'unavailable' | 'selected';
}