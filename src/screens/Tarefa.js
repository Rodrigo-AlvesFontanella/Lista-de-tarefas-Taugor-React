import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import {getTarefas, addTarefa, getTarefa, updateTarefa, deleteTarefa} from '../data/tarefaData';
import TarefaDialog from './TarefaDialog';

const Tarefa = () => {
    const classes  = useStyles();
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [custId, setCustId] = useState('');
    const [firstname, setFirstName] = useState('');
    const [atividade, setAtividade] = useState('');
    const [status, setStatus] =  useState('');
    const [descricao, setDescricao] = useState('');
    const [local, setLocal] = useState('');
    const [date, setDate] = useState('');
    const override =`
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
    const handleClose = () => {
        setOpen(false);
    }
    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const handleAtividade = (event) => {
        setAtividade(event.target.value);
    }
    const handleStatus = (event) => {
        setStatus(event.target.value);
    }
    const handleDescricao = (event) => {
        setDescricao(event.target.value);
    }
    const handleLocal = (event) => {
        setLocal(event.target.value);
    }
    const handleDate = (event) => {
        setDate(event.target.value);
    }
    const getlist = async () => { 
        try {
            setLoading(true);
            const list = await getTarefas();
            setTarefas(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getOneTarefa = async (id) => {
            try {
                setFormMode(false);
                setCustId(id);
                const response = await getTarefa(id);
                 setFirstName(response.firstname);
                 setAtividade(response.atividade);
                 setStatus(response.status);
                 setDescricao(response.descricao);
                 setLocal(response.local);
                 setDate(response.date);
                 setOpen(true);
            } catch (error) {
                toast.error(error.message);
            }

    }
    const deleteHandler = async (id) => {
            try {
                await deleteTarefa(id);
                getlist();
                toast.success('Tarefa deletada!');
            } catch (error) {
                toast.error(error.message);
            }
    }
    const handleAdd = () => {
            setOpen(true);
            setFormMode(true);
            setFirstName('');
            setAtividade('');
            setStatus('');
            setDescricao('');
            setLocal('');
            setDate('');
    }

    const addTarefaHandler = async () => {
            try {
                 const tarefa= {
                    firstname,
                    atividade,
                    status,
                    descricao,
                    local,
                    date
                 }
                if (formMode) {
                    await addTarefa(tarefa);
                    toast.success('Tarefa criada!');
                    getlist();
                    setOpen(false);
                    setFirstName('');
                    setAtividade('');
                    setStatus('');
                    setDescricao('');
                    setLocal('');
                    setDate('');
                }else {
                    await updateTarefa(custId, tarefa);
                    toast.success('Tarefa atualizada!');
                    getlist();
                    setOpen(false);
                    setFirstName('');
                    setAtividade('');
                    setStatus('');
                    setDescricao('');
                    setLocal('');
                    setDate('');
                }
            } catch (error) {
                toast.error(error.message);
            }
    }

    useEffect(() => {
        getlist();
    }, []);
    return (
        <Container className={classes.container}>
            <ToastContainer/>
            <TableContainer component={Paper}>
                <Grid container>
                    <Grid item xs={8}>
                    <Typography className={classes.title} variant="h6" component="div">
                       Todas tarefas
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                        className={classes.button}
                        startIcon={<AddCircle/>}
                    >Adicionar</Button>
                    </Grid>
                </Grid>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Responsável</TableCell>
                            <TableCell className={classes.head}>Atividade</TableCell>
                            <TableCell className={classes.head}>Status</TableCell>
                            <TableCell className={classes.head}>Descrição</TableCell>
                            <TableCell className={classes.head}>Local</TableCell>
                            <TableCell className={classes.head}>Data</TableCell>
                            <TableCell className={classes.head}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tarefas.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <ScaleLoader 
                                     css={override}
                                    size={150}
                                    color={"#eb4034"}
                                    loading={loading}/>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                            {tarefas.map((cust) => (
                                <TableRow key={cust.id}>
                                  <TableCell>{cust.firstname} </TableCell>
                                  <TableCell> {cust.atividade} </TableCell>
                                  <TableCell>{cust.status}</TableCell>
                                  <TableCell>{cust.descricao}</TableCell>
                                  <TableCell>{cust.local}</TableCell>
                                  <TableCell>{cust.date}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => getOneTarefa(cust.id)} color="primary" aria-label="update tarefa">
                                            <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="delete tarefa">
                                        <Delete />
                                    </IconButton>
                                  </TableCell>
                              </TableRow>
                            ))}
                              
                            </>
                        )}
                        
                    </TableBody>
                </Table>  
            </TableContainer>
            <TarefaDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                firstname={firstname}
                atividade={atividade}
                status={status}
                descricao={descricao}
                local={local}
                date={date}
                changeFirstname={handleFirstName}
                changeAtividade={handleAtividade}
                changestatus={handleStatus}
                changedescricao={handleDescricao}
                changeLocal={handleLocal}
                changeDate={handleDate}
                addTarefa={addTarefaHandler}
            />
        </Container>
    );
}


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    container: {
        marginTop: '40px'
    }, 
    title: {
        flex: '1 1 100%',
        padding: '20px'
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    button: {
        margin: theme.spacing(1),
        float: 'right',
    },
}));

export default Tarefa;