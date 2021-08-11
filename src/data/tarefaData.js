import firebase from '../helpers/db';
import Tarefa from '../models/tarefa';


const firestore = firebase.firestore();

export const getTarefas = async () => {
    try {
        const response = await firestore.collection('tarefas');
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const tarefa = new Tarefa(
                doc.id,
                doc.data().firstname,
                doc.data().atividade,
                doc.data().status,
                doc.data().descricao,
                doc.data().local,
                doc.data().date,
            );

            array.push(tarefa);
        });
        return array;
    } catch (error) {
        throw error;
    }
}

export const addTarefa = async (tarefa) => {
    try {
        await firestore.collection('tarefas').doc().set(tarefa);
    } catch (error) {
        throw error;
    }
}

export const getTarefa = async (id) => {
    try {
        const tarefa = await firestore.collection('tarefas').doc(id);
        const data = await tarefa.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}

export const updateTarefa = async (id, data) => {
    try {
        const tarefa = await firestore.collection('tarefas').doc(id);
        await tarefa.update(data)
    } catch (error) {
        throw error;
    }
}

export const deleteTarefa = async (id) => {
    try {
        await firestore.collection('tarefas').doc(id).delete();
    } catch (error) {
        throw error;
    }
}