import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { /* updateDoc ,*/ getDocs, collection} from 'firebase/firestore'
import {db} from '../../config/firebase'
import { useState, useEffect, useRef } from 'react'

export const InputEngineForm = () => {
    const [empInfo, setEmpInfo] = useState([])
    const [eid, setEid] = useState([''])

    useEffect(() => {
      getData()
      }
    , [])
    

    function getData() {
        const employeeCollectionRef = collection(db,'emp-status')
        getDocs(employeeCollectionRef).then(res => {
            const empData = res.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }))
            console.log(empData)
            setEmpInfo(empData)
        }).catch(err => console.log(err.message))}

    const schema = yup.object().shape({
        name: yup.string().required('Associate name required'),
        casino: yup.string().required('Casino required'),
        event: yup.string().required('Event required'),
        game: yup.string().required('Game required'),
        date: yup.date().required('date required'),
        trainer: yup.string().required('trainer required'),
        time: yup.number(),
        mistakes: yup.number(),
        version: yup.number(),
        notes: yup.string(),
        next_step: yup.string(),
    })

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onNoteSubmit = (data) =>{
        var submit = {...data,'eid':eid, 'test':'Test'}
        console.log(submit)
    }

    const clear = (event) => {
        event.target.value = "";
    };

    const eidRef = useRef(null);

    register('name', { 
    onChange: (e) => {
        console.log(eidRef)
       console.log('e.target.value: '+e.target.value)
       console.log('e.target.option: '+e.nativeEvent.target.option)
    //    console.log('eid: '+eid)
    }
    })

    
    return (
        <form onSubmit={handleSubmit(onNoteSubmit)}>
            <input  placeholder='Name' {...register('name')} list="associates" onClick={clear} onFocus={clear} />
            <p style={{color:'red'}}>{errors.name?.message}</p>
                <datalist id="associates" ref={eidRef}>
                    {

                        empInfo.map((data) => {return <option key={data.id} value={data.id} label={data.data.name}></option>})
                    }
                </datalist>
            <input type='text' placeholder='Casino' {...register('casino')} list="casinos" onClick={clear} onFocus={clear}/>
            <p style={{color:'red'}}>{errors.casino?.message}</p>
             <datalist id="casinos">
                    <option value="casino-1">casino-1</option>
                    <option value="casino-2">casino-2</option>
                    <option value="casino-3">casino-3</option>
                </datalist>
            <input placeholder='Event' {...register('event')} list="events" />
            <p style={{color:'red'}}>{errors.event?.message}</p>
                <datalist id="events">
                    <option value="event-1">event-1</option>
                    <option value="event-2">event-2</option>
                    <option value="event-3">event-3</option>
                </datalist>
            <input placeholder='Game' {...register('game')} list="games"/>
            <p style={{color:'red'}}>{errors.game?.message}</p>
                <datalist id="games">
                    <option value="game-1">game-1</option>
                    <option value="game-2">game-2</option>
                    <option value="game-3">game-3</option>
                </datalist>
            <input onChange={e=>console.log(e.target.value)} type='date' {...register('date')}/>
            <p style={{color:'red'}}>{errors.date?.message}</p>
            <input placeholder='Trainer' {...register('trainer')} list="trainers"/>
            <p style={{color:'red'}}>{errors.trainer?.message}</p>
                <datalist id="trainers">
                    <option value="trainer-1">trainer-1</option>
                    <option value="trainer-2">trainer-2</option>
                    <option value="trainer-3">trainer-3</option>
                </datalist>
            <input placeholder='Time' {...register('time')}/>
            <input placeholder='Mistakes' {...register('mistakes')}/>
            <input placeholder='Version' {...register('version')}/>
            <textarea placeholder='Notes' {...register('notes')}/>
            <input placeholder='Next Step' {...register('next_step')}/>
            <input type="submit"  />
        </form>
    )
};