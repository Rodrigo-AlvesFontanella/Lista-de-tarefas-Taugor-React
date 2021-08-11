import React from 'react';

import {Dialog, DialogActions, DialogContent, DialogTitle, Button,
    Grid} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const TarefaDialog = (props) => {
    return (
        <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{props.formmode ?  'Adicionar nova' : 'Update'} Tarefa</DialogTitle>
            <ValidatorForm
                onSubmit={props.addTarefa}
            >
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={7}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Nome responsável"
                            onChange={props.changeFirstname}
                            name="firstname"
                            value={props.firstname}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={7}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Atividade"
                            onChange={props.changeAtividade}
                            name="atividade"
                            value={props.atividade}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={7}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Status"
                            onChange={props.changestatus}
                            name="status"
                            value={props.status}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        
                        <Grid item xs={7}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Descrição"
                                onChange={props.changedescricao}
                                name="Descrição"
                                value={props.descricao}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Local"
                                onChange={props.changeLocal}
                                name="Local"
                                value={props.local}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Data"
                                onChange={props.changeDate}
                                name="Data"
                                value={props.date}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                            />
                        </Grid>
                       
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="secondary">
                       {props.formmode ? 'Add' : 'Update'}
                    </Button>
                    <Button onClick={props.close} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}

export default TarefaDialog;