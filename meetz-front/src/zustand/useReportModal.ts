import {create} from 'zustand'
interface reportModal{
    openModal:boolean;
    confirmModal:boolean;
    setOpenModal:(modal:boolean)=>void;
    setConfirmModal:(modal:boolean)=>void;
}
export const useReportModal = create<reportModal>((set)=>({
    openModal:false,
    confirmModal:false,
    setOpenModal:(modal)=>set({openModal:modal}),
    setConfirmModal:(modal)=>set({confirmModal:modal})

}))