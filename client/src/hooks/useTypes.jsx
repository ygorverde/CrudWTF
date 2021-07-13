import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';

export function useTypes() {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        getTypes()
    }, [])

    async function getTypes() {
        await api.get('/types').then(resp => {
            setInitLoading(false);
            setData(resp.data);
            setList(resp.data);
        })
    }

    async function deleteType(id) {
        try{
            const result = await api.delete(`/types?id=${id}`)
            toast.error(result.data)
            await getTypes()
        }catch (msg){
            toast.error(msg)
        }
    }

    return { initLoading, list, deleteType }
}